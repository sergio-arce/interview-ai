import { AccordionSummary, Stack, Divider, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined'
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined'
import { formatDate } from '@/utils/formatDate'

interface IProps {
  createdAt: string
  experience: string
  position: string
}

export const Summary = ({ createdAt, experience, position }: IProps) => {
  return (
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1-content"
      id="panel1-header"
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CalendarMonthOutlinedIcon />
          <Typography>{formatDate(createdAt)}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <WorkHistoryOutlinedIcon />
          <Typography>{experience}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocalLibraryOutlinedIcon />
          <Typography>{position}</Typography>
        </Stack>
      </Stack>
    </AccordionSummary>
  )
}
