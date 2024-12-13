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
    queryFn: () => userApi.getFiltered(filters.value)
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
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      userApi.update(id, user),
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
