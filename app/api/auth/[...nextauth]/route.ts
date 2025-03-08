import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma client
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
    // Type the session and user parameters here using the custom type from next-auth.d.ts
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.role = ((user as unknown) as { role: string }).role || "user"; // Ensure role exists
      }
      return session;
    },
  },
  session: {
    strategy: "database",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
