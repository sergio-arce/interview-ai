import { Box, Typography } from '@mui/material'

export const Hero = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.backgroundImage} />
      <Box sx={styles.darkOverlay} />
      <Box sx={styles.textContainer}>
        <Typography variant="h1" sx={styles.title}>
          Tech AInterview
        </Typography>
        <Typography variant="h2" sx={styles.subtitle}>
          Impress in your interviews with our platform!
        </Typography>
        <Typography variant="subtitle1">
          Get ready to shine in your job interviews with questions crafted by artificial intelligence. Receive personalized feedback and improvement suggestions to shine like never before.
        </Typography>
      </Box>
    </Box>
  )
}

/** Styles **/
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url("/interview_ia.png")',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    filter: 'brightness(0.9)',
    zIndex: 1,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  textContainer: {
    position: 'relative',
    zIndex: 3,
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    color: '#fff',
    maxWidth: 550,
  },
  title: {
    backgroundImage: 'linear-gradient(270deg, #4f56ff, #ff4980)',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '3.5rem',
    margin: '3rem 0 1.5rem 0',
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '1.7rem',
    margin: '0 0 1.5rem 0',
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#4f56ff',
    color: '#fff',
    margin: '2.5rem 0 0 0',
    width: '200px',
    '&:hover': {
      backgroundColor: '#474eeb',
    },
  },
}