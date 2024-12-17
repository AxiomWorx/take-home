import { useToast as useToastOriginal } from '@/components/ui/toast'

export function useToast() {
  const { toast } = useToastOriginal()

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
      duration: 2000,
    })
  }

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 2000,
    })
  }

  return {
    toast,
    showSuccess,
    showError
  }
}
