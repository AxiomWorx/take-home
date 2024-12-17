import { z } from 'zod'
import { USER_PLANS, COMPANIES } from './constants'

// Base schema with common fields
const baseUserSchema = {
  first_name: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .trim(),
  last_name: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .trim(),
  plan: z.enum(USER_PLANS.map(p => p.value) as [string, ...string[]]),
  company: z.enum(COMPANIES.map(c => c.value) as [string, ...string[]]),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .trim(),
  phone_number: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone number must be in format (555) 555-5555')
    .trim(),
  avatar_url: z.string().optional()
}

// Role required for creating users
export const createUserSchema = z.object({
  ...baseUserSchema,
  role: z.string()
    .min(1, 'Role is required')
    .trim()
})

// Role optional for updating users, because existing users do not have a role assigned
export const updateUserSchema = z.object({
  ...baseUserSchema,
  role: z.string().optional()
})

export type CreateUserSchema = z.infer<typeof createUserSchema>
export type UpdateUserSchema = z.infer<typeof updateUserSchema>
export type ValidationErrors = Partial<Record<keyof CreateUserSchema, string>>
