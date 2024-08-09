import { SyntheticEvent, useState } from 'react'
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

export const Faqs = () => {

  const [expanded, setExpanded] = useState<number | false>(false)

  const handleChange = (panel: number) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Box
      sx={{
        padding: {
          xs: '90px 20px',
          lg: '120px 180px'
        }
      }}
    >
      <Stack spacing={4}>
        <Typography variant="h4" gutterBottom>
          FAQs
        </Typography>
        <Box>
          {
            FAQS.map(({ question, answer, key }) => (
              <Accordion
                expanded={expanded === key}
                onChange={handleChange(key)}
                key={key}
              >
                <AccordionSummary
                  sx={{
                    padding: {
                      lg: '15px'
                    },

                  }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Typography sx={{ fontWeight: 500 }}>{question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>

            ))
          }
        </Box>
      </Stack>
    </Box>
  )
}

const FAQS = [
  {
    key: 1,
    question: "What is the AI training platform for developer job interviews?",
    answer: "Our platform is an interactive AI-based tool designed to help developers prepare for technical job interviews. It uses OpenAI's GPT-4 model to generate specific interview questions and provides detailed and personalized real-time feedback."
  },
  {
    key: 2,
    question: "How does the platform work?",
    answer: "The platform generates technical interview questions based on the user's experience level and desired position (front-end, back-end, etc.). Users answer the questions and receive immediate feedback, including suggestions for improvement and performance evaluation."
  },
  {
    key: 3,
    question: "What types of questions can I expect?",
    answer: "The questions cover a wide range of topics and programming languages, from JavaScript and Python to advanced subjects. Each question is designed to simulate what you might encounter in a real technical interview, helping you prepare effectively."
  },
  {
    key: 4,
    question: "Is the platform really free?",
    answer: "Yes, the platform is completely free to use. Our goal is to provide access to high-quality preparation tools for all developers, regardless of their financial situation."
  },
  {
    key: 5,
    question: "How can I maximize the benefit of using this platform?",
    answer: "To get the best results, we recommend using the platform regularly. Carefully review the feedback you receive and focus on improving the areas identified as weaknesses."
  }
];

// ES
// const FAQS = [
//   {
//     key: 1,
//     question: "¿Qué es la plataforma de entrenamiento con IA para entrevistas de trabajo de desarrolladores?",
//     answer: "Nuestra plataforma es una herramienta interactiva basada en inteligencia artificial diseñada para ayudar a los desarrolladores a prepararse para entrevistas de trabajo técnicas. Utiliza el modelo GPT-4 de OpenAI para generar preguntas de entrevistas específicas y proporciona feedback detallado y personalizado en tiempo real."
//   },
//   {
//     key: 2,
//     question: "¿Cómo funciona la plataforma?",
//     answer: "La plataforma genera preguntas de entrevistas técnicas basadas en el nivel de experiencia y el puesto deseado (front-end, back-end, etc.). Los usuarios responden a las preguntas y reciben feedback inmediato, incluyendo sugerencias de mejora y evaluación del desempeño."
//   },
//   {
//     key: 3,
//     question: "¿Qué tipos de preguntas puedo esperar?",
//     answer: "Las preguntas cubren una amplia variedad de temas y lenguajes de programación, desde JavaScript y Python hasta temas avanzados. Cada pregunta está diseñada para simular lo que podrías encontrar en una entrevista técnica real, ayudándote a prepararte de manera efectiva."
//   },
//   {
//     key: 4,
//     question: "¿Es la plataforma realmente gratuita?",
//     answer: "Sí, el uso de la plataforma es completamente gratuita. Nuestro objetivo es proporcionar acceso a herramientas de preparación de alta calidad a todos los desarrolladores, independientemente de su situación económica."
//   },
//   {
//     key: 5,
//     question: "¿Cómo puedo maximizar el beneficio de usar esta plataforma?",
//     answer: "Para obtener los mejores resultados, te recomendamos utilizar la plataforma de manera regular. Revisa cuidadosamente el feedback que recibes y enfócate en mejorar las áreas identificadas como puntos débiles."
//   }
// ]