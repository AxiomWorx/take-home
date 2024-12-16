<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Menu, PlusIcon, UsersIcon } from 'lucide-vue-next'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import type { User } from '@/lib/types'
import CreateUserDialog from '../content/CreateUserDialog.vue'
import FilterMenu from '../content/FilterMenu.vue'

const isMobileOpen = ref(false)
const isCreateDialogOpen = ref(false)
const userStore = useUserStore()
const { selectedUser, users } = storeToRefs(userStore)

const isEmpty = computed(() => users.value.length === 0)

function handleUserClick(user: User) {
  userStore.setSelectedUser(user)
  isMobileOpen.value = false
}
</script>

<template>
  <Sheet v-model:open="isMobileOpen">
    <SheetTrigger class="md:hidden p-4" asChild>
      <Button variant="ghost" size="icon">
        <Menu class="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="w-64 p-0">
      <div class="flex flex-col gap-2 sticky top-0">
        <div class="w-5/6 pt-4">
          <div class="px-2">
            <FilterMenu />
          </div>
        </div>
        <hr class="my-2 w-full h-2 z-20" />
      </div>

      <ScrollArea v-if="!isEmpty" class="h-4/5 px-4">
        <nav class="space-y-2 px-4">
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
      </ScrollArea>
      <div v-else class="flex flex-col items-center justify-center h-4/5 px-4 text-center">
        <UsersIcon class="w-12 h-12 text-gray-400 mb-4" />
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
        <p class="text-sm text-gray-500 mb-4">Get started by creating a new user</p>
        <Button variant="outline" @click="isCreateDialogOpen = true">
          <PlusIcon class="w-4 h-4 mr-2" />
          Create User
        </Button>
      </div>
      <div class="flex-none p-4 border-t bg-gray-100">
        <Button class="w-full" variant="default" @click="isCreateDialogOpen = true">
          <PlusIcon class="w-4 h-4 mr-2" />
          Create User
        </Button>
        <CreateUserDialog v-model:open="isCreateDialogOpen" />
      </div>
    </SheetContent>
  </Sheet>
</template>
