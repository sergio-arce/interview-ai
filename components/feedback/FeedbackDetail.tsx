import { Divider, Box, Paper, CardHeader, Typography, CardContent, Stack, Alert } from '@mui/material';
import { CircularProgress } from './CircularProgress'

export const FeedbackDetail = ({ data }: any) => {
  return (<>
    <Divider textAlign='left'>Feedback Detail</Divider>
    {data.map((detail: any) => {
      return (
        <Box sx={{ margin: 4 }} key={detail.key}>
          <Paper elevation={6} sx={{ padding: 2 }}>
            <CardHeader
              avatar={
                <CircularProgress value={detail.puntuation} />
              }
              title={
                <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                  {`${detail.key}/5 Question about ${detail.technology}`}
                </Typography>
              }
              subheader={
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {detail.question}
                </Typography>
              }
            />
            <CardContent>
              <Stack spacing={2}>
                <Alert icon={false} severity="success">
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                    Your answer
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {detail.answer}
                  </Typography>
                </Alert>
                <Alert icon={false} severity="info">
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                    Feedback
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {detail.feedback}
                  </Typography>
                </Alert>
              </Stack>
            </CardContent>
          </Paper>
        </Box>
      )
    })}
  </>)
}
