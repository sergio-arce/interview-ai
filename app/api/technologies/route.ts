import { connectMongoDB } from "@/lib"
import { TechnologyModel } from "@/models/Technology"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {

  try {
    await connectMongoDB()
    const { technologiesData } = await req.json()

    await TechnologyModel.insertMany(technologiesData)

    return NextResponse.json({ message: 'Technologies created sussesfully' }, { status: 200 })
  } catch (error) {
    console.error('Error en la API:', error);
    return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 })
  }
}