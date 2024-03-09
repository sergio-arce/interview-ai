'use client'

import { TextField, Button, Stack, Typography, Divider, Chip } from '@mui/material/';
import { useForm } from 'react-hook-form'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const TECHNOLOGIES_MOCK = [
  'React.js',
  'Redux',
  'React Router',
  'Webpack',
  'Babel',
  'ESLint',
  'Styled Components',
  'Axios',
  'Jest',
  'TypeScript',
  'GraphQL',
  'Firebase',
  'Next.js',
  'Enzyme',
  'Material-UI',
  'MobX',
  'Immutable.js',
  'Prettier',
  'Redux Saga',
  'Ant Design',
];

let response = "Spring, Hibernate, Maven, JUnit, Jenkins, JPA, Servlets, JSP, Tomcat, RESTful, JDBC, JAX-RS, JAX-WS, Gradle, Apache Kafka, Docker, Kubernetes, Apache Spark, Elasticsearch, Log4j"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, technologies: readonly string[], theme: Theme) {
  return {
    fontWeight:
      technologies.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type IFormJob = {
  job: string
}

const ConfigurarEntrevista = () => {

  const { register, handleSubmit, formState, getValues } = useForm<IFormJob>()
  const { errors } = formState
  const [technologies, setTecnologies] = useState<string[]>([]);
  const [technologiesData, setTecnologiesData] = useState<string[]>([]);

  const theme = useTheme();

  const onSubmit = handleSubmit((values) => {
    const prompt = `Actúa como si fueras un experto: ${values.job}. Dame un listado de 20 tecnologías para este puesto, no añadas descripcion. Importante responde en una sola linea y separa por comas cada tecnología, no añadas otra respuesta adicional antes ni después.`
    console.log({ prompt })
    console.log(response.split(', '))
    setTecnologiesData(response.split(', '))
  })

  const handleChange = ({ target }: SelectChangeEvent<typeof technologies>) => {
    const { value } = target
    setTecnologies(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleSubmitTechnologies = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const job = getValues("job")
    const prompt = `Actúa como si fueas un experto en: ${job}. Genera una pregunta y asegúrate de aplicar una de las siguientes tecnologías: ${technologies.join(', ')}`
    console.log({ prompt })
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Stack spacing={2} width={500}>
          <TextField
            label="Puesto ofertado"
            variant="outlined"
            {...register('job', { required: "El campo es requerido" })}
            size="medium"
          />
          {errors.job && <Typography variant="subtitle2" sx={{ color: 'red', margin: 1 }} >{errors.job?.message}</Typography>}
          <Button
            variant="contained"
            type="submit"
            size="large"
          >
            Enviar
          </Button>
        </Stack>
      </form>

      <Divider sx={{ margin: '16px 0' }} />

      <form onSubmit={handleSubmitTechnologies}>
        <FormControl sx={{ width: 500 }} fullWidth>
          <InputLabel id="demo-multiple-chip-label">Tecnologías</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={technologies}
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
          <Button
            variant="contained"
            type="submit"
            size="large"
          >
            Empezar entrevista
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default ConfigurarEntrevista