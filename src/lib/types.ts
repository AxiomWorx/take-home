/**
 * Represents a user in the system
 *
 * @interface User
 */
export interface User {
  id: number
  first_name: string
  last_name: string
  role: string
  plan: string
  company: string
  email: string
  phone_number: string
  avatar_url?: string
}

/**
 * Filter parameters for querying users
 *
 * @interface UserFilters
 */
export interface UserFilters {
  first_name?: string
  last_name?: string
  plan?: string
  page?: number
  limit?: number
}
