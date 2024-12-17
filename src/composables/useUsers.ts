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

  const usersQuery = useQuery({
    queryKey: ['users', filters],
    queryFn: () => userApi.getFiltered(filters.value),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    refetchOnWindowFocus: false
  })

  // Watch for changes in the query data
  watch(() => usersQuery.data.value, (newData) => {
    if (newData) {
      userStore.setUsers(newData)
    }
  }, { immediate: true })

  const userByIdQuery = (id: number) => useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id
  })

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
    onSuccess: (data, variables) => {
      console.log('Mutation success with data:', data)
      console.log('Variables used:', variables)
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
