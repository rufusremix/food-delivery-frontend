import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

import { checkout } from '@/features/cart/api'
import { closeCart } from '@/features/cart/store/cart-store'
import type { ProblemDetails } from '@/lib/api-types'
import { toastManager } from '@/lib/toast'

export const useCheckout = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['cart-mutation'],
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
      closeCart()
      toastManager.add({ description: 'Order placed successfully!' })
    },
    onError: (err) => {
      const problem = isAxiosError<ProblemDetails>(err)
        ? err.response?.data
        : null

      toastManager.add({
        description:
          problem?.detail ?? 'Something went wrong. Please try again.'
      })
    }
  })

  return { checkout: mutation.mutate, isCheckingOut: mutation.isPending }
}
