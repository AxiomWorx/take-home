import axios from 'axios'
import { User, UserFilters } from './types'

/**
 * Axios instance configured for the user management API
 */
export const api = axios.create({
  baseURL: 'https://retoolapi.dev/99Xpa9',
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * API client for user management operations
 */
export const userApi = {
  /**
   * Retrieves all users from the system
   * @returns Promise resolving to array of users
   */
  getAll: () =>
    api.get<User[]>('/users').then(res => res.data),

  /**
   * Retrieves filtered list of users based on provided criteria
   * @param filters - Filter criteria for users
   * @returns Promise resolving to filtered array of users
   */
  getFiltered: async (filters: UserFilters) => {
    const params: Record<string, string | number> = {}

    if (filters.first_name) {
      params['first_name'] = filters.first_name
    }
    if (filters.last_name) {
      params['last_name'] = filters.last_name
    }
    if (filters.plan && filters.plan !== 'All Plans') {
      params['plan'] = filters.plan
    }

    return api.get<User[]>('/users', { params }).then(res => res.data)
  },

  /**
   * Retrieves a single user by their ID
   * @param id - User's unique identifier
   * @returns Promise resolving to user data
   */
  getById: (id: number) =>
    api.get<User>(`/users/${id}`).then(res => res.data),

/**
 * Retrieves a paginated list of users
 *
 * Note: While not currently implemented in the UI due to the small dataset,
 * this endpoint supports pagination for future scalability when handling
 * larger user lists.
 *
 * @param page - The page number to retrieve (starts at 1)
 * @param limit - The maximum number of users to return per page
 * @returns Promise resolving to array of users for the requested page
 */
  getPaginated: (page: number, limit: number) =>
    api.get<User[]>('/users', {
      params: {
        _page: page,
        _limit: limit
      }
    }).then(res => res.data),

  /**
   * Creates a new user
   * @param user - User data excluding ID
   * @returns Promise resolving to created user data
   */
  create: (user: Omit<User, 'id'>) =>
    api.post<User>('/users', user).then(res => res.data),

  /**
   * Updates an existing user
   * @param id - User's unique identifier
   * @param user - Partial user data to update
   * @returns Promise resolving to updated user data
   */
  update: async (id: number, user: Partial<User>) => {
    try {
      const response = await api.put<User>(`/users/${id}`, user)
      return response.data
    } catch (error) {
      console.error('API update error:', error)
      throw error
    }
  },

  /**
   * Deletes a user from the system
   * @param id - User's unique identifier
   * @returns Promise resolving to deletion result
   */
  delete: (id: number) =>
    api.delete(`/users/${id}`).then(res => res.data)
}
