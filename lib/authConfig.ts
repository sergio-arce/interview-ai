import type { AuthOptions } from "next-auth"
import GithhubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectMongoDB } from '@/lib';
import { UserModel } from "@/models/User";
import bcrypt from 'bcryptjs';


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
        console.log({ credentials })
        // Add logic here to look up the user from the credentials supplied
        await connectMongoDB()
        // find user
        const userFound = await UserModel.findOne({
          email: credentials?.email
        }).select("+password")

        console.log("UserFound", userFound)

        // validate user
        if (!userFound) return null


        // password
        const isPasswordMatch = await bcrypt.compare(
          credentials!.password,
          userFound?.password
        )
        console.log({ isPasswordMatch })
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
      console.log('account', account)
      const { email } = user

      await connectMongoDB()
      const userFound = await UserModel.findOne({ email })

      if (!userFound) {
        // if (account.provider === 'google' || account.provider === 'github') {
        if (['github', 'google'].includes(account.provider)) {
          try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email,
                password: '12345', // todo: add .env
                confirmPassword: '12345', // todo: add .env
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