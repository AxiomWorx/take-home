import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../user'
import type { User } from '@/lib/types'

describe('useUserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('sets selected user', () => {
    const store = useUserStore()
    const mockUser: User = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      role: 'Developer',
      plan: 'Pro Plan',
      company: 'Apple',
      phone_number: '(555) 555-5555'
    }

    store.setSelectedUser(mockUser)
    expect(store.selectedUser).toEqual(mockUser)
  })

  it('updates filters', () => {
    const store = useUserStore()
    const newFilters = {
      first_name: 'John',
      plan: 'Pro Plan'
    }

    store.updateFilters(newFilters)
    expect(store.filters).toMatchObject(newFilters)
  })

  it('sets users list', () => {
    const store = useUserStore()
    const mockUsers: User[] = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        role: 'Developer',
        plan: 'Pro Plan',
        company: 'Apple',
        phone_number: '(555) 555-5555'
      }
    ]

    store.setUsers(mockUsers)
    expect(store.users).toEqual(mockUsers)
  })
})
