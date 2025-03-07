// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Add the `id` property to the user object in session
    } & DefaultSession["user"];
  }
}