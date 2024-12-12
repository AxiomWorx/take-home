<script setup lang="ts">
  import { Button } from '@/components/ui/button'
</script>

<template>
  <aside class="hidden md:flex w-64 border-r bg-card p-4 flex-col">
      <div class="flex items-center gap-2 mb-8">
         <Button class="w-full">Filter</Button>
      </div>

      <nav class="space-y-2">
        <a href="#" class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
          User 1
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
          User 2
        </a>
        <a href="#" class="flex items-center gap-2 p-2 rounded-lg hover:bg-accent">
          User 3
        </a>
      </nav>
    </aside>
</template>

<style scoped>

</style>
