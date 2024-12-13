<script setup lang="ts">
  import DesktopSidebar from './DesktopSidebar.vue'
  import MobileSidebar from './ModbileSidebar.vue'

</script>

<template>
  <div class="min-h-screen flex">
    <DesktopSidebar />
    <MobileSidebar />

    <main class="flex-1 min-w-0 bg-background">
      <div class="flex h-[calc(100vh-2rem)]">
        <div class="flex-1 min-w-0 p-8 overflow-auto">
          <slot name="content">
          </slot>
        </div>

      </div>
    </main>
  </div>
</template>
