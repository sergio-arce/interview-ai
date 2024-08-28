import { NextRequest, NextResponse } from "next/server"
import { openai } from "@/utils/openai"
import { connectMongoDB } from "@/lib"

type ExperienceLevel = 'Junior' | 'Middle' | 'Senior'

export async function POST(req: NextRequest) {

  try {
    await connectMongoDB()

    const { position, experience, technologies } = await req.json()

    // validar datos
    if (!['Junior', 'Middle', 'Senior'].includes(experience)) {
      throw new Error("Nivel de experiencia no válido");
    }

    // Configuraciones para cada nivel de experiencia
    const configParameters = {
      Junior: {
        temperature: 0.3, // Menos variabilidad y mayor predictibilidad
        top_p: 0.6,       // Diversidad moderada
        presence_penalty: 0.2, // Baja penalización por repetición
        max_tokens: 75    // Longitud moderada de preguntas
      },
      Middle: {
        temperature: 0.5, // Equilibrio entre predictibilidad y variabilidad
        top_p: 0.7,       // Moderadamente alta diversidad
        presence_penalty: 0.4, // Moderada penalización por repetición
        max_tokens: 125   // Longitud intermedia de preguntas
      },
      Senior: {
        temperature: 0.7, // Mayor creatividad y variabilidad
        top_p: 0.9,       // Alta diversidad
        presence_penalty: 0.6, // Alta penalización por repetición
        max_tokens: 175   // Mayor longitud para preguntas más complejas
      }
    }

    // Parametros correspondientes al nivel de experiencia
    const parameters = configParameters[experience as ExperienceLevel];

    // const response = await openai.chat.completions.create({
    //   // model: 'gpt-3.5-turbo',
    //   model: 'gpt-4o',
    //   messages: [
    //     {
    //       role: 'user',
    //       /** Prompt */
    //       content: `
    //         Act as an expert Computer Engineer. You are going to interview a ${position} 
    //         with ${experience} experience. Your task is to generate current, interesting, and relevant questions 
    //         commonly for job interviews. 
    //         The questions should focus on the following technologies: ${technologies}.

    //         Important generate questions for this ${technologies.length} technologies.
    //         Important generate only five questions in total.

    //         To structure the questions:

    //         - If there are 5 technologies: generate one question for each technology.
    //         - If there are 4 technologies: generate two questions for the first technology and one question for each 
    //           of the remaining technologies.
    //         - If there are 3 technologies: generate two questions for the first and second technologies and one question for 
    //           each of the other technology.
    //         - If there are 2 technologies: generate three questions for the first technology and two for the second.
    //         - If there is 1 technology: generate five questions for that technology.

    //         Formatting Instructions

    //         Respond with only the JSON format, where each question is represented as an object with the keys: 
    //         "technology", "key", "question". Make sure the questions are organized clearly and structurally. 
    //         Here is an example of the expected format:
    //         [{"key": 1, "technology": "React", "question": "AI-generated question", "answer": ""}, ...]
    //       `
    //     }
    //   ],
    //   ...parameters
    // })

    // JSON questions
    // const questions = response.choices[0].message.content

    return NextResponse.json({ questions: MOCK_QUESTIONS }, { status: 200 })
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }
}

const MOCK_QUESTIONS = [
  {
    "technology": "React",
    "question": "Can you explain the difference between a controlled component and an uncontrolled component in React?",
    "answer": ""
  },
  {
    "technology": "React",
    "question": "How do you manage state in a large React application, and what tools or libraries have you used to help with state management?",
    "answer": ""
  },
  {
    "technology": "Next.js",
    "question": "What are the advantages of using Next.js for server-side rendering compared to client-side rendering?",
    "answer": ""
  },
  {
    "technology": "TypeScript",
    "question": "How does TypeScript improve the development experience compared to plain JavaScript, particularly in terms of type safety and code maintenance?",
    "answer": ""
  },
  {
    "technology": "Node.js",
    "question": "What is the event loop in Node.js, and how does it contribute to the non-blocking nature of Node.js applications?",
    "answer": ""
  }
]

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
 *  top_p: 
 *    Ajusta la diversidad del texto limitando la selección a palabras con una probabilidad acumulada 
 *    específica. Valores bajos resultan en texto más coherente y predecible, mientras que valores altos 
 *    permiten mayor diversidad.
 * 
 *  presence_penalty: 
 *    Penaliza la repetición de palabras ya utilizadas, promoviendo la diversidad en el contenido generado. 
 *    Valores bajos permiten más repetición, mientras que valores altos incentivan la introducción de nueva 
 *    información.
 * 
 *  max_tokens: 
 *    Establece el número máximo de tokens (unidad que puede ser una palabra, parte de una palabra, o 
 *    símbolo) que el modelo puede generar, controlando la longitud de la salida.
 */





