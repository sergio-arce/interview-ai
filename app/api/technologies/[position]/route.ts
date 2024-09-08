import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from '@/lib'
import { TechnologyModel } from "@/models/Technology"

interface IParams {
  params: {
    position: string
  }
}

export const GET = async (req: NextRequest, { params }: IParams) => {
  try {
    await connectMongoDB()
    const { position } = params


    const tech = await TechnologyModel.find({ position }).sort({ date: -1 })

    if (!tech) {
      return NextResponse.json({ message: 'Technologies not found' }, { status: 404 })
    }

    return NextResponse.json({ technologies: tech[0].technologies }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ messagge: 'Error getting feedback' }, { status: 500 })
  }
}