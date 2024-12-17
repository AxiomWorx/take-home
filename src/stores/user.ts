/**
 * Pinia store for managing user state across the application
 * Handles selected user, user list, and filter state
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User, UserFilters } from '@/lib/types'

export const useUserStore = defineStore('user', () => {
  /**
   * Currently selected user for viewing/editing in the details pane
   */
  const selectedUser = ref<User | null>(null)

  /**
   * List of all users currently displayed in the sidebar
   */
  const users = ref<User[]>([])

  /**
   * Active filters applied to the user list
   */
  const filters = ref<UserFilters>({
    page: 1,
    limit: 10
  })

  /**
   * Updates the currently selected user
   * @param user - The user to select, or null to clear selection
   */
  function setSelectedUser(user: User | null) {
    selectedUser.value = user
  }

  /**
   * Updates the list of displayed users
   * @param newUsers - Array of users to display
   */
  function setUsers(newUsers: User[]) {
    users.value = newUsers
  }

  /**
   * Updates the current filter settings
   * @param newFilters - Partial filter settings to merge with existing filters
   */
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
