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
  },
  gutter: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div class="space-y-2">
    <div
      class="bg-background rounded-sm flex items-center gap-4"
      :class="[
        gutter ? 'p-2 md:p-3' : 'p-0'
      ]"
    >
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
