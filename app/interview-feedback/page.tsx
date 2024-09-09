'use client'

import { Stack, Accordion, AccordionDetails, Box, Typography, CircularProgress } from '@mui/material';

import useFeedback from '@/hooks/useFeedback'
import { UserProfile, Summary, FeedbackDetail, OverallAssestment, NoInterviews } from '@/components/feedback'

const InterviewFeedback = () => {

  const { feedbacks, loading } = useFeedback()

  return (
    <Box sx={{ margin: 6, marginTop: 15, minHeight: '63vh' }}>

      <Stack spacing={2}>
        {/* USER PROFILE */}
        <UserProfile />
        <Typography variant="h2" gutterBottom>All Interviews</Typography>
        {
          feedbacks && feedbacks.map(({ _id, createdAt, experience, position, detailedFeedback, overallAssessment }: any, index: number) => {
            const { roleRelatedKnowledge, problemSolving, communication, criticalThinking, adaptability, teamwork } = overallAssessment
            const { puntuation: overallScore, description: overallFeedback } = overallAssessment.overallScore
            return (
              <Accordion defaultExpanded={index === 0} key={_id} className="animate__animated animate__fadeIn">
                {/* SUMMARY */}
                <Summary
                  {...{
                    createdAt,
                    experience,
                    position
                  }}
                />
                <AccordionDetails>
                  {/* FEEDBACK DETAIL */}
                  <FeedbackDetail data={detailedFeedback} />
                  {/* ASSESSMENT OVERALL */}
                  <OverallAssestment
                    {...{
                      overallScore,
                      overallFeedback,
                      roleRelatedKnowledge,
                      problemSolving,
                      communication,
                      criticalThinking,
                      adaptability,
                      teamwork,
                    }}
                  />
                </AccordionDetails>
              </Accordion>
            )
          })
        }

        {/* LOADING */}
        {loading && (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '30vh' }}>
            <CircularProgress />
            <p>Loading...</p>
          </Box>
        )}
        {/* NO INTERVIEWS */}
        {!loading && feedbacks?.length === 0 && (
          <NoInterviews />
        )}
      </Stack>
    </Box >
  )
}

export default InterviewFeedback




