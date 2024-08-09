import { Box, Typography, useTheme } from '@mui/material'

interface IProgressBar {
  text1: string
  text2: string
  text3: string
  value: number
  fontSize?: number
}

export const ProgressBar = ({ text1, text2, text3, value, fontSize = 12 }: IProgressBar) => {
  const theme = useTheme()

  const gray = theme.palette.grey[300]
  const red = theme.palette.error.main
  const yellow = theme.palette.warning.main
  const green = theme.palette.success.main

  let color1 = gray
  let color2 = gray
  let color3 = gray
  let textColor1 = theme.palette.text.secondary
  let textColor2 = theme.palette.text.secondary
  let textColor3 = theme.palette.text.secondary

  if (value >= 0 && value <= 3) {
    color1 = red
    textColor1 = red
  } else if (value >= 4 && value <= 6) {
    color2 = yellow
    textColor2 = yellow
  } else if (value >= 7 && value <= 10) {
    color3 = green
    textColor3 = green
  }

  return (
    <Box>
      <div style={{ display: 'flex', background: gray, borderRadius: 5, marginBottom: 6 }}>
        <div style={{ height: 6, width: '100%', background: color1, borderRadius: 5 }} />
        <div style={{ height: 6, width: '100%', background: color2, borderRadius: 5 }} />
        <div style={{ height: 6, width: '100%', background: color3, borderRadius: 5 }} />
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography sx={{ color: textColor1, fontSize }}>{text1}</Typography>
        <Typography sx={{ color: textColor2, fontSize }}>{text2}</Typography>
        <Typography sx={{ color: textColor3, fontSize }}>{text3}</Typography>
      </Box>
    </Box>
  )
}
