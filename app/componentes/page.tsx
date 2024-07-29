'use client'

import { useState } from 'react'
import { Theme, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Chip, Typography, TextField, Divider, Button } from '@mui/material/'

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
]

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

export default function MultipleSelectChip() {
  const theme = useTheme()
  const [personName, setPersonName] = useState<string[]>([])

  const handleChange = ({ target }: SelectChangeEvent<typeof personName>) => {
    const { value } = target
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const [age, setAge] = useState('')

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setAge(event.target.value as string)
  }
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          autoWidth
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
        <Divider sx={{ margin: '16px 0' }} />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Puesto ofertado</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Age"
              onChange={handleChangeSelect}
            >
              <MenuItem value={10}>Front-end</MenuItem>
              <MenuItem value={20}>Back-end</MenuItem>
              <MenuItem value={30}>Data siente</MenuItem>
            </Select>

          </FormControl>
        </Box>

        <Divider sx={{ margin: '16px 0' }} />
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
        <Divider sx={{ margin: '16px 0' }} />
        <TextField id="outlined-basic" label="Simpleline" variant="outlined" />
        <Divider sx={{ margin: '16px 0' }} />
        <Button variant="contained">Save</Button>
        <Divider sx={{ margin: '16px 0' }} />
        <Button variant="outlined">Save</Button>

      </FormControl>

      <Typography variant="h1" gutterBottom>
        h1. Heading
      </Typography>
      <Typography variant="h2" gutterBottom>
        h2. Heading
      </Typography>
      <Typography variant="h3" gutterBottom>
        h3. Heading
      </Typography>
    </div>
  )
}