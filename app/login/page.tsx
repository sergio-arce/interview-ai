'use client'

import Image from 'next/image'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button, Divider, Box, Typography, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import githubLogo from '@/public/github.png'
import googleLogo from '@/public/google.png'
import { useRouter } from 'next/navigation'
import { toastError } from '@/utils/toast'
import { EMAIL_REGEX } from '@/utils/constans'

export default function Login() {
  const { register, handleSubmit, formState } = useForm<{
    email: string,
    password: string
  }>({
    mode: 'onBlur', // Valida cuando el usuario pierde el foco del campo
  })

  const { errors } = formState
  const router = useRouter()

  const handleSignIn = (provider: string) => {
    try {
      signIn(provider, { callbackUrl: '/interview-settings' })
    } catch (error) {
      toastError({ message: "The credentials you entered are not valid." })
    }
  }

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    // validar error
    if (res?.error) {
      toastError({ message: "The credentials you entered are not valid." })
      return
    }
    // redirect
    router.push('/interview-settings')
  })

  return (
    <Box sx={styles.container} className="animate__animated animate__fadeIn">
      <Box sx={styles.form}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography variant="h1" align="center">Login</Typography>
            <TextField
              label="Email"
              variant="outlined"
              {...register('email', {
                required: "The field is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email address"
                }
              })}
              size="small"
              error={!!errors?.email?.message}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              {...register('password', { required: "The field is required" })}
              size="small"
              type="password"
              error={!!errors?.password?.message}
              helperText={errors.password?.message}
            />
            <Button
              variant="contained"
              type="submit"
              size="medium"
              sx={styles.submitButton}
            >
              Log in
            </Button>
          </Stack>
        </form>
        <Typography variant="body2" sx={styles.registerLink}>
          <Link href='/recuperar-password' style={{ fontSize: 14, color: "#9e9e9e", textDecoration: 'none' }}>
            <i>Forgot your password?</i>
          </Link>
        </Typography>
        <Typography variant="body2" sx={styles.registerLink}>
          Don't have an account yet? <Link href='/register' style={{ fontSize: 14, color: "#9e9e9e", textDecoration: 'none' }}><i>Register</i></Link>
        </Typography>

        <Divider sx={styles.divider}>OR</Divider>
        <Button
          onClick={() => handleSignIn("github")}
          startIcon={<Image src={githubLogo} alt="Github Logo" width={20} height={20} />}
          variant="outlined"
          sx={styles.oauthButton}
        >
          GitHub
        </Button>
        <Button
          onClick={() => handleSignIn("google")}
          startIcon={<Image src={googleLogo} alt="Google Logo" width={20} height={20} />}
          variant="outlined"
          sx={styles.oauthButton}
        >
          Google
        </Button>
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
    height: '80vh',
    marginTop: '33px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 400,
    width: 300,
    minWidth: 250,
    padding: '20px 72px',
    gap: 2,
  },
  submitButton: {
    marginTop: 2,
  },
  registerLink: {
    fontSize: 14,
    marginTop: 1,
  },
  divider: {
    margin: '2px 0',
  },
  oauthButton: {
    marginTop: 1,
  },
}
