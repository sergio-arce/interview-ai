import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface IQuestions {
  question: string
  technology: string
  answer: string
}

export const useQuestions = () => {
  const searchParams = useSearchParams()
  const position = searchParams.get("position")
  const experience = searchParams.get("experience")
  const technologies = searchParams.get("technologies")

  const [questions, setQuestions] = useState<IQuestions[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const router = useRouter()

  useEffect(() => {
    fetch('/api/interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position, experience, technologies }),
    })
      .then((response) => response.json())
      .then(({ questions }) => {
        setQuestions(questions)
      })
      .catch(error => console.log("Error fetching questions:", error))

  }, [])

  const updateAnswer = (answer: string) => {
    const updatedQuestions = [...questions]
    updatedQuestions[currentIndex].answer = answer
    setQuestions(updatedQuestions)
    setCurrentIndex(currentIndex + 1)
  }

  const onFeedback = () => {
    fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position, experience, questions }),
    })
      .then((response) => response.json())
      .then(({ questions }) => {

        router.push('/interview-feedback')
      })
      .catch(error => console.log("Error fetching questions:", error))
  }

  return {
    questions,
    currentIndex,
    updateAnswer,
    onFeedback
  }
}

