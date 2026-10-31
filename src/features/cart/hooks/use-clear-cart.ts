import { useMutation, useQueryClient } from '@tanstack/react-query'

import { clearCart } from '@/features/cart/api'

export const useClearCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['cart-mutation'],
    mutationFn: clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (err) => {
      console.error('Failed to clear cart', err)
    }
  })

  return { clearCart: mutation.mutate, isClearing: mutation.isPending }
}
