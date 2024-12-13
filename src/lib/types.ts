export interface User {
  id: number
  firstName: string
  lastName: string
  role: string
  plan: string
  company: string
  email: string
  phone: string
}

export interface UserFilters {
  firstName?: string
  lastName?: string
  plan?: string
  page?: number
  limit?: number
}
