import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import theme from "../theme"
import { NextAuthSessionProvider } from "@/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aplicación de entrevistas de trabajo",
  description: "Lorem ipsum",
}

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
              {children}
            </ThemeProvider>
          </AppRouterCacheProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
