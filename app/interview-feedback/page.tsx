'use client'

import { Divider, Alert, Stack, Accordion, AccordionSummary, AccordionDetails, Typography, Grid, CardContent, Paper, CardHeader } from '@mui/material'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined'
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined'

import { useSession } from 'next-auth/react'

const InterviewFeedback = () => {

  const { data } = useSession()

  console.log({ hello: '', data })

  return (
    <Box sx={{ margin: 6, marginTop: 15, minHeight: '63vh' }}>
      <Stack spacing={2}>

        {/* USER PROFILE */}
        <Box>
          <Typography variant="h2" gutterBottom>User Profile</Typography>
          <Stack spacing={2} sx={{ background: '#f6F6F6', padding: 2 }}>
            <Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PersonOutlineOutlinedIcon />
                <Typography>{data?.user?.name}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <MailOutlineOutlinedIcon />
                <Typography>{data?.user?.email}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* ALL INTERVIEWS */}
        <Box>
          <Typography variant="h2" gutterBottom>All Interviews</Typography>
          <Accordion defaultExpanded>

            {/* HEADER DESCRIPTION */}
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
                  <Typography>07/10/2024</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <WorkHistoryOutlinedIcon />
                  <Typography>Middle</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalLibraryOutlinedIcon />
                  <Typography>Front End Developer</Typography>
                </Stack>
              </Stack>
            </AccordionSummary>

            <AccordionDetails>
              <Divider textAlign='left'>Interview Report</Divider>
              <Box sx={{ margin: 4 }}>
                <Paper elevation={6} sx={{ padding: 2 }}>
                  <CardHeader
                    avatar={
                      <CircularProgressWithLabel value={10} />
                    }
                    title={
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        1/5 Question about React
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        ¿Cómo manejarías el estado global en una aplicación React utilizando Context API y hooks personalizados? ¿Qué ventajas y desventajas ves frente a Redux?
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Alert icon={false} severity="success">
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        Your answer
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Para manejar el estado global en una aplicación React utilizando Context API, se puede crear un contexto con `React.createContext()` y proporcionar el estado a través del componente `Provider`. Los hooks personalizados permiten encapsular la lógica de estado y simplificar su uso en componentes funcionales. Las ventajas de Context API son su simplicidad y la integración nativa con React, mientras que las desventajas incluyen la falta de características avanzadas de manejo de estado como middleware y la posibilidad de renderizados innecesarios. Comparado con Redux, Context API es más fácil de implementar para aplicaciones pequeñas, pero Redux ofrece una arquitectura más robusta y escalable para aplicaciones grandes con una compleja lógica de estado.
                      </Typography>
                    </Alert>
                    <Box sx={{ margin: '16px 0px 16px 16px' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        Feedback
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        La respuesta a la primera pregunta es bastante completa y detallada. El candidato ha demostrado un buen entendimiento tanto de Context API como de Redux, proporcionando una comparación clara entre ambos enfoques. La respuesta cubre aspectos clave como la simplicidad y la integración de Context API, así como las características avanzadas y la escalabilidad de Redux.
                      </Typography>
                    </Box>
                    <Alert icon={false} severity="info">
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        Consejos y recursos para mejorar
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Para profundizar en el manejo del estado en React, estudia la documentación oficial de Context API y Redux, implementa middleware personalizado en Redux, explora patrones avanzados como "Compound Components", trabaja en proyectos reales, y participa en comunidades en línea.
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Recursos Útiles:
                        Context API, Redux Middleware, Patrones Avanzados en React, GitHub - Proyectos React, Stack Overflow - React
                      </Typography>
                    </Alert>
                  </CardContent>
                </Paper>
              </Box>


              <Divider textAlign='left'>Interview Analysis</Divider>
              <Box sx={{ flexGrow: 1, margin: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={6} sx={{ padding: 0 }}>
                      <CardHeader
                        avatar={
                          <CircularProgressWithLabel value={6} />
                        }
                        title={
                          <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                            Overall Score
                          </Typography>
                        }
                        subheader={
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            El candidato muestra un conocimiento moderado en las tecnologías relevantes, con una sólida comprensión de React y una respuesta adecuada sobre GraphQL. Sin embargo, la falta de profundidad en Redux y Jest sugiere áreas de mejora en su conocimiento técnico específico. La capacidad de resolución de problemas es adecuada, con una respuesta satisfactoria en cuanto a la optimización de consultas GraphQL. La comunicación es competente, transmitiendo ideas claras aunque sin gran profundidad en algunos temas. El pensamiento crítico es satisfactorio, mostrando un enfoque razonable pero no excepcional. El candidato es flexible en su adaptabilidad y se muestra capaz de colaborar bien en un equipo, aunque no demuestra una clara inclinación hacia el liderazgo.
                          </Typography>
                        }
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#edf7ed' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
                        Role-Related Knowledge
                      </Typography>
                      <ProgressBar text1="Low" text2="Moderate" text3="High" value={10} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#fff4e5' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
                        Problem Solving
                      </Typography>
                      <ProgressBar text1="Ineffective" text2="Adequate" text3="Exceptional" value={6} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#FDEDED' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
                        Communication
                      </Typography>
                      <ProgressBar text1="Poor" text2="Competent" text3="Excellent" value={1} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#FDEDED' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
                        Critical Thinking
                      </Typography>
                      <ProgressBar text1="Weak" text2="Satisfactory" text3="Outstanding" value={1} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#edf7ed' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
                        Adaptability
                      </Typography>
                      <ProgressBar text1="Rigid" text2="Flexible" text3="Very Flexible" value={10} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#fff4e5' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary">
                        Teamwork
                      </Typography>
                      <ProgressBar text1="Below Average" text2="Collaborative" text3="Team Leader" value={5} />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
          {/* Example 2 */}
          <Accordion defaultExpanded>
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
                  <Typography>01/10/2024</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <WorkHistoryOutlinedIcon />
                  <Typography>Junior</Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <LocalLibraryOutlinedIcon />
                  <Typography>Back End Developer</Typography>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Divider textAlign='left'>Informe de las Entrevistas</Divider>
              <Box sx={{ margin: 4 }}>
                <Paper elevation={6} sx={{ padding: 2 }}>
                  <CardHeader
                    avatar={
                      <CircularProgressWithLabel value={10} />
                    }
                    title={
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        1/5 Question about React
                      </Typography>
                    }
                    subheader={
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Can you explain the differences between React.js and Next.js, and when you would choose one over the other? Can you explain the differences between React.js and Next.js, and when you would choose one over the other? Can you explain the differences between React.js and Next.js, and when you would choose one over the other? Can you explain the differences between React.js and Next.js, and when you would choose one over the other?
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Alert icon={false} severity="success">
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        Your answer
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        In React, a controlled component is a component that does not maintain its own state. Instead, its state is managed by React using props and state. The form elements in controlled components are controlled by the parent component via state, and any changes to the input are handled through event handlers. On the other hand, an uncontrolled component maintains its own state internally. The form elements' state is handled by the DOM itself, and React does not control the value of the form elements directly. Uncontrolled components typically use refs to interact with the DOM for reading values.
                      </Typography>
                    </Alert>
                    <Box sx={{ margin: '16px 0px 16px 16px' }}>
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        Feedback
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        In React, a controlled component is a component that does not maintain its own state. Instead, its state is managed by React using props and state. The form elements in controlled components are controlled by the parent component via state, and any changes to the input are handled through event handlers. On the other hand, an uncontrolled component maintains its own state internally. The form elements' state is handled by the DOM itself, and React does not control the value of the form elements directly. Uncontrolled components typically use refs to interact with the DOM for reading values.
                      </Typography>
                    </Box>
                    <Alert icon={false} severity="info">
                      <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                        Consejos y recursos para mejorar
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        In React, a controlled component is a component that does not maintain its own state. Instead, its state is managed by React using props and state. The form elements in controlled components are controlled by the parent component via state, and any changes to the input are handled through event handlers. On the other hand, an uncontrolled component maintains its own state internally. The form elements' state is handled by the DOM itself, and React does not control the value of the form elements directly. Uncontrolled components typically use refs to interact with the DOM for reading values.
                      </Typography>
                    </Alert>
                  </CardContent>
                </Paper>
              </Box>


              <Divider textAlign='left'>Analisis de la entrevista</Divider>
              <Box sx={{ flexGrow: 1, margin: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Paper elevation={6} sx={{ padding: 0 }}>
                      <CardHeader
                        avatar={
                          <CircularProgressWithLabel value={8} />
                        }
                        title={
                          <Typography sx={{ fontSize: 14, fontWeight: 600 }} variant="h3" color="text.secondary" gutterBottom>
                            Puntuación general de la entrevistas
                          </Typography>
                        }
                        subheader={
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            Can you explain the differences between React.js and Next.js, and when you would choose one over the other? Can you explain the differences between React.js and Next.js, and when you would choose one over the other? Can you explain the differences between React.js and Next.js, and when you would choose one over the other? Can you explain the differences between React.js and Next.js, and when you would choose one over the other?
                          </Typography>
                        }
                      />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#edf7ed' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary" >
                        Conocimientos relacionados con el rol
                      </Typography>
                      <ProgressBar text1="Bajo" text2="Moderado" text3="Alto" value={10} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#fff4e5' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary" >
                        Resolucion de problemas
                      </Typography>
                      <ProgressBar text1="Ineficaz" text2="Adecuado" text3="Exepcional" value={6} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#FDEDED' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary" >
                        Comunicación
                      </Typography>
                      <ProgressBar text1="Pobre" text2="Competente" text3="Exelente" value={1} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#FDEDED' }} >
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary" >
                        Pensamiento crítico
                      </Typography>
                      <ProgressBar text1="Débil" text2="Satisfactorio" text3="Sobresaliente" value={1} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#edf7ed' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary" >
                        Adaptabilidad
                      </Typography>
                      <ProgressBar text1="Rígido" text2="Flexible" text3="Muy flexible" value={10} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <Paper elevation={6} sx={{ padding: 2, background: '#fff4e5' }}>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, marginBottom: 2, marginTop: 1 }} variant="h3" color="text.secondary" >
                        Trabajo en equipo
                      </Typography>
                      <ProgressBar text1="Deficiente" text2="Colaborador" text3="Líder de equipo" value={5} />
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Stack>
    </Box>
  )
}

export default InterviewFeedback


function getColor(point: number) {
  if (point >= 0 && point <= 3) {
    return "error";
  }
  if (point >= 4 && point <= 6) {
    return "warning";
  }
  if (point >= 7 && point <= 10) {
    return "success";
  }
  return "info"; // Valor por defecto si el point está fuera del rango esperado
}


import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { ProgressBar } from '@/components';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const { value, ...otherProps } = props;

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
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
        >{`${value}/10`}</Typography>
      </Box>
    </Box>
  );
}

