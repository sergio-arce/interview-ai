// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      email: string;
      name: string;
      password: string;
      createdAt: string;
      updatedAt: string;
    } & DefaultSession["user"]
  }
}