import { Divider, Box, Grid, Paper, CardHeader, Typography, CardContent } from '@mui/material'
import { CircularProgress } from './CircularProgress'
import { CardProgress } from './CardProgress'

interface IProps {
  overallScore: number
  overallFeedback: string
  roleRelatedKnowledge: number
  problemSolving: number
  communication: number
  criticalThinking: number
  adaptability: number
  teamwork: number
}

export const OverallAssestment = ({
  overallScore,
  overallFeedback,
  roleRelatedKnowledge,
  problemSolving,
  communication,
  criticalThinking,
  adaptability,
  teamwork
}: IProps) => {
  return (<>
    <Divider textAlign='left'>Assessment Overall</Divider>
    <Box sx={{ flexGrow: 1, margin: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={6} sx={{ padding: 2 }}>
            <CardHeader
              avatar={
                <CircularProgress value={overallScore} />
              }
              title={<>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary">
                  Overall Score
                </Typography>
              </>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {overallFeedback}
              </Typography>
            </CardContent>
          </Paper>
        </Grid>

        <CardProgress title="Role-Related Knowledge" score={roleRelatedKnowledge} lowLabel="Low" midLabel="Moderate" highLabel="High" />
        <CardProgress title="Problem Solving" score={problemSolving} lowLabel="Ineffective" midLabel="Adequate" highLabel="Exceptional" />
        <CardProgress title="Communication" score={communication} lowLabel="Poor" midLabel="Competent" highLabel="Excellent" />
        <CardProgress title="Critical Thinking" score={criticalThinking} lowLabel="Weak" midLabel="Satisfactory" highLabel="Outstanding" />
        <CardProgress title="Adaptability" score={adaptability} lowLabel="Rigid" midLabel="Flexible" highLabel="Very Flexible" />
        <CardProgress title="Teamwork" score={teamwork} lowLabel="Below Average" midLabel="Collaborative" highLabel="Team Leader" />

      </Grid>
    </Box>
  </>)
}
