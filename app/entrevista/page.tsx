'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Box, Stack, TextField } from '@mui/material'
import { useSearchParams } from "next/navigation"
import { useForm } from 'react-hook-form'

import { Grow, LayoutPage } from '@/components'

export default function Entrevista() {
  const searchParams = useSearchParams()
  const job = searchParams.get("job")
  const technologies = searchParams.get("technologies")

  const initialRender = useRef(true);
  const [question, setquestion] = useState<string>("")
  const [answer, setAnswer] = useState<string>("")
  const [feedback, setFeedback] = useState<string>("")
  const [checked, setChecked] = useState<boolean>(false)
  const { register, resetField, handleSubmit, formState, getValues } = useForm<{
    respuesta: string
  }>()
  // Errors
  const { errors } = formState

  const getQuestions = useCallback(() => {

    fetch('/api/interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job, technologies })
    }).then(data => data.json())
      .then(({ questions }) => {
        setquestion(questions)

      })
      .catch(error => console.log("Error ", error))
  }, [job, technologies])

  useEffect(() => {
    // Marca el primer renderizado como completo
    if (initialRender.current) {
      initialRender.current = false
      return;
    }
    getQuestions()
  }, [getQuestions])

  const onSubmitJob = handleSubmit(async (values) => {
    console.log({ values })
    // Todo: reset fields
    resetField('respuesta')
    // Todo: endpoint
    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answer: values.respuesta })
    }).then(data => data.json())
      .then(({ feedback }) => {
        console.log("Joder: ", answer)
        setFeedback(feedback)
        setAnswer(values.respuesta)
        setChecked(!checked)
      })
      .catch(error => console.log("Error ", error))
  })


  return (
    <LayoutPage>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}>
        <h1>Responde a la siguiente pregunta</h1>
        <Grow checked={true}>
          <Stack width={500}>
            <p>{question}</p>
          </Stack>
        </Grow>

        {!checked && <Grow checked={!checked}>
          <form onSubmit={onSubmitJob}>
            <Stack spacing={2} width={500}>
              <TextField
                label="Respuesta"
                variant="outlined"
                {...register('respuesta', { required: "El campo es requerido" })}
                size="medium"
                error={!!errors?.respuesta?.message}
                helperText={errors.respuesta?.message}
              />
              <Button
                variant="contained"
                type="submit"
                size="large"
              >
                Validar respuesta
              </Button>
            </Stack>
          </form>
        </Grow>}

        <Grow checked={checked}>
          <Stack width={500}>
            <p>{answer}</p>
            <p>{feedback}</p>
            <p>Next question</p>
            <p>Add favorito</p>
          </Stack>
        </Grow>
      </Box>
    </LayoutPage>
  )
}
