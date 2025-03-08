import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    // Type the session and user parameters here
    async session({ session, user }) {
      // Check if user exists and add user role
      if (user) {
        session.user.id = user.id;
        session.user.role = (user as any).role || "user"; // Typecasting user to ensure role exists
      }
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST}
