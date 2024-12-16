<script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import type { User } from '@/lib/types'
  import { FilterIcon, PlusIcon } from '../ui/icons'
  import CreateUserDialog from '../content/CreateUserDialog.vue'

  const isCreateDialogOpen = ref(false)

  const userStore = useUserStore()
  const { users, selectedUser } = storeToRefs(userStore)

  function handleUserClick(user: User) {
    userStore.setSelectedUser(user)
  }
</script>

<template>
  <aside class="hidden md:flex w-64 border-r bg-card flex-col max-h-screen overflow-y-auto">
    <div class="flex items-center gap-2 mb-6 sticky top-0 z-10">
      <div class="bg-white w-full h-16 pt-4">
        <div class="px-4">
          <Button class="w-full"><FilterIcon /> Filter</Button>
        </div>

        <hr class="my-2 w-full h-2 z-20" />
      </div>
    </div>

    <div class="flex-1 overflow-auto">
      <nav class="space-y-2 px-4 pb-8">
        <a
          v-for="user in users"
          :key="user.id"
          href="#"
          class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
          :class="{ 'bg-accent': selectedUser?.id === user.id }"
          @click.prevent="handleUserClick(user)"
        >
          <div class="flex flex-col">
            <span class="text-sm font-medium">{{ user.first_name }} {{ user.last_name }}</span>
            <span class="text-xs text-muted-foreground">{{ user.company }}</span>
          </div>
        </a>
      </nav>
    </div>
    <div class="flex-none p-4 border-t bg-gray-100">
      <Button class="w-full" variant="default" @click="isCreateDialogOpen = true">
        <PlusIcon />
        Create User
      </Button>
      <CreateUserDialog v-model:open="isCreateDialogOpen" />
    </div>
  </aside>
</template>
