import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormField from '../FormField.vue'

describe('FormField', () => {
  it('renders label correctly', () => {
    const wrapper = mount(FormField, {
      props: { label: 'Test Label' }
    })
    expect(wrapper.find('label').text()).toBe('Test Label')
  })

  it('adds required asterisk when required prop is true', () => {
    const wrapper = mount(FormField, {
      props: { label: 'Test Label', required: true }
    })
    expect(wrapper.find('.text-destructive').exists()).toBe(true)
  })

  it('applies gutter class when gutter prop is true', () => {
    const wrapper = mount(FormField, {
      props: { label: 'Test Label', gutter: true }
    })
    expect(wrapper.find('.p-2').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mount(FormField, {
      props: { label: 'Test Label' },
      slots: {
        default: '<input type="text" />'
      }
    })
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })
})

