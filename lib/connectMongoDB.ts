// /**
//  * https://blog.stackademic.com/a-guide-to-build-an-api-server-with-nextjs-14-and-mongoose-e01f0e10a68a
//  */
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {}

export const connectMongoDB = async () => {

  try {
    if (!MONGO_URI) throw new Error('Please define the MONGO_URI enviroment variable inside .env.local')

    // Verifica si ya hay una conexión existente y devuelve la misma
    if (cached.connection) return cached.connection

    // Si no hay una conexión existente, intenta establecer una nueva
    if (!cached.promise) {
      const options = {
        bufferCommands: false
      }
      cached.promise = mongoose.connect(MONGO_URI, options)
    }

    // Espera a que la conexión se establezca y guarda la conexión en caché
    cached.connection = await cached.promise
    console.log('Success connection...')
    return cached.connection
  } catch (error) {
    // Limpia la promesa de conexión en caso de error
    cached.promise = undefined
    console.log('Error connection...')
    throw error
  }
}




