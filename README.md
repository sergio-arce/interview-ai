
# Plataforma de entrenamiento con IA para la preparación de entrevistas de trabajo a desarrolladores

Este proyecto es el **Trabajo de Fin de Grado (TFG)** de **Sergio Michael Arce Chijo**, presentado en la **Universidad Internacional de La Rioja** para la obtención del título de **Grado en Ingeniería Informática**. 

La plataforma desarrollada utiliza **Inteligencia Artificial (IA)**, específicamente el modelo **GPT-4** de OpenAI, para generar preguntas personalizadas para entrevistas técnicas de trabajo y proporcionar retroalimentación en tiempo real a los desarrolladores que deseen mejorar sus habilidades. El objetivo es proporcionar una herramienta adaptativa y eficiente que ayude a los candidatos a prepararse para entrevistas en roles como **Back-end**, **Front-end**, **DevOps**, **Software Architect**, **Adroid Developer**, **iOS Developer**, **Data Scientist**, entre otros.

<div align="center">
  <image src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGZsa3pscXducWNtaGFhZTlwdm1ueHBhdTAxcm45Zm5ienE2aXM1ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ouvSzoMTx6nXN6PiGu/giphy.gif" />
</div>

## Características

- **Generación de preguntas técnicas**: Preguntas personalizadas en función del lenguaje de programación, nivel de experiencia (junior, middle, senior), y rol(Front-end, Back-end, DevOps, etc).
- **Entrevistas**: El sistema presenta preguntas técnicas al usuario, quien debe responderlas en tiempo real. A través de este proceso, los usuarios pueden practicar y recibir retroalimentación inmediata para mejorar su desempeño en entrevistas técnicas.
- **Retroalimentación**: Una vez que el usuario responde las preguntas, el sistema proporciona una evaluación detallada de cada respuesta, asignando una puntuación y ofreciendo sugerencias específicas de mejora para optimizar el rendimiento del usuario en futuras entrevistas.
- **Historial de sesiones**: El sistema almacena todas las sesiones anteriores, permitiendo a los usuarios revisar tanto las preguntas como sus respuestas. De este modo, pueden analizar su progreso, identificar áreas de mejora y aplicar recomendaciones específicas para perfeccionar su desempeño en futuras entrevistas.
- **Escalabilidad**: La plataforma es capaz de manejar un creciente número de usuarios gracias a la arquitectura basada en MongoDB, Next.js y NextAuth.

## Tecnologías Utilizadas

- **Frontend**:
  - [Material UI](https://mui.com/) para la implementación de componentes y estilos.
  - [Next.js](https://nextjs.org/) para el renderizado y gestión del frontend.
  - [TypeScript](https://www.typescriptlang.org/) para asegurar un código tipado y libre de errores en tiempo de desarrollo.

- **Backend**:
  - [OpenAI GPT-4](https://beta.openai.com/) para la generación de preguntas técnicas y respuestas.
  - [NextAuth.js](https://next-auth.js.org/) para la autenticación de usuarios.
  - [MongoDB](https://www.mongodb.com/) como base de datos NoSQL para almacenar simulaciones, usuarios y resultados.

- **Infraestructura**:
  - [Vercel](https://vercel.com/) para el despliegue continuo y hosting de la plataforma.
  - [GitHub](https://github.com/sergio-arce/interview-ai) para el control de versiones y almacenamiento del código fuente.

- **Arquitectura modelo cliente-servidor**:
![](/public/arquitectura-cliente-servidor.png)

## Documentación del Proyecto

La memoria completa puedes encontrarla [aquí](./memoria/tfg-memoria.pdf).

## Instalación y Configuración

Sigue los pasos para instalar y configurar el proyecto en tu entorno local.

#### Requisitos previos

- **Node.js** (versión 20.0 o superior)
- **MongoDB** (para la base de datos)
- **Git** (para clonar el repositorio)

#### Instalación

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/sergio-arce/interview-ai.git
   ```

2. Instala las dependencias del proyecto con npm:
    ```bash
    cd interview-ai
    npm install
    ```

3. Crea un archivo .env ó .env.local en la raíz del proyecto con la siguiente información:
    ```bash
    OPENAI_API_KEY=your_openai_api_key
    NEXTAUTH_URL=http://localhost:3000/
    NEXTAUTH_SECRET=XXXXXX
    MONGODB_URI=your_mongodb_uri
    GITHUB_ID=XXXXXX
    GITHUB_SECRET=XXXXXX
    GOOGLE_CLIENT_ID=XXXXXX
    GOOGLE_CLIENT_SECRET=XXXXXX
    JWT_SECRET=XXXXXX
    JWT_EXPIRATION_TIME=86400
    PASSWORD_REGISTER=XXXXXX
    ```

4. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
5. Accede a la plataforma desde tu navegador en: http://localhost:3000


## Uso de la plataforma


#### Casos de uso
![](/public/use-cases.png)

#### Página Home
La página Home es el punto de entrada principal de la plataforma, y ofrece información clave sobre sus funcionalidades, beneficios, y cómo puede ayudar a los usuarios a prepararse mejor para sus entrevistas técnicas.
Secciones:
1. Descripción del Servicio
2. Beneficios y Características
3. Preguntas Frecuentes (FAQs)
4. Testimonios de Usuarios

![](/public/image.png)

#### Inicio de sesión y registro 
Los usuarios pueden registrarse en la plataforma y luego iniciar sesión utilizando credenciales tradicionales o a través de servicios de terceros, como GitHub y Google, gracias a la integración con NextAuth. Esto les permite acceder fácilmente a todas las funcionalidades de la plataforma de manera segura y conveniente.

#### Realizar una simulación
1. Selecciona el lenguaje de programación, nivel de experiencia y el rol para el que deseas practicar (frontend, backend, DevOps, Data Science, etc.).
2. Inicia la simulación de entrevista: se generarán cinco preguntas técnicas personalizadas.
3. Responde a las preguntas y recibe retroalimentación inmediata sobre tu desempeño.

#### Historial de simulaciones
Revisa el historial de entrevistas pasadas y las recomendaciones de mejora para seguir avanzando en tu preparación.


## Contribución
Este proyecto es el resultado de un Trabajo de Fin de Grado y, como tal, está en constante evolución. Las contribuciones son bienvenidas para mejorar el proyecto y hacerlo más robusto.

1. Haz un fork del repositorio.
2. Crea una nueva rama 
    ```bash
    git checkout -b feature/nueva-funcionalidad
    ```
3. Realiza los cambios y realiza un commit
    ```bash 
    git commit -m 'Añadir nueva funcionalidad' 
    ```
4. Envía tu rama a GitHub
    ```bash 
    git push origin feature/nueva-funcionalidad
    ```
5. Abre una Pull Request para revisar los cambios.


## Licencia

Este proyecto está bajo la licencia **Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)**. Esto significa que puedes compartir el material, siempre y cuando des el crédito adecuado, pero no puedes usarlo con fines comerciales ni distribuir versiones modificadas del mismo.

Más detalles en: <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">Creative commons</a>
 ó [License](LICENSE.md).

---

<p style="margin: 0"><strong>Autor:</strong> Sergio Michael Arce Chijo</p>
<p style="margin: 0"><strong>Universidad Internacional de La Rioja</strong></p>
<p style="margin: 0"><strong>Director:</strong> Luis Pedrasa Gomara</p>
<p style="margin: 0"><strong>Fecha:</strong> 11.09.2024</p>