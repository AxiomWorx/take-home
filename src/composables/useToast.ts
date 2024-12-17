/**
 * Composable for displaying toast notifications
 * Wraps shadcn-vue toast component with simplified success/error methods
 */
import { useToast as useToastOriginal } from '@/components/ui/toast'

export function useToast() {
  const { toast } = useToastOriginal()

  /**
   * Shows a success toast notification
   * @param title - Main message to display
   * @param description - Optional additional details
   */
  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      duration: 2000
    })
  }

  /**
   * Shows an error toast notification
   * @param title - Main error message to display
   * @param description - Optional error details
   */
  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 3000
    })
  }

  return {
    toast,
    showSuccess,
    showError
  }
}
