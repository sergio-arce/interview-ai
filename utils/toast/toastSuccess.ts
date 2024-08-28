'use client'

import { toast } from "sonner"

const successColor: string = "#27998f"
const bgColor: string = "#d0e9e6"

export const toastSuccess = ({ message }: { message: string }) => {

  return toast.error(message, {
    style: {
      color: successColor,
      borderRadius: 0,
      backgroundColor: bgColor,
      border: `1px solid ${successColor}`
    }
  })
}