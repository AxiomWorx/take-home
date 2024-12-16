export const USER_PLANS = [
  { value: 'Free Plan', label: 'Free Plan' },
  { value: 'Pro Plan', label: 'Pro Plan' },
  { value: 'Trial', label: 'Trial' }
] as const
export type UserPlan = typeof USER_PLANS[number]['value']

export const COMPANIES = [
  { value: 'Axiomworx', label: 'Axiomworx' },
  { value: 'Equinox Engineering', label: 'Equinox Engineering' },
  { value: 'Apple', label: 'Apple' }
] as const
export type UserCompany = typeof COMPANIES[number]['value']
