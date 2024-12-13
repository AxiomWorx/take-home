
<script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
  import { ScrollArea } from '@/components/ui/scroll-area'
  import { Menu } from 'lucide-vue-next'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import type { User } from '@/lib/types'

  const isMobileOpen = ref(false)
  const userStore = useUserStore()
  const { users, selectedUser } = storeToRefs(userStore)

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
            <Button class="w-full">Filter</Button>
          </div>
        </div>
        <hr class="my-2 w-full h-2 z-20" />
      </div>

      <ScrollArea class="h-full p-4">
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

    </SheetContent>
  </Sheet>
</template>
