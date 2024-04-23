import { connectMongoDB } from "@/lib"
import { NextRequest, NextResponse } from "next/server"
// import OpenAI from "openai"
import { openai } from '@/utils/openai';

// const openai = new OpenAI({
//   apiKey: process.env['OPEN_API_KEY']
// })

export async function POST(req: NextRequest) {

  try {
    await connectMongoDB()

    const { job } = await req.json()

    /**
     * Todo: todo ok no borrar
     */
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-3.5-turbo',
    //   messages: [
    //     {
    //       role: 'user',
    //       content: `Actúa como si fueras un experto: ${job}. Dame un listado de 20 tecnologías para este puesto, no añadas descripcion. Importante responde en una sola linea y separa por comas cada tecnología, no añadas otra respuesta adicional antes ni después.`,
    //     }
    //   ],
    //   temperature: 0.4,
    //   top_p: 1,
    //   // frecuency_penalty: 0,
    //   presence_penalty: 0,
    //   max_tokens: 150,
    //   // stream: true
    // })
    // const technologies = response.choices[0].message.content
    /**
     ***************************
     */
    const technologies = 'React, Redux, GraphQL, TypeScript, Jest, Enzyme, Webpack, Babel, CSS Modules, Styled Components, React Router, Axios, Firebase, Next.js, Gatsby, Material-UI, Ant Design, Storybook, Redux Saga, ESLint'


    return NextResponse.json({ technologies }, { status: 200 })
  } catch (error) {
    console.error('Error en la API:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}


