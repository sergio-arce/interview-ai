import * as React from 'react'
import {
  AppBar as AppBarMU,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material'
import { keyframes } from '@emotion/react'
import IconButton from '@mui/material/IconButton'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import MenuIcon from '@mui/icons-material/Menu'
import { Logo } from './Logo';

const pages = ['home', "blog", 'login']
const settings = ['Profile', 'Logout']

export const AppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  console.log({ session, pathname }) // Todo: delete

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null)
    if (page === 'home') return router.push('/')
    router.push(page)
  }

  const handleCloseUserMenu = (item: string) => {
    if (item === 'Logout') {
      signOut({ callbackUrl: '/' })
    }
    if (item === 'Profile') {
      console.log('profile') // Todo: Add pagge
    }
    setAnchorElUser(null)
  }

  // Determine which pages to show based on the pathname
  const shouldShowHome = pathname !== '/'
  const shouldShowLogin = pathname !== '/login'

  return (
    <AppBarMU component="nav" className="animate__animated animate__fadeIn">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo desktop */}
          <Logo fontSize={18} display={{ xs: 'none', md: 'flex' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                (page !== 'home' || shouldShowHome) && (page !== 'login' || shouldShowLogin) &&
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <Typography sx={{ textTransform: 'capitalize', textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Logo mobile */}
          <Logo fontSize={14} display={{ xs: 'flex', md: 'none' }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              (page !== 'home' || shouldShowHome) && (page !== 'login' || shouldShowLogin) &&
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {!['/login', '/register', '/'].includes(pathname) && <Avatar alt="User image" src={session?.user?.image} />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBarMU>
  )
}

// Animation
const glowAnimation = keyframes`
  0% {
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7)
  }
  50% {
    text-shadow: 0px 0px 15px rgba(255, 255, 255, 0.2)
  }
  100% {
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.7)
  }
`