import { Box, Typography, Stack } from '@mui/material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'
import { useSession } from 'next-auth/react'

export const UserProfile = () => {
  const { data } = useSession()

  return (
    <Box>
      <Typography variant="h2" gutterBottom>User Profile</Typography>
      {data && <Stack spacing={2} sx={{ background: '#f6F6F6', padding: 2 }} className="animate__animated animate__fadeIn">
        <Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PersonOutlineOutlinedIcon />
            <Typography>{data?.user?.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <MailOutlineOutlinedIcon />
            <Typography>{data?.user?.email}</Typography>
          </Stack>
        </Stack>
      </Stack>
      }
    </Box>
  )
}
