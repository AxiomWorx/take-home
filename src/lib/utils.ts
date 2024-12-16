import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')

  // Apply the mask as user types
  let formattedNumber = ''
  if (digits.length > 0) {
    formattedNumber += '(' + digits.substring(0, 3)
    if (digits.length > 3) {
      formattedNumber += ') ' + digits.substring(3, 6)
      if (digits.length > 6) {
        formattedNumber += '-' + digits.substring(6, 10)
      }
    }
  }

  return formattedNumber
}
