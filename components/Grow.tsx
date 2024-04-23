import { Grow as GrowMU } from '@mui/material'

interface Props {
  children: React.ReactElement
  checked: boolean
}

export const Grow = ({ children, checked }: Props) => {
  return (
    <GrowMU
      in={checked}
      style={{ transformOrigin: '0 0 0' }}
      {...(checked ? { timeout: 1000 } : {})}
    >
      {children}
    </GrowMU>
  )
}