<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Select from '../ui/select/Select.vue'
import FormField from '../content/FormField.vue'
import { useUsers } from '@/composables/useUsers'
import { useToast } from '@/composables/useToast'
import { PlusIcon } from '../ui/icons'
import { USER_PLANS, COMPANIES } from '@/lib/constants'
import { cn, formatPhoneNumber } from '@/lib/utils'

// Validation schema (reusing the same validation rules as DetailsPane)
const userSchema = z.object({
  first_name: z.string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .trim(),
  last_name: z.string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .trim(),
  role: z.string()
    .min(1, 'Role is required')
    .trim(),
  plan: z.enum(['Free Plan', 'Pro Plan', 'Trial'] as const),
  company: z.enum(['Axiomworx', 'Equinox Engineering', 'Apple'] as const),
  email: z.string()
    .min(1, 'Email is required')
    .email('Invalid email address')
    .trim(),
  phone_number: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Phone number must be in format (555) 555-5555')
    .trim()
})

type UserSchema = z.infer<typeof userSchema>
type ValidationErrors = Partial<Record<keyof UserSchema, string>>

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const { createUserMutation } = useUsers()
const { showSuccess, showError } = useToast()

const errors = ref<ValidationErrors>({})
const isSubmitting = ref(false)

// Initial form state
const formData = ref<UserSchema>({
  first_name: '',
  last_name: '',
  role: '',
  plan: USER_PLANS[0].value,
  company: COMPANIES[0].value,
  email: '',
  phone_number: ''
})

// handler for the phone input
function handlePhoneInput(event: Event) {
  const input = event.target as HTMLInputElement
  const formattedValue = formatPhoneNumber(input.value)
  formData.value.phone_number = formattedValue
}

// Validate single field
const validateField = (field: keyof UserSchema, value: string) => {
  try {
    const singleFieldSchema = z.object({
      [field]: userSchema.shape[field]
    })

    singleFieldSchema.parse({ [field]: value })
    delete errors.value[field]
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value[field] = error.errors[0].message
    }
  }
}

// Validate entire form
const validateForm = () => {
  try {
    const dataToValidate: UserSchema = {
      first_name: formData.value.first_name.trim(),
      last_name: formData.value.last_name.trim(),
      role: formData.value.role?.trim() || '',
      plan: formData.value.plan,
      company: formData.value.company,
      email: formData.value.email.trim(),
      phone_number: formData.value.phone_number.trim()
    }

    userSchema.parse(dataToValidate)
    errors.value = {}
    return true
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.errors.reduce((acc, curr) => {
        const field = curr.path[0] as keyof UserSchema
        acc[field] = curr.message
        return acc
      }, {} as ValidationErrors)
    }
    return false
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (isSubmitting.value) return

  if (!validateForm()) {
    showError('Validation Error', 'Please check the form and try again.')
    return
  }

  try {
    isSubmitting.value = true
    await createUserMutation.mutateAsync(formData.value)

    showSuccess(
      'Success',
      `${formData.value.first_name} ${formData.value.last_name} has been created.`
    )

    // Reset form and close dialog
    formData.value = {
      first_name: '',
      last_name: '',
      role: '',
      plan: USER_PLANS[0].value,
      company: COMPANIES[0].value,
      email: '',
      phone_number: ''
    }
    emit('update:open', false)
  } catch (error) {
    console.error('Create error:', error)
    showError(
      'Failed to create user',
      'There was an error creating the user. Please try again.'
    )
  } finally {
    isSubmitting.value = false
  }
}

// Handle input blur for real time validation
const handleBlur = (field: keyof UserSchema) => {
  if (!!formData.value[field]) {
    validateField(field, formData.value[field])
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)" class="">
    <DialogContent class="lg:max-w-[45rem]">
      <DialogHeader>
        <DialogTitle>Create New User</DialogTitle>
      </DialogHeader>

      <div class="space-y-4 py-4">
        <FormField label="First Name:" required>
          <Input
            v-model="formData.first_name"
            class="bg-white"
            placeholder="Jane"
            :class="{ 'border-destructive': errors.first_name }"
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
            placeholder="Doe"
            :class="{ 'border-destructive': errors.last_name }"
            @blur="handleBlur('last_name')"
          />
          <span v-if="errors.last_name" class="text-xs text-destructive">
            {{ errors.last_name }}
          </span>
        </FormField>

        <FormField label="Role:" required>
          <Input
            v-model="formData.role"
            class="bg-white"
            :class="cn(errors.role && 'border-destructive')"
            placeholder="e.g. Developer, Manager, Designer"
            @blur="handleBlur('role')"
          />
          <span v-if="errors.role" class="text-xs text-destructive">
            {{ errors.role }}
          </span>
        </FormField>

        <FormField label="Plan:" required>
          <Select
            v-model="formData.plan"
            :options="USER_PLANS"
            placeholder="Select a plan"
            :class="cn(errors.plan && 'border-destructive')"
            @blur="handleBlur('plan')"
          />
          <span v-if="errors.plan" class="text-xs text-destructive">
            {{ errors.plan }}
          </span>
        </FormField>

        <FormField label="Company:" required>
          <Select
            v-model="formData.company"
            :options="COMPANIES"
            placeholder="Select a company"
            :class="cn(errors.company && 'border-destructive')"
            @blur="handleBlur('company')"
          />
          <span v-if="errors.company" class="text-xs text-destructive">
            {{ errors.company }}
          </span>
        </FormField>

        <FormField label="Email:" required>
          <Input
            v-model="formData.email"
            class="bg-white"
            placeholder="jdoe@email.com"
            :class="{ 'border-destructive': errors.email }"
            @blur="handleBlur('email')"
          />
          <span v-if="errors.email" class="text-xs text-destructive">
            {{ errors.email }}
          </span>
        </FormField>

        <FormField label="Phone Number:" required>
          <Input
            v-model="formData.phone_number"
            class="bg-white"
            placeholder="(555) 555-5555"
            :class="{ 'border-destructive': errors.phone_number }"
            @input="handlePhoneInput"
            @blur="handleBlur('phone_number')"
          />
          <span v-if="errors.phone_number" class="text-xs text-destructive">
            {{ errors.phone_number }}
          </span>
        </FormField>
      </div>

      <DialogFooter>
        <Button
          type="submit"
          @click="handleSubmit"
          :disabled="isSubmitting || Object.keys(errors).length > 0"
        >
          <PlusIcon v-if="!isSubmitting" />
          <span>{{ isSubmitting ? 'Creating...' : 'Create User' }}</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
