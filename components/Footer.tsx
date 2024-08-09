import { Box, Stack } from '@mui/material';
import { Logo } from './Logo';

export const Footer = () => {
  return (
    <Box
      component="footer"
      textAlign="center"
      p={6}
      color="white"
      bgcolor="primary.main"
      className="animate__animated animate__fadeIn"
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Stack direction="row" sx={{ display: 'flex', alignItems: 'center' }}>
        <Logo fontSize={14} /> © {new Date().getFullYear()}
      </Stack>
    </Box>
  );
};