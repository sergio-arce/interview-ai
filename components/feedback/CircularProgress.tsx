import { CircularProgress as Circular, CircularProgressProps, Box, Typography } from '@mui/material'


export const CircularProgress = (
  props: CircularProgressProps & { value: number },
) => {
  const { value, ...otherProps } = props

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Circular
        variant="determinate"
        color={getColor(value)}
        {...otherProps}
        size={50}
        value={value * 10}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="caption"
          component="div"
        >
          {`${value}/10`}
        </Typography>
      </Box>
    </Box>
  )
}

function getColor(point: number) {
  if (point >= 0 && point <= 3) {
    return "error"
  }
  if (point >= 4 && point <= 6) {
    return "warning"
  }
  if (point >= 7 && point <= 10) {
    return "success"
  }
  return "info" // Valor por defecto si el point está fuera del rango esperado
}