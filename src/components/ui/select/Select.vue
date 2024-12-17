<script setup lang="ts">
  import { computed } from 'vue'
  import { ChevronDown } from 'lucide-vue-next'
  import {
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectViewport,
    type SelectRootProps
  } from 'radix-vue'
  import { cn } from '@/lib/utils'

  interface Props extends Omit<SelectRootProps, 'modelValue'> {
    placeholder?: string
    options: ReadonlyArray<{ readonly value: string; readonly label: string }> | Array<{ value: string; label: string }>
    class?: string
    modelValue?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    placeholder: 'Select option',
    modelValue: undefined
  })

  const emit = defineEmits([
    'update:modelValue',
    'update:open'
  ])

  const modelValue = computed({
    get() {
      return props.modelValue
    },
    set(value: string) {
      emit('update:modelValue', value)
    }
  })

  // Compute the selected label based on the current value
  const selectedLabel = computed(() => {
    const option = props.options.find(opt => opt.value === modelValue.value)
    return option?.label || props.placeholder
  })
</script>

<template>
  <SelectRoot v-model="modelValue" :disabled="disabled">
    <SelectTrigger
      :class="cn(
        'w-full flex h-9 items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )"
    >
      <SelectValue>{{ selectedLabel }}</SelectValue>
      <ChevronDown class="h-4 w-4 opacity-50" />
    </SelectTrigger>
    <SelectContent
      position="popper"
      :side-offset="4"
      class="relative z-50 min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    >
      <SelectViewport class="p-1 max-h-[300px] overflow-y-auto">
        <SelectGroup>
          <SelectItem
            v-for="option in options"
            :key="option.value"
            :value="option.value"
            class="relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer hover:bg-accent hover:text-accent-foreground"
          >
            {{ option.label }}
          </SelectItem>
        </SelectGroup>
      </SelectViewport>
    </SelectContent>
  </SelectRoot>
</template>
