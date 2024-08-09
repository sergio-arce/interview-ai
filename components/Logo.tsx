import { Typography } from '@mui/material'
import { keyframes } from '@emotion/react';

interface Props {
  fontSize: number,
  display?: any
}

export const Logo = ({ fontSize, display }: Props) => {
  return (<>
    <Typography
      variant="h6"
      noWrap
      component="a"
      href="/"
      sx={{
        mr: 2,
        display,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '0.01rem',
        color: 'white',
        textDecoration: 'none',
        animation: `${glowAnimation} 3s infinite`,
        fontSize
      }}
    >
      Tech AInterview
    </Typography>
  </>)
}

// Animation
const glowAnimation = keyframes`
  0% {
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7)
  }
  50% {
    text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.2)
  }
  100% {
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7)
  }
`