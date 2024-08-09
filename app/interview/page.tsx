'use client'

import { Button, Box, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form'
import { useQuestions } from '@/hooks/useQuestions'

export default function Entrevista() {
  const { questions, currentIndex, updateAnswer, onFeedback } = useQuestions()
  const { register, resetField, handleSubmit, formState: { errors } } = useForm<{ answer: string }>()

  const onSubmitAnswer = handleSubmit((values) => {
    updateAnswer(values.answer)
    resetField('answer')
  })

  if (!questions.length) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}>
        <p>Loading...</p>
      </Box>
    )
  }

  if (currentIndex >= questions.length) {
    return <>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '85vh',
      }}>
        <Stack spacing={5}>
          <Typography >Now we will analyze each response and give you feedback</Typography>
          <Button
            variant="contained"
            type="submit"
            size="large"
            onClick={onFeedback}
          >
            Let's go
          </Button>

        </Stack>
      </Box>
    </>
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
    }}>
      <Stack>
        <Typography variant="h2">Answer the following question</Typography>
        <Typography sx={{ fontSize: 14 }}><i>Technology / Tool: <b>{questions[currentIndex].technology}</b></i></Typography>
      </Stack>
      <Stack width={900}>
        <Typography sx={{ my: 4, fontSize: 25 }}>{questions[currentIndex].question}</Typography>
      </Stack>
      <form onSubmit={onSubmitAnswer}>
        <Stack spacing={2} width={600}>
          <TextField
            label="Answer"
            variant="outlined"
            {...register('answer', {
              required: "The field is required",
              minLength: {
                value: 250,
                message: 'The answer must be at least 250 characters long'
              }
            })}
            size="medium"
            multiline
            rows={4}
            error={!!errors?.answer?.message}
            helperText={errors.answer?.message}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
          >
            Next
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

