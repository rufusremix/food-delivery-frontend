import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { addCartItem } from '@/features/cart/api'
import {
  closeCartConflict,
  openCartConflict
} from '@/features/cart/store/cart-store'
import type { ProblemDetails } from '@/lib/api-types'

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['cart-mutation'],
    mutationFn: addCartItem,
    onSuccess: () => {
      closeCartConflict()
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
    onError: (err, variables) => {
      const problem = isAxiosError<ProblemDetails>(err)
        ? err.response?.data
        : null

      if (problem?.type === '/errors/cart-conflict') {
        openCartConflict({
          productId: variables.productId,
          quantity: variables.quantity ?? 1
        })
        return
      }

      console.error('Failed to add item to cart', err)
    }
  })

  const addToCart = (productId: number, quantity = 1, replace = false) => {
    mutation.mutate({ productId, quantity, replace })
  }

  return { addToCart, isAdding: mutation.isPending }
}
