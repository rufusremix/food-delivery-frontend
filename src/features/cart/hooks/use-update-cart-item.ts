import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateCartItem } from '@/features/cart/api'

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['cart-mutation'],
    mutationFn: updateCartItem,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (err) => {
      console.error('Failed to update cart item', err)
    }
  })

  const updateQuantity = (productId: number, quantity: number) => {
    mutation.mutate({ productId, quantity })
  }

  return { updateQuantity, isUpdating: mutation.isPending }
}
