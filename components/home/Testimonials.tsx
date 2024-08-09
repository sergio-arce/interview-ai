import { Box, Typography, Stack } from '@mui/material'

export const Testimonials = () => {

  return (
    <Box
      sx={{
        background: '#F6F6F6',
        padding: {
          xs: '90px 20px',
          lg: '120px 180px'
        }
      }}
    >
      <Typography variant="h3" gutterBottom>
        Testimonials
      </Typography>
      <Stack spacing={6}>
        <Stack>
          <Typography variant="h5" gutterBottom>
            <i>Laura G. - Front-End Developer</i>
          </Typography>
          <Typography>
            <i>"I only used the platform a couple of times, but I was impressed with the quality of the questions and the accuracy of the feedback. It's a very interesting tool and I will definitely recommend it to my colleagues."</i>
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h5" gutterBottom>
            <i>Raúl L. - Back-End Developer</i>
          </Typography>
          <Typography>
            <i>"Although I only used it once, the customization of the interviews based on my experience level was very helpful. It's an interesting tool that I will definitely explore further."</i>
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h5" gutterBottom>
            <i>Carlos M. - Front-End Developer</i>
          </Typography>
          <Typography>
            <i>"I tried the platform once and found it to be an excellent way to prepare for interviews. The questions were very relevant, and the feedback helped me identify areas for improvement that I hadn't considered before."</i>
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="h5" gutterBottom>
            <i>Ana R. - Back-End Developer</i>
          </Typography>
          <Typography>
            <i>"I used the platform twice and was pleasantly surprised. The variety of questions and the analysis of the answers were very useful. I will definitely consider it as part of my regular preparation."</i>
          </Typography>
        </Stack>
      </Stack>
    </Box>
  )
}





// ES
// <Box
//   sx={{
//     background: '#F6F6F6',
//     padding: {
//       xs: '90px 20px',
//       lg: '120px 180px'
//     }
//   }}
// >
//   <Typography variant="h3" gutterBottom>
//     Testimonios
//   </Typography>
//   <Stack spacing={6}>
//     <Stack>
//       <Typography variant="h5" gutterBottom>
//         <i>Laura G. - Desarrolladora Front-End</i>
//       </Typography>
//       <Typography>
//         <i>"Usé la plataforma solo un par de veces, pero quedé impresionada con la calidad de las preguntas y la precisión del feedback. Es una herramienta muy interesante y definitivamente la recomendaré a mis colegas."</i>
//       </Typography>
//     </Stack>
//     <Stack>
//       <Typography variant="h5" gutterBottom>
//         <i>Raúl L. - Desarrollador Back-End</i>
//       </Typography>
//       <Typography>
//         <i>"Aunque solo la utilicé en una ocasión, la personalización de las entrevistas según mi nivel de experiencia fue muy útil. Es una herramienta interesante que definitivamente exploraré más a fondo."</i>
//       </Typography>
//     </Stack>
//     <Stack>
//       <Typography variant="h5" gutterBottom>
//         <i>Carlos M. - Desarrollador Front-End</i>
//       </Typography>
//       <Typography>
//         <i>"Probé la plataforma una vez y me pareció una excelente manera de prepararse para entrevistas. Las preguntas eran muy relevantes y el feedback me ayudó a identificar áreas de mejora que no había considerado antes."</i>
//       </Typography>
//     </Stack>
//     <Stack>
//       <Typography variant="h5" gutterBottom>
//         <i>Ana R. - Desarrolladora Back-End</i>
//       </Typography>
//       <Typography>
//         <i>"Probé la plataforma dos veces y me sorprendió gratamente. La variedad de preguntas y el análisis de las respuestas fueron muy útiles. Definitivamente la consideraré como parte de mi preparación regular."</i>
//       </Typography>
//     </Stack>
//   </Stack>
// </Box>
