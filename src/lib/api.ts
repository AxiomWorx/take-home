import axios from 'axios'
import { User, UserFilters } from './types'

export const api = axios.create({
  baseURL: 'https://retoolapi.dev/99Xpa9',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const userApi = {
/******************************************************
 *                    Queries
 ******************************************************/
  getAll: () =>
    api.get<User[]>('/users').then(res => res.data),

  getFiltered: (filters: UserFilters) =>
    api.get<User[]>('/users', { params: filters }).then(res => res.data),

  getById: (id: number) =>
    api.get<User>(`/users/${id}`).then(res => res.data),

  getPaginated: (page: number, limit: number) =>
    api.get<User[]>('/users', {
      params: {
        _page: page,
        _limit: limit
      }
    }).then(res => res.data),

/******************************************************
 *                    Mutations
 ******************************************************/
  create: (user: Omit<User, 'id'>) =>
    api.post<User>('/users', user).then(res => res.data),

  update: async (id: number, user: Partial<User>) => {
    try {
      const response = await api.put<User>(`/users/${id}`, user)
      return response.data
    } catch (error) {
      console.error('API update error:', error)
      throw error
    }
  },

  patch: (id: number, user: Partial<User>) =>
    api.patch<User>(`/users/${id}`, user).then(res => res.data),

  delete: (id: number) =>
    api.delete(`/users/${id}`).then(res => res.data)
}
