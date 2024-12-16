import { useToast as useToastOriginal } from '@/components/ui/toast'

export function useToast() {
  const { toast } = useToastOriginal()

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    })
  }

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    })
  }

  return {
    toast,
    showSuccess,
    showError
  }
}
