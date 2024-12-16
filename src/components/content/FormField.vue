<script setup lang="ts">
defineOptions({
  name: 'FormField'
})

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="space-y-2">
    <div class="bg-background p-2 md:p-4 rounded-sm flex items-center gap-4">
      <label class="text-xs md:text-sm font-medium text-nowrap">
        <span v-if="required" class="text-destructive">*</span>
        {{ label }}
      </label>
      <div class="flex-1">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
