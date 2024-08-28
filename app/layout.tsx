'use client'

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"
import { NextAuthSessionProvider } from "@/providers"
import { Suspense } from "react"
import { AppBar, Footer } from '@/components'
import { Toaster } from "sonner"
import 'animate.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>
        <NextAuthSessionProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <Suspense>
                <AppBar />
                {children}
                <Toaster position="top-right" visibleToasts={1} />
                <Footer />
              </Suspense>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
