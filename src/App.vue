<script setup lang="ts">
import MainLayout from '@/components/layout/index.vue'
import DetailsPane from './components/content/DetailsPane.vue';
import { Toaster } from '@/components/ui/toast'
</script>

<template>
  <main>
    <MainLayout>
    <template #content>
      <DetailsPane />
    </template>
  </MainLayout>
  <!-- Toaster handles popup messages for user actions -->
  <Toaster />
  </main>
</template>

<style scoped>

</style>
