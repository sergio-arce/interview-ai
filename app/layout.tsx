'use client'

import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"
import { NextAuthSessionProvider } from "@/providers"
import { Suspense } from "react"
import { AppBar, Footer } from '@/components'

const inter = Inter({ subsets: ["latin"] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className} style={{ margin: 0 }}>
        <NextAuthSessionProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Suspense>
                <AppBar />
                {children}
                <Footer />
              </Suspense>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
