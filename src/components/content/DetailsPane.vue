<script setup lang="ts">
  import { computed } from 'vue'
  import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import FormField from './FormField.vue'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { useUsers } from '@/composables/useUsers'
  import { SaveIcon }  from '../ui/icons'
  import Avatar from '../ui/avatar/Avatar.vue'

  const userStore = useUserStore()
  const { selectedUser } = storeToRefs(userStore)
  const { updateUserMutation } = useUsers()

  // Form state to copy the selected user data
  const formData = computed(() => {
    if (!selectedUser.value) {
      return {
        first_name: '',
        last_name: '',
        role: '',
        plan: '',
        company: '',
        email: '',
        phone_number: ''
      }
    }

    return { ...selectedUser.value }
  })

  // Handle form submission
  const handleSave = () => {
    console.log(selectedUser)
    // if (selectedUser.value) {
    //   updateUserMutation.mutate({
    //     id: selectedUser.value.id,
    //     user: formData.value
    //   })
    // }
  }
</script>

<template>
  <Card class="w-full min-w-96">
    <CardContent v-if="!selectedUser" class="p-8 text-center text-muted-foreground">
      Select a user from the sidebar to view their details
    </CardContent>

    <CardContent v-else class="">
      <article class="flex flex-col md:flex-row gap-0">
        <aside class="w-full h-48 md:h-auto md:w-1/3 bg-muted">
          <Avatar />
        </aside>
        <section class="w-full md:w-2/3 p-4">
          <CardHeader>
            <CardTitle class="text-xl font-semibold">
              {{ selectedUser.first_name }} {{ selectedUser.last_name }}
            </CardTitle>
            <p class="text-sm text-muted-foreground">{{ selectedUser.role }}</p>
          </CardHeader>
          <h3 class="text-md font-medium mb-4">User Details</h3>

          <div class="space-y-4">
            <FormField label="First Name:" required>
              <Input
                v-model="formData.first_name"
                class="bg-white"
              />
            </FormField>

            <FormField label="Last Name:" required>
              <Input
                v-model="formData.last_name"
                class="bg-white"
              />
            </FormField>

            <FormField label="Plan:" required>
              <Input
                v-model="formData.plan"
                class="bg-white"
              />
            </FormField>

            <FormField label="Company:" required>
              <Input
                v-model="formData.company"
                class="bg-white"
              />
            </FormField>

            <FormField label="Email:" required>
              <Input
                v-model="formData.email"
                class="bg-white"
              />
            </FormField>

            <FormField label="phone_number #:" required>
              <Input
                v-model="formData.phone_number"
                class="bg-white"
              />
            </FormField>
          </div>
        </section>
      </article>
      <hr />
    </CardContent>
    <CardFooter class="flex justify-end items-center pt-4">
      <Button
        class="w-60"
        @click="handleSave"
      >
        <SaveIcon />
        {{ 'Save' }}
      </Button>
    </CardFooter>
  </Card>
</template>
