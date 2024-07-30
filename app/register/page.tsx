'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { Button, Box, Typography, Stack, TextField } from '@mui/material'
import { makeStyles, Theme } from 'mui-styles'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

export default function Register() {

  const classes = useStyles()
  const { register, resetField, handleSubmit, formState, getValues } = useForm<{
    name: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
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

  const onSubmit = handleSubmit(async ({ name, lastname, email, password, confirmPassword }) => {
    console.log({ name, lastname, email, password, confirmPassword })
    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   redirect: false,
    // })
    // console.log({ res })
    // // Invalid credentials
    // if (res?.error) {
    //   // todo: add toast error
    //   console.log('Errorss: credenciales invalidas')
    //   return
    // }

    router.push("/login")

  })

  return (
    <Box className={classes.container}>
      <Typography variant="h1">Register</Typography>
      <Box className={classes.form}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              {...register('name', { required: "The field is requiered" })}
              size="small"
              error={!!errors?.name?.message}
              helperText={errors.name?.message}
            />
            <TextField
              label="Lastname"
              variant="outlined"
              {...register('lastname', { required: "The field is requiered" })}
              size="small"
              error={!!errors?.lastname?.message}
              helperText={errors.lastname?.message}
            />
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
            <TextField
              label="Confirm Password"
              variant="outlined"
              {...register('confirmPassword', { required: "The field is requiered" })}
              size="small"
              error={!!errors?.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              variant="contained"
              type="submit"
              size="medium"
            >
              Send
            </Button>
          </Stack>
        </form>
        <Link className={classes.link} href='/login'>Login</Link>
      </Box>
    </Box>
  )
}

/**
 * Styles
 */
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: 400,
    width: 300,
    minWidth: 250,
    // padding: '10px 72px',
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