const MOCK_ANSWERS = [
  {
    "ker": 1,
    "technology": "React",
    "question": "Can you explain the difference between a controlled component and an uncontrolled component in React?",
    "answer": "In React, a controlled component is a component that does not maintain its own state. Instead, its state is managed by React using props and state. The form elements in controlled components are controlled by the parent component via state, and any changes to the input are handled through event handlers. On the other hand, an uncontrolled component maintains its own state internally. The form elements' state is handled by the DOM itself, and React does not control the value of the form elements directly. Uncontrolled components typically use refs to interact with the DOM for reading values."
  },
  {
    "ker": 2,
    "technology": "React",
    "question": "How do you manage state in a large React application, and what tools or libraries have you used to help with state management?",
    "answer": "In large React applications, state management can be handled using various tools and libraries. Popular choices include Redux, which provides a central store and follows a unidirectional data flow, and Context API, which allows for sharing state across components without prop drilling. Other options include Zustand and Recoil, which offer simpler and more flexible state management solutions. The choice of tool often depends on the specific needs of the application, such as complexity, performance, and ease of use."
  },
  {
    "ker": 3,
    "technology": "Next.js",
    "question": "What are the advantages of using Next.js for server-side rendering compared to client-side rendering?",
    "answer": "Next.js offers several advantages for server-side rendering (SSR) compared to client-side rendering (CSR). SSR improves the initial page load time because the server sends a fully rendered page to the client, which can be displayed immediately. This can enhance SEO, as search engines can crawl the fully rendered content. SSR also provides better performance for users with slower devices or connections, as the server does much of the heavy lifting. In contrast, CSR relies on the client to render the content, which can lead to longer initial load times and potential SEO challenges."
  },
  {
    "ker": 4,
    "technology": "TypeScript",
    "question": "How does TypeScript improve the development experience compared to plain JavaScript, particularly in terms of type safety and code maintenance?",
    "answer": "TypeScript improves development experience by adding static type checking to JavaScript. This helps catch type-related errors during development rather than at runtime. It also enhances code maintenance through features like type annotations, interfaces, and generics, which make the code more predictable and easier to refactor. TypeScript's tooling and IDE support provide better autocomplete and documentation, improving overall productivity and reducing the likelihood of bugs."
  },
  {
    "ker": 5,
    "technology": "Node.js",
    "question": "What is the event loop in Node.js, and how does it contribute to the non-blocking nature of Node.js applications?",
    "answer": "The event loop in Node.js is a mechanism that allows Node.js to perform non-blocking I/O operations. It works by offloading operations such as file reads or network requests to the system kernel, which then signals Node.js when the operation is complete. This allows Node.js to continue executing other code while waiting for these operations to finish, thereby maintaining responsiveness. The event loop ensures that Node.js can handle multiple operations concurrently without blocking the execution of other code."
  }
]


// // ES
// [
//   {
//       "key": 1,
//       "technology": "React",
//       "question": "¿Cómo manejarías el estado global en una aplicación React utilizando Context API y hooks personalizados? ¿Qué ventajas y desventajas ves frente a Redux?",
//       "answer": "Para manejar el estado global en una aplicación React utilizando Context API, se puede crear un contexto con `React.createContext()` y proporcionar el estado a través del componente `Provider`. Los hooks personalizados permiten encapsular la lógica de estado y simplificar su uso en componentes funcionales. Las ventajas de Context API son su simplicidad y la integración nativa con React, mientras que las desventajas incluyen la falta de características avanzadas de manejo de estado como middleware y la posibilidad de renderizados innecesarios. Comparado con Redux, Context API es más fácil de implementar para aplicaciones pequeñas, pero Redux ofrece una arquitectura más robusta y escalable para aplicaciones grandes con una compleja lógica de estado.",
//       "rating": 10
//   },
//   {
//       "key": 2,
//       "technology": "Redux",
//       "question": "Explícame cómo implementas un middleware personalizado en Redux. ¿Qué casos de uso has encontrado para ello?",
//       "answer": "No estoy muy seguro de cómo se hace. Creo que se puede crear un middleware y luego añadirlo a la tienda. No he trabajado mucho con middleware personalizado, solo con los predeterminados como thunk.",
//       "rating": 2
//   },
//   {
//       "key": 3,
//       "technology": "GraphQL",
//       "question": "¿Cómo optimizarías el rendimiento de una consulta GraphQL en una aplicación con grandes volúmenes de datos?",
//       "answer": "Para optimizar el rendimiento de una consulta GraphQL, puedes implementar paginación y consultas de fragmentos en lugar de solicitar todos los datos de una vez. También es importante utilizar herramientas de caché para almacenar respuestas y evitar llamadas repetidas. Otra técnica es usar la directiva `@include` para cargar solo los campos necesarios según las condiciones.",
//       "rating": 8
//   },
//   {
//       "key": 4,
//       "technology": "TypeScript",
//       "question": "¿Cómo definirías un tipo complejo en TypeScript para un objeto que representa una entidad de usuario con múltiples propiedades opcionales y anidadas?",
//       "answer": "En TypeScript, puedes definir un tipo complejo usando interfaces o tipos. Por ejemplo, para un objeto usuario con propiedades opcionales, podrías usar una interfaz como esta: `interface User { id: number; name: string; email?: string; address?: { street: string; city: string; }; }`. Esto permite definir propiedades opcionales y anidadas de forma clara.",
//       "rating": 6
//   },
//   {
//       "key": 5,
//       "technology": "Jest",
//       "question": "¿Cómo utilizarías Jest para probar componentes React que dependen de un contexto o estado global? ¿Qué técnicas de mocking aplicas en esos casos?",
//       "answer": "No estoy seguro de cómo usar Jest para esto. Creo que se pueden usar mocks para el contexto, pero no tengo mucha experiencia en esto.",
//       "rating": 2
//   }
// ]
