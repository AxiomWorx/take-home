import { z } from 'zod'
import { USER_PLANS, COMPANIES } from './constants'

/**
 * Common validation schema fields shared between create and update operations
 */
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

/**
 * Validation schema for creating new users
 * Includes all base fields plus required role field
 */
export const createUserSchema = z.object({
  ...baseUserSchema,
  role: z.string()
    .min(1, 'Role is required')
    .trim()
})

/**
 * Validation schema for updating existing users
 * Similar to create schema but role field is optional
 */
export const updateUserSchema = z.object({
  ...baseUserSchema,
  role: z.string().optional()
})

/**
 * Type representing the shape of data required to create a new user
 */
export type CreateUserSchema = z.infer<typeof createUserSchema>

/**
 * Type representing the shape of data allowed when updating a user
 */
export type UpdateUserSchema = z.infer<typeof updateUserSchema>

/**
 * Type for tracking validation errors for each field in the create user schema
 */
export type ValidationErrors = Partial<Record<keyof CreateUserSchema, string>>
