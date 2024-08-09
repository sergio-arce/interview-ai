'use client'

import { signIn } from 'next-auth/react'
import { Button, Box, Typography, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

export default function Register() {
  const { register, handleSubmit, formState } = useForm<{
    name: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
  }>()
  const { errors } = formState
  const router = useRouter()

  const handleSignIn = (provider: string) => {
    try {
      signIn(provider, { callbackUrl: '/configurar-entrevista' })
    } catch (error) {
      console.log('Error', error) // TODO: ADD TOAST ERROR
    }
  }

  const onSubmit = handleSubmit(async ({ name, lastname, email, password, confirmPassword }) => {
    console.log({ name, lastname, email, password, confirmPassword })
    // TODO: Add register user api
    router.push("/login")
  })

  return (
    <Box sx={styles.container} className="animate__animated animate__fadeIn">
      <Box sx={styles.form}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <Typography variant="h1" align='center'>Register</Typography>
            <TextField
              label="Name"
              variant="outlined"
              {...register('name', { required: "The field is required" })}
              size="small"
              error={!!errors?.name?.message}
              helperText={errors.name?.message}
            />
            <TextField
              label="Lastname"
              variant="outlined"
              {...register('lastname', { required: "The field is required" })}
              size="small"
              error={!!errors?.lastname?.message}
              helperText={errors.lastname?.message}
            />
            <TextField
              label="Email"
              variant="outlined"
              {...register('email', { required: "The field is required" })}
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              {...register('confirmPassword', { required: "The field is required" })}
              size="small"
              type="password"
              error={!!errors?.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              variant="contained"
              type="submit"
              size="medium"
              sx={styles.submitButton}
            >
              Send
            </Button>
          </Stack>
        </form>
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
    padding: '20px',
    gap: 2,
  },
  submitButton: {
    marginTop: 2,
  }
}
