<script setup>
  import { ref } from 'vue'
  import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import FormField from './FormField.vue';

  // dummy data
  const user = ref({
    firstName: 'Nykole',
    lastName: 'M',
    role: 'Product Manager',
    plan: 'Pro Plan',
    company: 'Axiom',
    email: 'nmasters@axiomworx.com',
    phone: '403-555-5555'
  })
</script>

<template>
  <Card class="w-full min-w-96">
    <CardContent class="">
      <article class="flex flex-col md:flex-row gap-0">
        <aside class="w-full h-48 md:h-auto md:w-1/3 bg-muted">

        </aside>
        <section class="w-full md:w-2/3 p-4">
          <CardHeader>
            <CardTitle class="text-xl font-semibold">{{ user.firstName }} {{ user.lastName }}</CardTitle>
            <p class="text-sm text-muted-foreground">{{ user.role }}</p>
          </CardHeader>
          <h3 class="text-md font-medium mb-4">User Details</h3>

          <div class="space-y-4">
            <FormField label="First Name:" required>
              <Input v-model="user.firstName" class="bg-white" />
            </FormField>

            <FormField label="Last Name:" required>
              <Input v-model="user.lastName" class="bg-white" />
            </FormField>

            <FormField label="Plan:" required>
              <Input v-model="user.plan" class="bg-white" />
            </FormField>

            <FormField label="Company:" required>
              <Input v-model="user.company" class="bg-white" />
            </FormField>

            <FormField label="Email:" required>
              <Input v-model="user.email" class="bg-white" />
            </FormField>

            <FormField label="Phone #:" required>
              <Input v-model="user.phone" class="bg-white" />
            </FormField>
          </div>
        </section>
      </article>
      <hr />
    </CardContent>
    <CardFooter class="flex justify-end items-center pt-4">
      <Button class="w-60">Save</Button>
    </CardFooter>
  </Card>
</template>
