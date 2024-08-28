'use client'

import { Button, Box, Typography, Stack, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toastError, toastSuccess } from '@/utils/toast'
import { EMAIL_REGEX } from '@/utils/constans'

export default function Register() {
  const { register, handleSubmit, formState, watch } = useForm<{
    name: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string
  }>({
    mode: 'onBlur', // Valida cuando el usuario pierde el foco del campo
  })

  const { errors } = formState
  const router = useRouter()

  const onSubmit = handleSubmit(async ({ name, lastname, email, password, confirmPassword }) => {
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, lastname, email, password, confirmPassword })
    })
      .then(data => data.json())
      .then(data => {
        if (data?.error) {
          console.log("validation ", data.error)
          toastError({ message: data?.error })
          return
        }
        toastSuccess({ message: "Usuario creado correctamente." })
        // redirect to login page
        router.push("/login")
      })
      .catch(error => console.log("Error ", error))
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
              {...register('password', {
                required: "The field is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_\-])[A-Za-z\d@$!%*?&_\-]{8,}$/,
                  message: "Password must be at least 8 characters long, and include an uppercase letter, a lowercase letter, a number, and a special character."
                }
              })}
              size="small"
              type="password"
              error={!!errors?.password?.message}
              helperText={errors.password?.message}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              {...register('confirmPassword', {
                required: "The field is required",
                validate: (value) => value === watch('password') || 'Passwords do not match'
              })}
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
