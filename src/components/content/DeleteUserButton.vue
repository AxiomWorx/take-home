<script setup lang="ts">
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
  } from '@/components/ui/alert-dialog'
  import { Trash2 } from 'lucide-vue-next'
  import { useUsers } from '@/composables/useUsers'
  import { useToast } from '@/composables/useToast'
  import type { User } from '@/lib/types'

  interface Props {
    user: User | null
    onDeleted?: () => void
  }

  const props = defineProps<Props>()

  const { deleteUserMutation } = useUsers()
  const { showSuccess, showError } = useToast()
  const isDeleteDialogOpen = ref(false)
  const isDeletingUser = ref(false)

  const handleDelete = async () => {
    if (!props.user || isDeletingUser.value) return

    try {
      isDeletingUser.value = true
      await deleteUserMutation.mutateAsync(props.user.id)

      showSuccess(
        'Success',
        `${props.user.first_name} ${props.user.last_name} has been deleted.`
      )

      props.onDeleted?.()
      isDeleteDialogOpen.value = false
    } catch (error) {
      console.error('Delete error:', error)
      showError(
        'Failed to delete user',
        'There was an error deleting the user. Please try again.'
      )
    } finally {
      isDeletingUser.value = false
    }
  }
</script>

<template>
  <div>
    <Button
      variant="destructive"
      @click="isDeleteDialogOpen = true"
      :disabled="!user"
    >
      <Trash2 class="w-4 h-4 mr-2" />
      Delete User
    </Button>

    <AlertDialog v-model:open="isDeleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            {{ user?.first_name }} {{ user?.last_name }}'s
            account and remove their data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel @click="isDeleteDialogOpen = false">
            Cancel
          </AlertDialogCancel>
          <Button
            variant="destructive"
            @click="handleDelete"
            :disabled="isDeletingUser"
          >
            {{ isDeletingUser ? 'Deleting...' : 'Delete Account' }}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
</template>
