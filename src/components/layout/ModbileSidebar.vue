<script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import {
    Sheet,
    SheetContent,
    SheetTrigger
  } from '@/components/ui/sheet'
  import { Menu } from 'lucide-vue-next'

  const isMobileOpen = ref(false)
</script>

<template>
  <Sheet v-model:open="isMobileOpen">
    <SheetTrigger class="md:hidden p-4" asChild>
      <Button variant="ghost" size="icon">
        <Menu class="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="w-64">
      <div class="flex items-center justify-between mb-8 mt-4">
          <Button class="w-full">Filter</Button>
      </div>

      <nav class="space-y-2">
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
          @click="isMobileOpen = false"
        >
          User 1
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
          @click="isMobileOpen = false"
        >
          User 2
        </a>
        <a
          href="#"
          class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
          @click="isMobileOpen = false"
        >
          User 3
        </a>
      </nav>
    </SheetContent>
  </Sheet>
</template>

<style scoped>

</style>
