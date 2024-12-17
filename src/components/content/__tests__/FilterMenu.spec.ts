import { describe, it, expect } from 'vitest'
import { renderWithPlugins } from '../../../../test-utils'
import FilterMenu from '../FilterMenu.vue'
import { useUserStore } from '@/stores/user'
import { fireEvent } from '@testing-library/vue'

describe('FilterMenu', () => {
  it('renders the filter button', () => {
    const { getByRole } = renderWithPlugins(FilterMenu)
    // Use role selector instead of text
    expect(getByRole('button', { name: /filter/i })).toBeDefined()
  })

  it('opens popover when filter button is clicked', async () => {
    const { getByPlaceholderText, getByRole } = renderWithPlugins(FilterMenu)

    // Click the main filter button (more specific selector)
    await fireEvent.click(getByRole('button', { name: /filter/i }))

    // Check if filter inputs are visible
    expect(getByPlaceholderText('First Name')).toBeDefined()
    expect(getByPlaceholderText('Last Name')).toBeDefined()
  })

  it('updates filters in store when applied', async () => {
    const { getByPlaceholderText, getByRole, getByTestId } = renderWithPlugins(FilterMenu)
    const store = useUserStore()

    // Open the filter menu
    await fireEvent.click(getByRole('button', { name: /filter/i }))

    // Fill in filter values
    const firstNameInput = getByPlaceholderText('First Name')
    await fireEvent.update(firstNameInput, 'John')

    // Click the Apply Filter button (more specific selector)
    const applyButton = getByTestId('apply-filter-button')
    await fireEvent.click(applyButton)

    // Verify store was updated
    expect(store.updateFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        first_name: 'John'
      })
    )
  })

  it('resets filters when reset button is clicked', async () => {
    const { getByText, getByRole } = renderWithPlugins(FilterMenu)
    const store = useUserStore()

    // Open filter menu
    await fireEvent.click(getByRole('button', { name: /filter/i }))

    // Click reset
    await fireEvent.click(getByText('Reset'))

    // Verify store was reset
    expect(store.updateFilters).toHaveBeenCalledWith({
      first_name: undefined,
      last_name: undefined,
      plan: undefined
    })
  })
})

