import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/utils/openai"
import { connectMongoDB } from "@/lib"

type ExperienceLevel = 'Junior' | 'Middle' | 'Senior'

export async function POST(req: NextRequest) {

  try {
    await connectMongoDB()

    const { position, experience, technologies } = await req.json()

    // Convertir la cadena de tecnologías a un array
    const technologiesArray = technologies.split(',').map((tech: string) => tech.trim());


    // validar datos
    if (!['Junior', 'Middle', 'Senior'].includes(experience)) {
      throw new Error("Nivel de experiencia no válido");
    }

    // Configuraciones para cada nivel de experiencia
    const configParameters = {
      Junior: {
        temperature: 0.3, // Menos variabilidad y mayor predictibilidad
      },
      Middle: {
        temperature: 0.5, // Equilibrio entre predictibilidad y variabilidad
      },
      Senior: {
        temperature: 0.7, // Mayor creatividad y variabilidad
      }
    }

    // Parametros correspondientes al nivel de experiencia
    const parameters = configParameters[experience as ExperienceLevel];

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      // model: "gpt-4",
      messages: [
        {
          role: 'user',
          /** Prompt */
          content: `
            Act as an expert Computer Engineer. You are going to interview a ${position} 
            with ${experience} experience. Your task is to generate current, interesting, and relevant questions 
            commonly for job interviews. 
            The questions should focus on the following technologies: ${technologiesArray}.

            Important generate questions for this ${technologiesArray.length} technologies.
            Important generate only five questions in total.

            To structure the questions:

            - If there are 5 technologies: generate one question for each technology.
            - If there are 4 technologies: generate two questions for the first technology and one question for each 
              of the remaining technologies.
            - If there are 3 technologies: generate two questions for the first and second technologies and one question for 
              each of the other technology.
            - If there are 2 technologies: generate three questions for the first technology and two for the second.
            - If there is 1 technology: generate five questions for that technology.

            Formatting instructions:
            Return the result as a single-line JSON array. Each question must be represented as an object with the keys: 
            "technology", "key",  "question" and "answer". 

            The format must look exactly like this, without line breaks or escape characters: 
            [{ "key": 1, "technology": "React", "question": "AI-generated question", "answer": "" }, 
             { "key": 2, "technology": "JavaScript", "question": "Another question", "answer": "" }...]
          `
        }
      ],
      ...parameters
    })

    // Validar y parsear el contenido de la respuesta
    const content = response.choices[0].message.content;
    if (content) {
      const questions = JSON.parse(content);
      return NextResponse.json({ questions }, { status: 200 });
    } else {
      throw new Error('Contenido de respuesta no válido');
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

/**
 * PARAMETER API MODEL
 * 
 *  model:
 * 
 *  messaages:
 *    - role: 
 *    - content: 
 * 
 *  Temperature: 
 *    Controla la aleatoriedad y creatividad en la selección de palabras. Valores bajos producen
 *    texto más conservador, mientras que valores altos aumentan la variabilidad y creatividad.
 * 
*/