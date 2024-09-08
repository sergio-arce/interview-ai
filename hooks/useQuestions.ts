import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toastError } from '@/utils/toast'
import { useSession } from 'next-auth/react'

interface IQuestions {
  key: number
  question: string
  technology: string
  answer: string
}

export const useQuestions = () => {
  const searchParams = useSearchParams()
  const position = searchParams.get("position")
  const experience = searchParams.get("experience")
  const technologies = searchParams.get("technologies")

  const [questions, setQuestions] = useState<IQuestions[] | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const { data: session } = useSession()

  const router = useRouter()

  // Load data from localStorage
  useEffect(() => {
    const storedQuestions = localStorage.getItem('questions')
    const storedCurrentIndex = localStorage.getItem('currentIndex')

    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions))
      setCurrentIndex(storedCurrentIndex ? Number(storedCurrentIndex) : 0)
      setIsLoading(false)
    } else if (position && experience && technologies) {
      fetchQuestions()
    }
  }, [position, experience, technologies])

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/interview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position, experience, technologies }),
      })
      const data = await response.json()
      setQuestions(data.questions)
      localStorage.setItem('questions', JSON.stringify(data.questions))
    } catch (error) {
      console.error("Error fetching questions:", error)
      toastError({ message: "Error connecting to the server. Try again shortly." })
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  // Update answer
  const updateAnswer = (answer: string) => {
    if (questions) {
      const updatedQuestions = [...questions]
      updatedQuestions[currentIndex].answer = answer
      setQuestions(updatedQuestions)
      localStorage.setItem('questions', JSON.stringify(updatedQuestions))
      setCurrentIndex(prevIndex => {
        localStorage.setItem('currentIndex', (prevIndex + 1).toString())
        return prevIndex + 1
      })
    }
  }

  // Submit feedback
  const submitFeedback = async () => {
    if (questions) {
      setIsLoading(true)
      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ position, experience, questions, userId: session?.user?.userId }),
        })

        console.log({ res })

        if (res.ok) {
          // clear storage
          localStorage.removeItem('questions')
          localStorage.removeItem('currentIndex')
          // redirect page
          router.push('/interview-feedback')
        } else {
          toastError({ message: "There was an error making the API call. Please try again." })
        }

      } catch (error) {
        toastError({ message: "There was an error making the API call" })
        console.error("Error submitting feedback:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const goToHome = () => {
    router.push('/')
  }

  return {
    questions,
    currentIndex,
    updateAnswer,
    submitFeedback,
    isLoading,
    position,
    experience,
    isError,
    goToHome
  }
}
