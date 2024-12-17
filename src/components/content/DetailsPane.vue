<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { z } from 'zod'
  import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { Select } from '@/components/ui/select'
  import { USER_PLANS, COMPANIES, type UserPlan, type UserCompany } from '@/lib/constants'
  import FormField from './FormField.vue'
  import { useUserStore } from '@/stores/user'
  import { storeToRefs } from 'pinia'
  import { useUsers } from '@/composables/useUsers'
  import { SaveIcon }  from 'lucide-vue-next'
  import Avatar from '../ui/avatar/Avatar.vue'
  import { useToast } from '@/composables/useToast'
  import { cn, formatPhoneNumber } from '@/lib/utils'
  import DeleteUserButton from './DeleteUserButton.vue'
  import { updateUserSchema, type UpdateUserSchema, type ValidationErrors } from '../../lib/schemas'

  const userStore = useUserStore()
  const { selectedUser } = storeToRefs(userStore)
  const { updateUserMutation } = useUsers()
  const { showSuccess, showError } = useToast()

  const errors = ref<ValidationErrors>({})
  const isSubmitting = ref(false)

  // Form state to copy the selected user data
  const formData = ref<UpdateUserSchema>({
  first_name: '',
  last_name: '',
  role: '',
  plan: USER_PLANS[0].value as UserPlan,
  company: COMPANIES[0].value as UserCompany,
  email: '',
  phone_number: '',
  avatar_url: ''
})

// Watch for update to formData when selectedUser changes
watch(selectedUser, (newUser) => {
   console.log('Selected User Data:', newUser)
  if (newUser) {
    formData.value = {
      first_name: newUser.first_name || '',
      last_name: newUser.last_name || '',
      role: newUser.role || '',
      plan: newUser.plan as UserPlan,
      company: newUser.company as UserCompany,
      email: newUser.email || '',
      phone_number: newUser.phone_number || '',
      avatar_url: newUser.avatar_url || '',
    }
  } else {
    // Reset form if no user is selected
    formData.value = {
      first_name: '',
      last_name: '',
      role: '',
      plan: USER_PLANS[0].value as UserPlan,
      company: COMPANIES[0].value as UserCompany,
      email: '',
      phone_number: '',
      avatar_url: '',
    }
  }
}, { immediate: true })

  // handler for the phone input
  function handlePhoneInput(event: Event) {
    const input = event.target as HTMLInputElement
    formData.value.phone_number = formatPhoneNumber(input.value)
  }

  const handleAvatarUpdate = (url: string) => {
    formData.value.avatar_url = url
  }

  const handleUserDeleted = () => {
    userStore.setSelectedUser(null)
  }

  // Validate single field
  const validateField = (field: keyof UpdateUserSchema, value: string) => {
    try {
      const singleFieldSchema = z.object({
        [field]: updateUserSchema.shape[field]
      })

      singleFieldSchema.parse({ [field]: value })
      delete errors.value[field]
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value[field] = error.errors[0].message
      }
    }
  }

  // Validate form data
  const validateForm = () => {
    try {
      // Create a clean object with all required fields
      const dataToValidate: UpdateUserSchema = {
        first_name: formData.value.first_name.trim(),
        last_name: formData.value.last_name.trim(),
        role: formData?.value?.role?.trim() || '', // optional (for now)
        plan: formData.value.plan,
        company: formData.value.company,
        email: formData.value.email.trim(),
        phone_number: formData.value.phone_number.trim(),
        avatar_url: formData.value.avatar_url || ''
      }

      updateUserSchema.parse(dataToValidate)
      errors.value = {}
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        errors.value = error.errors.reduce((acc, curr) => {
          const field = curr.path[0] as keyof UpdateUserSchema
          acc[field] = curr.message
          return acc
        }, {} as ValidationErrors)
      }
      return false
    }
  }

  // Handle form submission
  const handleSave = async () => {
    if (!selectedUser.value || isSubmitting.value) return

    if (!validateForm()) {
      showError('Validation Error', 'Please check the form and try again.')
      return
    }

    try {
      isSubmitting.value = true

      await updateUserMutation.mutateAsync({
        id: selectedUser.value.id,
        user: formData.value
      })

      showSuccess(
        'Success',
        `${formData.value.first_name} ${formData.value.last_name}'s details have been updated.`
      )
    } catch (error) {
      console.error('Save error:', error)
      showError(
        'Failed to update user',
        'There was an error saving the user details. Please try again.'
      )
    } finally {
      isSubmitting.value = false
    }
  }

  // Handle input blur for real time validation
  const handleBlur = (field: keyof UpdateUserSchema) => {
    // ignore undefined optional fields
    if(!!formData?.value[field]) {
      validateField(field, formData.value[field])
    }
  }
