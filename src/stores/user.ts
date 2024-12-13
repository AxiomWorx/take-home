import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserFilters } from '@/lib/types'

export const useUserStore = defineStore('user', () => {
  const selectedUser = ref<User | null>(null)
  const users = ref<User[]>([])
  const filters = ref<UserFilters>({
    page: 1,
    limit: 10
  })

  function setSelectedUser(user: User | null) {
    selectedUser.value = user
  }

  function setUsers(newUsers: User[]) {
    users.value = newUsers
  }

  function updateFilters(newFilters: Partial<UserFilters>) {
    filters.value = {
      ...filters.value,
      ...newFilters
    }
  }

  return {
    selectedUser,
    users,
    filters,
    setSelectedUser,
    setUsers,
    updateFilters
  }
})
