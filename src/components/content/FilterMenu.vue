<script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import { Label } from '@/components/ui/label'
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from '@/components/ui/popover'
  import { Select } from '@/components/ui/select'
  import { FilterIcon } from 'lucide-vue-next'
  import { USER_PLANS } from '@/lib/constants'
  import { useUserStore } from '@/stores/user'

  const userStore = useUserStore()

  const isOpen = ref(false)
  const firstName = ref('')
  const lastName = ref('')
  const plan = ref('All Plans')

  // Apply filters when the Filter button is clicked
  const handleFilter = () => {
    const updatedFilters = {
      ...(firstName.value ? { first_name: firstName.value } : {}),
      ...(lastName.value ? { last_name: lastName.value } : {}),
      ...(plan.value !== 'All Plans' ? { plan: plan.value } : {})
    }

    userStore.updateFilters(updatedFilters)
    isOpen.value = false
  }

  const handleReset = () => {
    // Reset local form state
    firstName.value = ''
    lastName.value = ''
    plan.value = 'All Plans'

    // Update store with default filters
    userStore.updateFilters({
      // page: 1,
      // limit: 10,
      first_name: undefined,
      last_name: undefined,
      plan: undefined
    })

    isOpen.value = false
  }

  const planOptions = [
    { value: 'All Plans', label: 'All Plans' },
    ...USER_PLANS
  ]
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button class="w-full gap-2" variant="outline">
        <FilterIcon />
        Filter
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-80">
      <div class="space-y-4 p-4">
        <div class="space-y-2">
          <Label class="text-base">First Name</Label>
          <Input
            v-model="firstName"
            placeholder="First Name"
            class="w-full bg-white"
          />
        </div>

        <div class="space-y-2">
          <Label class="text-base">Last Name</Label>
          <Input
            v-model="lastName"
            placeholder="Last Name"
            class="w-full bg-white"
          />
        </div>

        <div class="space-y-2">
          <Label class="text-base">Plan</Label>
          <Select
            v-model="plan"
            :options="planOptions"
            class="w-full"
            placeholder="Select a plan"
          />
        </div>

        <div class="flex justify-between pt-2">
          <Button
            variant="outline"
            @click="handleReset"
            class="text-gray-500"
          >
            Reset
          </Button>
          <Button
            @click="handleFilter"
            class="px-8"
            data-testid="apply-filter-button"
          >
            Filter
          </Button>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
