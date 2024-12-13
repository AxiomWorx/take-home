<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { HTMLAttributes } from 'vue'
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import { cn } from '@/lib/utils'
import type { AvatarSize } from './index'

interface Props {
  seed?: string
  size?: AvatarSize['size']
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  seed: '',
  size: 'default'
})

const avatarUrl = ref('')

const sizeMap = {
  sm: 32,
  default: 64,
  lg: 128,
  xl: 256
} as const

onMounted(async () => {
  const avatar = createAvatar(lorelei, {
    size: sizeMap[props.size],
    seed: props.seed || Math.random().toString()
  })
  avatarUrl.value = await avatar.toDataUri()
})

const avatarSizeClasses = {
  sm: 'h-8 w-8',
  default: 'h-16 w-16',
  lg: 'h-32 w-32',
  xl: 'h-64 w-64'
}
</script>

<template>
  <div :class="cn(
    'relative flex shrink-0 overflow-hidden rounded-full',
    avatarSizeClasses[size],
    props.class
  )">
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :alt="seed || 'Avatar'"
      class="aspect-square h-full w-full"
    />
  </div>
</template>
