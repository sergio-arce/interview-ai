import { Box, Stack, Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export const NoInterviews = () => {
  const router = useRouter()

  const goInterviewSettings = () => {
    router.push('/interview-settings')
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '30vh',
        margin: '0 auto',
      }}
      className="animate__animated animate__fadeIn"
    >
      <Stack spacing={5} sx={{ width: 400 }}>
        <Typography variant="h5" textAlign="center">
          You don't have interviews set up.
        </Typography>
        <Typography variant="body1" textAlign="center">
          You can set up an interview if you wish.
        </Typography>
        <Button variant="contained" size="large" onClick={goInterviewSettings}>
          Interview settings
        </Button>
      </Stack>
    </Box>
  )
}