import { Box, Typography } from '@mui/material'
import Image from 'next/image'

export const PlatformOverview = () => {

  return (
    <Box
      sx={{
        padding: {
          xs: '90px 20px',
          lg: '120px 180px'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography align='center' sx={{ paddingBottom: '60px' }}>
        Master your interviews with our AI-powered training platform.
      </Typography>
      <Image
        src={"/hands-ai-interview.jpg"}
        alt="Hands tech ai interview"
        height={400}
        width={600}
        style={{ objectFit: 'cover' }}
      />
    </Box>
  )
}

