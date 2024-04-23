'use client'

import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { green, blueGrey } from '@mui/material/colors'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 400
    },
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: {
      main: green[500],
    },
  },
})

export default theme
