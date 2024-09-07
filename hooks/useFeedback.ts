import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toastError } from '@/utils/toast'

interface Feedback {
  _id: string
  createdAt: string
  experience: string
  position: string
  detailedFeedback: string
  overallAssessment: any
}

const useFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    if (!session || !session.user) {
      setLoading(false)
      return
    }
    const userId = session?.user?.userId

    const fetchFeedback = async () => {
      try {
        const response = await fetch(`/api/feedback/${userId}`)
        if (!response.ok) {
          return toastError({ message: "There was an error making the API call" })
        }

        const { feedbacks } = await response.json()
        setFeedbacks(feedbacks)

        setTimeout(() => {
          setLoading(false)
        }, 4000)

      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }

    fetchFeedback()
  }, [session])

  return {
    feedbacks,
    loading,
    error,
  }
}

export default useFeedback

