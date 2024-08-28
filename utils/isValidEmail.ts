import { EMAIL_REGEX } from "./constans"

export function isValidEmail(email: string): boolean {
  const emailRegex = EMAIL_REGEX
  return emailRegex.test(email)
}