'use client'

import { TextField, Button, Stack, Chip, FormHelperText } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useForm } from 'react-hook-form'
import { Theme, useTheme } from '@mui/material/styles'
import { useState } from 'react'

import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { Grow } from '@/components'
import { useRouter } from 'next/navigation'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(name: string, technologies: readonly string[], theme: Theme) {
  return {
    fontWeight:
      technologies.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

interface IFormJob {
  job: string
}

const ConfigurarEntrevista = () => {

  const { register, handleSubmit, formState, getValues } = useForm<IFormJob>()
  const { errors } = formState
  const [technologies, setTecnologies] = useState<string[]>([])
  const [technologiesData, setTecnologiesData] = useState<string[]>([])
  const [errorTechnologies, setErrorTechnologies] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)

  const theme = useTheme()
  const router = useRouter()

  const onSubmitJob = handleSubmit(async (values) => {
    fetch('/api/technologies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job: values.job })
    }).then(data => data.json())
      .then(({ technologies }) => {
        console.log(technologies.split(', '))
        setTecnologiesData(technologies.split(', '))
        setChecked(!checked)
      })
      .catch(error => console.log("Error ", error))
  })

  const handleChange = ({ target }: SelectChangeEvent<typeof technologies>) => {
    setErrorTechnologies(false)
    const { value } = target
    setTecnologies(
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleSubmitTechnologies = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!technologies.length) {
      return setErrorTechnologies(true)
    }
    const job = getValues("job")

    router.push(`/entrevista?job=${job}&technologies=${technologies}`)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
    }}>
      <Grow checked={!checked}>
        <form onSubmit={onSubmitJob}>
          <Stack spacing={2} width={500}>
            <TextField
              label="Puesto ofertado"
              variant="outlined"
              {...register('job', { required: "El campo es requerido" })}
              size="medium"
              error={!!errors?.job?.message}
              helperText={errors.job?.message}
            />
            <Button
              variant="contained"
              type="submit"
              size="large"
            >
              Enviar
            </Button>
          </Stack>
        </form>
      </Grow>

      <Grow checked={checked}>
        <form onSubmit={handleSubmitTechnologies}>
          <Stack spacing={2} width={500}>
            <FormControl sx={{ width: 500 }} fullWidth error={errorTechnologies}>
              <InputLabel id="demo-multiple-chip-label">Tecnologías</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={technologies}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Tecnologías" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {technologiesData.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, technologies, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {errorTechnologies && <FormHelperText>El campo es requerido</FormHelperText>}
            </FormControl>
            <Button
              variant="contained"
              type="submit"
              size="large"
            >
              Empezar entrevista
            </Button>
          </Stack>
        </form>
      </Grow>
    </Box>
  )
}

export default ConfigurarEntrevista