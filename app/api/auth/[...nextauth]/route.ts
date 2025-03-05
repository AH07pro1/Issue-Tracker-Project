import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client';
import Github from "next-auth/providers/github";
const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
           clientId: process.env.AUTH_GOOGLE_ID!,
           clientSecret: process.env.AUTH_GOOGLE_SECRET!
          }),
        Github({
            clientId: process.env.AUTH_GITHUB_ID!,
            clientSecret: process.env.AUTH_GITHUB_SECRET!
        })
    ],
    session: {
        strategy: "jwt",
    }
})

export {handler as GET, handler as POST}