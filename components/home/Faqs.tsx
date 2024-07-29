import { Box, Typography } from '@mui/material';
import { makeStyles, Theme } from 'mui-styles';

export const Faqs = () => {
  const classes = useStyles()

  return (
    <Box className={classes.container}>
      <Typography variant="h2" className={classes.title}>
        How does artificial intelligence work in interviews?
      </Typography>
      <Typography variant="subtitle1">
        Our artificial intelligence generates relevant and up-to-date questions for each interview, providing a unique experience for the candidate.
      </Typography>
      <Typography variant="h2" className={classes.title}>
        Is the interview platform really free?
      </Typography>
      <Typography variant="subtitle1">
        Yes, it's completely free! No tricks, no hidden fees.
      </Typography>
    </Box>
  )
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 0 3rem 0',
  },
  title: {
    fontSize: '2rem',
    margin: '3rem 0 1.5rem 0',
  }
}))