import { Box, Typography, Stack } from '@mui/material'

export const Information = () => {

  return (
    <Box
      sx={{
        background: '#F6F6F6',
        padding: {
          xs: '90px 20px',
          lg: '120px 180px'
        }
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" gutterBottom>
          Personalized Training for Technical Interviews
        </Typography>
        <Typography>
          A platform designed to enhance your knowledge and skills in software development, in an interactive, practical format tailored to your needs.
        </Typography>
        <Typography>
          If you want to continue refining your technical skills and take a leap in your professional career...
        </Typography>
        <Typography>
          Welcome to the AI Training Platform for Developers!
        </Typography>
        <Typography>
          With our platform, you can effectively prepare for technical interviews with AI-generated questions, receiving immediate and personalized feedback. Our tool is designed for developers of all levels, from junior to senior, and covers a wide range of roles, including Front End, Back End, and more.
        </Typography>
        <Typography>
          Take advantage of this opportunity to practice in a safe and adaptive environment that adjusts to your pace and learning style. Our platform is completely free and designed to help you stand out in your interviews and achieve your professional goals.
        </Typography>
        <Typography>
          Start today and get ready to impress in your job interviews!
        </Typography>
      </Stack>
    </Box>
  )
}

