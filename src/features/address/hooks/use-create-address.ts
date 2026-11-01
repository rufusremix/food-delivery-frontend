import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createAddress, type CreateAddressParams } from '@/features/address/api'
import { useAuth } from '@/features/auth/hooks/use-auth'

export const useCreateAddress = () => {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (payload: CreateAddressParams) =>
      createAddress(user!.id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] })
    }
  })

  return {
    createAddress: mutation.mutateAsync,
    isCreating: mutation.isPending
  }
}
