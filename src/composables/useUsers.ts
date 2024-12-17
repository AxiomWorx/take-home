/**
 * Composable for managing user data fetching and mutations
 * Integrates TanStack Query with the user API and Pinia store
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { userApi } from '@/lib/api'
import type { User } from '@/lib/types'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'

export function useUsers() {
  const queryClient = useQueryClient()
  const userStore = useUserStore()
  const { filters } = storeToRefs(userStore)

  /**
   * Query for fetching filtered list of users
   * Automatically re-fetches when filters change
   */
  const usersQuery = useQuery({
    queryKey: ['users', filters],
    queryFn: () => userApi.getFiltered(filters.value),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10,   // 10 minutes
    retry: 2,
    refetchOnWindowFocus: false
  })

  /**
   * Syncs query data with Pinia store whenever data changes
   */
  watch(() => usersQuery.data.value, (newData) => {
    if (newData) {
      userStore.setUsers(newData)
    }
  }, { immediate: true })

  /**
   * Query factory for fetching individual user details
   * @param id - User ID to fetch
   */
  const userByIdQuery = (id: number) => useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id
  })

  /**
   * Mutation for creating new users
   * Invalidates users query to trigger refetch
   */
  const createUserMutation = useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) => userApi.create(newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  /**
   * Mutation for updating existing users
   * Invalidates users query to trigger refetch
   */
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

  /**
   * Mutation for deleting users
   * Invalidates users query to trigger refetch
   */
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
