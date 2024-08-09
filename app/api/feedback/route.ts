import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/utils/openai"
import { connectMongoDB } from "@/lib"

export async function POST(req: NextRequest) {

  try {
    await connectMongoDB()

    const { position, experience, questions } = await req.json()


    console.log({ position, experience, questions })

    /**
     * todo: todo ok no borrar esta parte
     */
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'user',
    //       // content: `Actúa como si fueas un experto en: ${job}. Genera una pregunta y asegúrate de aplicar una de las siguientes tecnologías: ${technologies}, 
    //       // importante responde solo con la pregunta en un string, importante no hagas preguntas confusas o imprecisas`,
    //       content: `Actúa como si fueas un experto en: ${job}. Genera un ejercicio de codigo y asegúrate de aplicar una de las siguientes tecnologías: ${technologies}, 
    //       importante responde solo con la pregunta en un string, importante no hagas preguntas confusas o imprecisas`,
    //     }
    //   ],
    //   temperature: 0.4,
    //   top_p: 1,
    //   // frecuency_penalty: 0,
    //   presence_penalty: 0,
    //   max_tokens: 150,
    //   // stream: true
    // })
    // const questions = response.choices[0].message.content
    /**
     * ************************************************
     */

    const feedback = 'Feedback from to open ia...'

    return NextResponse.json({ feedback }, { status: 200 })
  } catch (error) {
    console.error('Error en la API:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}
