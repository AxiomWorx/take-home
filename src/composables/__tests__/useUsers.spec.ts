import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useUsers } from '../useUsers'
import { useQuery } from '@tanstack/vue-query'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

vi.mock('@tanstack/vue-query', () => ({
  useQuery: vi.fn(() => ({
    data: { value: [] }
  })),
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
    mutateAsync: vi.fn()
  })),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn()
  }))
}))

vi.mock('@/lib/api', () => ({
  userApi: {
    getFiltered: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
}))

const mockStoreState = {
  selectedUser: null,
  users: [],
  filters: {
    page: 1,
    limit: 10
  }
}

vi.mock('@/stores/user', () => ({
  useUserStore: vi.fn(() => ({
    selectedUser: null,
    users: [],
    filters: {},
    setSelectedUser: vi.fn(),
    setUsers: vi.fn(),
    updateFilters: vi.fn(),
    $state: mockStoreState,
    $patch: vi.fn(),
    $reset: vi.fn(),
    $subscribe: vi.fn(),
    $dispose: vi.fn(),
    $id: 'user',
    $onAction: vi.fn(),
    $store: {}
  }))
}))

vi.mock('pinia', () => ({
  storeToRefs: vi.fn(() => ({
    filters: { value: {} }
  }))
}))

describe('useUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return the correct structure', () => {
    const result = useUsers()
    expect(result).toHaveProperty('usersQuery')
    expect(result).toHaveProperty('userByIdQuery')
    expect(result).toHaveProperty('createUserMutation')
    expect(result).toHaveProperty('updateUserMutation')
    expect(result).toHaveProperty('deleteUserMutation')
  })

  it('should call useQuery with correct parameters', () => {
    // Setup mock filters
    const mockFilters = { first_name: 'John' }
    vi.mocked(useUserStore).mockReturnValue({
      selectedUser: null,
      users: [],
      filters: mockFilters,
      setSelectedUser: vi.fn(),
      setUsers: vi.fn(),
      updateFilters: vi.fn(),
      $state: mockStoreState,
      $patch: vi.fn(),
      $reset: vi.fn(),
      $subscribe: vi.fn(),
      $dispose: vi.fn(),
      $id: 'user',
      $onAction: vi.fn(),
      // @ts-ignore
      $store: {}
    })
    vi.mocked(storeToRefs).mockReturnValue({
      filters: { value: mockFilters }
    } as any)

    useUsers()

    // Verify useQuery was called with correct parameters
    expect(useQuery).toHaveBeenCalledWith(expect.objectContaining({
      queryKey: ['users', { value: mockFilters }],
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false
    }))
  })
})
