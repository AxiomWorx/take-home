/**
 * Available subscription plans for users
 * The array is marked as const to enable type inference for UserPlan type
 */
export const USER_PLANS = [
  { value: 'Free Plan', label: 'Free Plan' },
  { value: 'Basic Plan', label: 'Basic Plan' },
  { value: 'Pro Plan', label: 'Pro Plan' },
  { value: 'Enterprise Plan', label: 'Enterprise Plan' },
  { value: 'Trial', label: 'Trial' }
] as const

/**
 * List of available companies for user association
 * The array is marked as const to enable type inference for UserCompany type
 */
export const COMPANIES = [
  // Original companies
  { value: 'Axiomworx', label: 'Axiomworx' },
  { value: 'Equinox Engineering', label: 'Equinox Engineering' },
  { value: 'Apple', label: 'Apple' },
  // Additional companies from data
  { value: 'Microsoft', label: 'Microsoft' },
  { value: 'Amazon', label: 'Amazon' },
  { value: 'Google', label: 'Google' },
  { value: 'Meta', label: 'Meta' },
  { value: 'Stripe', label: 'Stripe' },
  { value: 'Square', label: 'Square' },
  { value: 'Twitter', label: 'Twitter' },
  { value: 'Slack', label: 'Slack' },
  { value: 'GitHub', label: 'GitHub' },
  { value: 'Intel', label: 'Intel' },
  { value: 'Oracle', label: 'Oracle' },
  { value: 'Cisco Systems', label: 'Cisco Systems' },
  { value: 'DoorDash', label: 'DoorDash' },
  { value: 'Palentir Technologies', label: 'Palentir Technologies' },
  { value: 'Segment', label: 'Segment' },
  { value: 'Front', label: 'Front' },
  { value: 'Superhuman', label: 'Superhuman' },
  { value: 'Walt Disney', label: 'Walt Disney' },
  { value: 'Verizon', label: 'Verizon' },
  { value: 'Goldman Sachs Group', label: 'Goldman Sachs Group' },
  { value: 'Pfizer', label: 'Pfizer' },
  { value: 'UnitedHealth Group', label: 'UnitedHealth Group' },
  { value: 'Johnson & Johnson', label: 'Johnson & Johnson' },
  { value: 'JP Morgan Chase', label: 'JP Morgan Chase' },
  { value: 'Procter & Gamble', label: 'Procter & Gamble' },
  { value: 'Home Depot', label: 'Home Depot' },
  { value: 'Chevron', label: 'Chevron' },
  { value: 'CVS Health', label: 'CVS Health' },
  { value: 'Citigroup', label: 'Citigroup' },
  { value: 'American Express', label: 'American Express' },
  { value: 'Dell Technologies', label: 'Dell Technologies' },
  { value: 'Costco Wholesale', label: 'Costco Wholesale' },
  { value: 'FedEx', label: 'FedEx' },
  { value: 'United Airlines', label: 'United Airlines' },
  { value: 'Alphabet', label: 'Alphabet' },
  { value: 'Comcast', label: 'Comcast' },
  { value: 'Allstate', label: 'Allstate' },
  { value: 'Progressive', label: 'Progressive' },
  { value: 'MetLife', label: 'MetLife' },
  { value: 'Bumble', label: 'Bumble' }
] as const

/**
 * Type representing valid user plan values
 * Automatically derived from USER_PLANS array to ensure type safety
 */
export type UserPlan = typeof USER_PLANS[number]['value']

/**
 * Type representing valid company values
 * Automatically derived from COMPANIES array to ensure type safety
 */
export type UserCompany = typeof COMPANIES[number]['value']
