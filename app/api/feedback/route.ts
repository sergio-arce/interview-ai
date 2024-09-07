import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/utils/openai"
import { connectMongoDB } from "@/lib"
import { FeedbackModel } from "@/models/Feedback"

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB()

    const { position, experience, questions, userId } = await req.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            `Actúa como si fueras un experto en ${position} con experiencia en nivel ${experience}.
          
          A continuación, evalúa las respuestas del usuario en base a las preguntas proporcionadas ${JSON.stringify(questions)}. Proporciona la siguiente información:
          
          **Detailed Feedback**:
          Para cada pregunta, genera el siguiente feedback en el formato JSON:
          1. **feedback**: Analiza si la respuesta es acorde a la pregunta y si está bien fundamentada.
          2. **improvement**: Si hay áreas de mejora en la respuesta, descríbelas brevemente. Si no es necesario, deja este campo vacío.
          3. **puntuation**: Califica la respuesta del usuario de acuerdo con la siguiente escala:
            - 1 a 3: Respuesta deficiente
            - 4 a 7: Respuesta aceptable
            - 8 a 10: Respuesta excelente

          **Overall Assessment**:
          Con base en todas las respuestas, proporciona un análisis general en el formato JSON:
          1. **overallScore**: Puntuación general del rendimiento del usuario con una descripción breve y clara.
          2. **roleRelatedKnowledge**: Evalúa el conocimiento relacionado con el rol (escala del 1 al 10).
          3. **problemSolving**: Evalúa la capacidad de resolver problemas (escala del 1 al 10).
          4. **communication**: Evalúa las habilidades de comunicación (escala del 1 al 10).
          5. **criticalThinking**: Evalúa el pensamiento crítico (escala del 1 al 10).
          6. **adaptability**: Evalúa la adaptabilidad (escala del 1 al 10).
          7. **teamwork**: Evalúa las habilidades de trabajo en equipo (escala del 1 al 10).

          **Importante**:
          1. No añadas texto adicional fuera del formato solicitado.
          2. Mantén los campos originales como **key**, **question**, **technology**, **answer** en cada pregunta.
          3. Devuelve los datos en el siguiente formato de JSON:
            
          {
            "detailedFeedback": [
              {
                "key": number,
                "question": "",
                "technology": "",
                "answer": "",
                "feedback": "",
                "improvement": "",
                "puntuation": number
              }
            ],
            "overallAssessment": {
              "overallScore": {
                "description": "",
                "puntuation": number
              },
              "roleRelatedKnowledge": number,
              "problemSolving": number,
              "communication": number,
              "criticalThinking": number,
              "adaptability": number,
              "teamwork": number
            }
          }
          `
        }
      ],
      temperature: 0.7
    })

    const content = response.choices[0].message.content
    if (content) {
      const feedback = JSON.parse(content)

      // create new feedback
      const newFeedback = new FeedbackModel({
        user: userId,
        date: new Date(),
        position,
        experience,
        detailedFeedback: feedback.detailedFeedback,
        overallAssessment: feedback.overallAssessment
      })

      // Save new feedback
      await newFeedback.save()

      return NextResponse.json({ feedback }, { status: 200 })
    } else {
      throw new Error('Contenido de respuesta no válido')
    }

  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}
