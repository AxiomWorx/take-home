import { render } from '@testing-library/vue'
import { createTestingPinia } from '@pinia/testing'
import { VueQueryPlugin } from '@tanstack/vue-query'
import type { RenderOptions } from '@testing-library/vue'
import { vi } from 'vitest'
import type { Component } from 'vue'

export function renderWithPlugins(
  Component: Component,
  options: RenderOptions<Component> = {}
) {
  const pinia = createTestingPinia({
    createSpy: vi.fn
  })

  return render(Component, {
    ...options,
    global: {
      ...options.global,
      plugins: [
        pinia,
        VueQueryPlugin,
        ...(options.global?.plugins || [])
      ]
    }
  })
}
