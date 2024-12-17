<script setup lang="ts">
  import { ref } from 'vue'
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@/lib/utils'
  import { UserIcon, ImagePlus } from 'lucide-vue-next'
  import { z } from 'zod'
  import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
  } from '@/components/ui/dialog'
  import { Button } from '@/components/ui/button'
  import { Input } from '@/components/ui/input'
  import type { AvatarSize } from './index'

  interface Props {
    size?: AvatarSize['size']
    class?: HTMLAttributes['class']
    imageUrl?: string
    onUpdateImage?: (url: string) => void
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'default',
    imageUrl: ''
  })

  const isDialogOpen = ref(false)
  const isLoading = ref(false)
  const imageUrlInput = ref('')
  const error = ref('')

  const imageUrlSchema = z.string()
    .min(1, 'Image URL is required')
    .url('Please enter a valid URL')
    .refine(
      (url) => {
        try {
          new URL(url)
          return true
        } catch {
          return false
        }
      },
      'Invalid URL format'
    )

  async function validateImageUrl(url: string): Promise<boolean> {
    try {
      // validate URL format using Zod
      imageUrlSchema.parse(url)

      // validate image content type
      const response = await fetch(url, { method: 'HEAD' })
      const contentType = response.headers.get('content-type')

      if (!contentType?.startsWith('image/')) {
        throw new Error('URL does not point to a valid image')
      }

      return true
    } catch (err) {
      if (err instanceof z.ZodError) {
        error.value = err.errors[0].message
      } else if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'Failed to validate image URL'
      }
      return false
    }
  }

  async function handleSubmit() {
    error.value = ''

    if (!imageUrlInput.value) {
      error.value = 'Please enter an image URL'
      return
    }

    try {
      isLoading.value = true
      const isValid = await validateImageUrl(imageUrlInput.value)

      if (!isValid) {
        return
      }

      props.onUpdateImage?.(imageUrlInput.value)
      isDialogOpen.value = false
      imageUrlInput.value = ''
      error.value = ''
    } catch (err) {
      error.value = 'Failed to validate image URL'
    } finally {
      isLoading.value = false
    }
  }
</script>

<template>
  <div class="h-full w-full max-h-96 max-w-96">
    <div
      :class="cn(
        'relative flex shrink-0 overflow-hidden rounded-lg bg-muted items-center justify-center group h-full w-full',
        props.class
      )"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="'User Avatar'"
        class="aspect-square h-full w-full object-cover"
      />
      <UserIcon
        v-else
        :size="128"
        class="text-muted-foreground/50"
      />
      <button
        @click="isDialogOpen = true"
        class="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
      >
        <ImagePlus class="w-8 h-8 text-white" />
      </button>
    </div>

    <Dialog v-model:open="isDialogOpen">
      <DialogContent class="sm:max-w-md" aria-describedby="Upload an Avatar image">
        <DialogHeader>
          <DialogTitle>Update avatar image</DialogTitle>
        </DialogHeader>
        <div class="flex items-center space-x-2 py-4">
          <div class="grid flex-1 gap-2">
            <Input
              v-model="imageUrlInput"
              placeholder="Enter image URL..."
              type="url"
              :class="{ 'border-destructive': error }"
            />
            <span v-if="error" class="text-xs text-destructive">
              {{ error }}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            @click="isDialogOpen = false"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            :disabled="isLoading"
            @click="handleSubmit"
          >
            {{ isLoading ? 'Validating...' : 'Update avatar' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