</script>

<template>
  <Card class="w-full min-w-96">

    <CardContent class="">
      <article class="flex flex-col md:flex-row gap-0">
        <aside class="w-full h-48 md:h-auto md:w-1/3 bg-muted">
          <Avatar
            v-if="selectedUser"
            :image-url="formData.avatar_url"
            :on-update-image="handleAvatarUpdate"
            size="lg"
            class="w-full h-full"
          />
        </aside>
        <section class="w-full md:w-2/3 p-4">
          <CardHeader>
            <CardTitle class="text-xl font-semibold">
              {{ selectedUser?.first_name }} {{ selectedUser?.last_name }}
            </CardTitle>
            <p class="text-sm text-muted-foreground">{{ selectedUser?.role }}</p>
          </CardHeader>
          <h3 class="text-md font-medium mb-4">User Details</h3>

          <div class="space-y-4">
            <FormField label="First Name:" required>
              <Input
                v-model="formData.first_name"
                class="bg-white"
                :class="{ 'border-destructive': errors.first_name }"
                :disabled="!selectedUser"
                @blur="handleBlur('first_name')"
              />
              <span v-if="errors.first_name" class="text-xs text-destructive">
                {{ errors.first_name }}
              </span>
            </FormField>

            <FormField label="Last Name:" required>
              <Input
                v-model="formData.last_name"
                class="bg-white"
                :class="{ 'border-destructive': errors.last_name }"
                :disabled="!selectedUser"
                @blur="handleBlur('last_name')"
              />
              <span v-if="errors.last_name" class="text-sm text-destructive">
                {{ errors.last_name }}
              </span>
            </FormField>

            <FormField label="Plan:" required>
              <Select
                v-model="formData.plan"
                :options="USER_PLANS"
                placeholder="Select a plan"
                :class="cn(errors.plan && 'border-destructive')"
                :disabled="!selectedUser"
                @blur="handleBlur('plan')"
              />
              <span v-if="errors.plan" class="text-sm text-destructive">
                {{ errors.plan }}
              </span>
            </FormField>

            <FormField label="Company:" required>
              <Select
                v-model="formData.company"
                :options="COMPANIES"
                placeholder="Select a company"
                :class="cn(errors.company && 'border-destructive')"
                :disabled="!selectedUser"
                @blur="handleBlur('company')"
              />
              <span v-if="errors.company" class="text-sm text-destructive">
                {{ errors.company }}
              </span>
            </FormField>

            <FormField label="Role:">
              <Input
                v-model="formData.role"
                class="bg-white"
                :class="{ 'border-destructive': errors.role }"
                :disabled="!selectedUser"
                @blur="handleBlur('role')"
              />
              <span v-if="errors.last_name" class="text-sm text-destructive">
                {{ errors.role }}
              </span>
            </FormField>

            <FormField label="Email:" required>
              <Input
                v-model="formData.email"
                class="bg-white"
                :class="{ 'border-destructive': errors.email }"
                :disabled="!selectedUser"
                @blur="handleBlur('email')"
              />
              <span v-if="errors.email" class="text-sm text-destructive">
                {{ errors.email }}
              </span>
            </FormField>

            <FormField label="Phone Number:" required>
              <Input
                v-model="formData.phone_number"
                class="bg-white"
                :class="cn(errors.phone_number && 'border-destructive')"
                placeholder="(555) 555-5555"
                :disabled="!selectedUser"
                @input="handlePhoneInput"
                @blur="handleBlur('phone_number')"
                maxlength="14"
              />
              <span v-if="errors.phone_number" class="text-sm text-destructive">
                {{ errors.phone_number }}
              </span>
            </FormField>
          </div>
        </section>
      </article>
      <hr />
    </CardContent>
    <CardFooter class="flex justify-between items-center pt-4">
      <DeleteUserButton
        :user="selectedUser"
        @deleted="handleUserDeleted"
      />

      <Button
        class="w-60"
        @click="handleSave"
        :disabled="isSubmitting || Object.keys(errors).length > 0 || !selectedUser"
      >
        <SaveIcon />
        {{ isSubmitting ? 'Saving...' : 'Save' }}
      </Button>
    </CardFooter>
  </Card>
</template>
