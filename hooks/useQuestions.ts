import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const useQuestions = () => {
  const searchParams = useSearchParams()
  const job = searchParams.get("job")
  const technologies = searchParams.get("technologies")

  const [question, setquestion] = useState<string>("")

  useEffect(() => {
    fetch('/api/interview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job, technologies })
    }).then(data => data.json())
      .then(({ questions }) => {
        setquestion(questions)

      })
      .catch(error => console.log("Error ", error))
  }, [])

  return {
    question
  }
}