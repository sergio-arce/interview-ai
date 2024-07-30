'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button, Divider, Box, Typography, Stack, TextField } from '@mui/material'
import { makeStyles, Theme } from 'mui-styles'
import { useForm } from 'react-hook-form'

import githubLogo from '@/public/github.png'
import googleLogo from '@/public/google.png'
import { useRouter } from 'next/navigation'

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '90vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 400,
    width: 300,
    minWidth: 250,
    padding: '20px 72px',
    gap: 16
  },
  link: {
    fontSize: 14,
    color: "#9e9e9e", // grey[500]
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

export default function Login() {

  const classes = useStyles()
  const { register, resetField, handleSubmit, formState, getValues } = useForm<{
    email: string,
    password: string
  }>()
  // Errors
  const { errors } = formState
  const router = useRouter()

  const handleSignIn = (provider: string) => {
    try {
      signIn(provider, { callbackUrl: '/configurar-entrevista' })
    } catch (error) {
      console.log('Error', error) // TODO: ADD TOAST ERROR
    }
  }

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    console.log({ res })
    // Invalid credentials
    if (res?.error) {
      // todo: add toast error
      console.log('Errorss: credenciales invalidas')
      return
    }

    router.push("/configurar-entrevista")

  })

  return (
    <Box className={classes.container}>
      <Typography variant="h1">Login</Typography>
      <Box className={classes.form}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              variant="outlined"
              {...register('email', { required: "The field is requiered" })}
              size="small"
              error={!!errors?.email?.message}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              {...register('password', { required: "The field is requiered" })}
              size="small"
              error={!!errors?.password?.message}
              helperText={errors.password?.message}
            />
            <Button
              variant="contained"
              type="submit"
              size="medium"
            >
              Log in
            </Button>
          </Stack>
        </form>
        <Link className={classes.link} href='/recuperar-password'>Forgot your password?</Link>
        <span style={{ fontSize: 14 }}>Don't have an account? <Link className={classes.link} href='/register'>Register</Link></span>

        <Divider sx={{ margin: '2px 0' }}>OR</Divider>
        <Button onClick={() => handleSignIn("github")} startIcon={<Image src={githubLogo} alt="Github Logo" width={20} height={20} />} variant="outlined">GitHub</Button>
        <Button onClick={() => handleSignIn("google")} startIcon={<Image src={googleLogo} alt="Google Logo" width={20} height={20} />} variant="outlined">Google</Button>
      </Box>
    </Box>
  )
}

