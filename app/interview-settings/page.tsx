'use client'

import { TextField, Button, Stack, Chip, FormHelperText, Typography } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'

import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
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

const positions = ['Front End Developer', 'Back End Developer']
const experiences = ['Junior', 'Middle', 'Senior']

export default function InterviewSettings() {
  const { control, handleSubmit, formState, getValues } = useForm<{
    position: string,
    experience: string,
  }>()
  const { errors } = formState
  const [technologies, setTecnologies] = useState<string[]>([])
  const [technologiesData, setTecnologiesData] = useState<string[]>([])
  const [errorTechnologies, setErrorTechnologies] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const router = useRouter()

  const onSubmitPosition = handleSubmit(({ position, experience }) => {
    console.log({ position, experience })
    fetch('/api/technologies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ position, experience })
    })
      .then(data => data.json())
      .then(({ technologies }) => {
        setTecnologiesData(technologies.split(', '))
        setChecked(true)
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
    if (technologies.length === 0) {
      setErrorTechnologies(true)
      return
    }
    const position = getValues('position')
    const experience = getValues('experience')
    router.push(`/interview?position=${position}&experience=${experience}&technologies=${technologies}`)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      marginTop: '33px'
    }}>
      <Typography variant="h1" sx={{ marginBottom: 3 }} align="center">Set up the interview</Typography>
      {!checked ? (
        <div>
          <Stack spacing={2} width={500}>
            <form onSubmit={onSubmitPosition}>
              <Stack spacing={2} width={500}>
                <FormControl fullWidth error={!!errors.position}>
                  <Controller
                    name="position"
                    control={control}
                    rules={{ required: "The field is required" }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        select
                        label="Select your position"
                        {...field}
                        error={!!errors?.position?.message}
                        helperText={errors.position?.message}
                      >
                        {positions.map((position) => (
                          <MenuItem key={position} value={position}>
                            {position}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </FormControl>
                <FormControl fullWidth error={!!errors.experience}>
                  <Controller
                    name="experience"
                    control={control}
                    rules={{ required: "The field is required" }}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        select
                        label="Select your experience level"
                        {...field}
                        error={!!errors?.experience?.message}
                        helperText={errors.experience?.message}
                      >
                        {experiences.map((experience) => (
                          <MenuItem key={experience} value={experience}>
                            {experience}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </FormControl>
                <Button variant="contained" type="submit" size="large">
                  Next
                </Button>
              </Stack>
            </form>
          </Stack>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmitTechnologies}>
            <Stack spacing={2} width={500}>
              <FormControl sx={{ width: 500 }} fullWidth error={errorTechnologies}>
                <InputLabel id="demo-multiple-chip-label">Select tools / technologies</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={technologies}
                  onChange={(event) => {
                    if (event.target.value.length > 5) return
                    handleChange(event)
                  }}
                  input={<OutlinedInput id="select-multiple-chip" label="Select tools / technologies" />}
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
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {errorTechnologies && <FormHelperText>The field is required</FormHelperText>}
                <FormHelperText style={{ color: '#717171' }}>You can select up to 5 tools / technologies</FormHelperText>
              </FormControl>
              <Button variant="contained" type="submit" size="large">
                Start interview
              </Button>
            </Stack>
          </form>
        </div>
      )}
    </Box>
  )
}
