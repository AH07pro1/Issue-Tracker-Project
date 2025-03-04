import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '@prisma/client'

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google({
           clientId: process.env.AUTH_GOOGLE_ID!,
           clientSecret: process.env.AUTH_GOOGLE_SECRET!
          }),
    ]
})

export {handler as GET, handler as POST}