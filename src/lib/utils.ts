import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS classes with support for conditional classes and class variants
 * @param inputs - Array of class values, conditionals, or variant objects
 * @returns Merged and deduped class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a phone number string into (XXX) XXX-XXXX format
 * @param value - The input string to format
 * @returns The formatted phone number string
 */
export function formatPhoneNumber(value: string): string {
  // Extract numbers only and match into groups
  const x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)

  // Return empty string if no match
  if (!x) return ''

  // Return formatted string based on matched groups
  return !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '')
}
