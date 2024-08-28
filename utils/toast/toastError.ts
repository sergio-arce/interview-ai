'use client'

import { toast } from "sonner"

const errorColor: string = "#891536"
const bgColor: string = "#ffe1e1"

export const toastError = ({ message }: { message: string }) => {

  return toast.error(message, {
    style: {
      color: errorColor,
      borderRadius: 0,
      backgroundColor: bgColor,
      border: `1px solid ${errorColor}`
    }
  })
}