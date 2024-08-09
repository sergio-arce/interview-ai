'use client'

import { Montserrat } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { green, blueGrey } from '@mui/material/colors'

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
})

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 36,
      fontWeight: 500
    },
    h2: {
      fontSize: 30,
      fontWeight: 500
    },
    fontFamily: montserrat.style.fontFamily,
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
