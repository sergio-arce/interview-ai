'use client'

import { IChildren } from '@/utils/interfaces'
import { SessionProvider } from 'next-auth/react'

export const NextAuthSessionProvider = ({ children }: IChildren) => {
  return <SessionProvider >{children}</SessionProvider>
};