import { Grid, Paper, Typography } from '@mui/material'
import { ProgressBar } from '@/components'

interface IProps {
  title: string
  score: number
  lowLabel: string
  midLabel: string
  highLabel: string
}

const red = '#FDEDED'
const orange = '#fff4e5'
const green = '#edf7ed'

export const CardProgress = ({ title, score, lowLabel, midLabel, highLabel }: IProps) => {

  let paperColor

  if (score >= 0 && score <= 3) {
    paperColor = red
  } else if (score >= 4 && score <= 6) {
    paperColor = orange
  } else if (score >= 7 && score <= 10) {
    paperColor = green
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper elevation={6} sx={{ padding: 2, background: paperColor }}>
        <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
          {title}
        </Typography>
        <ProgressBar {...{
          title,
          lowLabel,
          midLabel,
          highLabel,
          value: score
        }} />
      </Paper>
    </Grid>
  )
}
