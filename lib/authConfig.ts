import type { AuthOptions } from "next-auth"
import GithhubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { connectMongoDB } from '@/lib'
import { UserModel } from "@/models/User"


export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithhubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Correo electrónico", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {

        // Add logic here to look up the user from the credentials supplied
        await connectMongoDB()
        // find user
        const userFound = await UserModel.findOne({
          email: credentials?.email
        }).select("+password")

        // validate user
        if (!userFound) return null

        // password
        const isPasswordMatch = await bcrypt.compare(
          credentials!.password,
          userFound?.password
        )
        // validate password
        if (!isPasswordMatch) return null

        return userFound
      }
    })
    // ...add more providers
  ],
  pages: {
    signIn: "/"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      session.user = token.user as any
      return session
    },
    async signIn({ user, account }: any) { // todo: Delete any

      console.log("signin", { user, account })
      const { email, name } = user

      await connectMongoDB()
      const userFound = await UserModel.findOne({ email })

      if (!userFound) {
        // Si el usuario inicia sesión con GitHub o Google y no existe en la BDD
        // procedemos a registrarlo
        if (['github', 'google'].includes(account.provider)) {
          const fullNameParts = name.split(' ')
          const _name = fullNameParts[0]
          const lastname = fullNameParts.slice(1).join(' ') || ''

          try {
            // const res = await fetch(`api/auth/register`, {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}api/auth/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name: _name,
                lastname,
                email,
                password: process.env.PASSWORD_REGISTER,
                confirmPassword: process.env.PASSWORD_REGISTER
              })
            })

            if (res.ok) {
              return user
            }

          } catch (error) {
            console.log('ERROR', error)
          }
        }
      }

      return user
    }
  }
}