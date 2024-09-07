import { NextRequest, NextResponse } from "next/server"
import { connectMongoDB } from '@/lib'
import { FeedbackModel } from '@/models/Feedback'

interface IParams {
  params: {
    userId: string
  }
}

export const GET = async (req: NextRequest, { params }: IParams) => {
  try {
    await connectMongoDB()
    const { userId } = params
    const feedbacks = await FeedbackModel.find({ user: userId }).sort({ date: -1 })

    if (!feedbacks) {
      return NextResponse.json({ message: 'Feedback not found' }, { status: 404 })
    }

    return NextResponse.json({ userId: userId, feedbacks }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ messagge: 'Error getting feedback' }, { status: 500 })
  }
}