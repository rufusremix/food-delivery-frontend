import { useMutation, useQueryClient } from '@tanstack/react-query'

import { removeCartItem } from '@/features/cart/api'

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['cart-mutation'],
    mutationFn: removeCartItem,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (err) => {
      console.error('Failed to remove cart item', err)
    }
  })

  return { removeItem: mutation.mutate, isRemoving: mutation.isPending }
}
