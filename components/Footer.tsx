import { Box } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      component="footer"
      textAlign="center"
      p={6}
      color="white"
      bgcolor="primary.main"
    >
      Tech AInterview © {new Date().getFullYear()}
    </Box>
  );
};