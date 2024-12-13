<script setup lang="ts">
import MainLayout from '@/components/layout/index.vue'
import DetailsPane from './components/content/DetailsPane.vue';
</script>

<template>
  <main>
    <MainLayout>
    <template #content>
      <DetailsPane />
    </template>
  </MainLayout>
  </main>
</template>

<style scoped>

</style>
