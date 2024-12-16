import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { userApi } from '@/lib/api'
import type { User } from '@/lib/types'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

export function useUsers() {
  const queryClient = useQueryClient()
  const userStore = useUserStore()
  const { filters } = storeToRefs(userStore)

/******************************************************
 *                    Queries
 ******************************************************/
  const usersQuery = useQuery({
    queryKey: ['users', filters],
    queryFn: () => userApi.getFiltered(filters.value),
    staleTime: 1000 * 60 * 5,   // Cache goes stale after 5 mins
    gcTime: 1000 * 60 * 10,     // Cache garbage collection: 10 mins
    retry: 2,                   // Retry failed requests twice
    refetchOnWindowFocus: false
  })

  const userByIdQuery = (id: number) => useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id
  })

/******************************************************
 *                    Mutations
 ******************************************************/
  const createUserMutation = useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => userApi.create(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, user }: { id: number; user: Partial<User> }) => {
      try {
        const response = await userApi.update(id, user)
        return response
      } catch (error) {
        console.error('Mutation error:', error)
        throw error
      }
    },
    onError: (error) => {
      console.error('Mutation onError:', error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => userApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  return {
    usersQuery,
    userByIdQuery,

    createUserMutation,
    updateUserMutation,
    deleteUserMutation
  }
}
