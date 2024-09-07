// next-auth.d.ts
import { StringExpressionOperator } from "mongoose"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      userId: string
      email: string
      name: string
      image: string
    } & DefaultSession["user"]
  }
}