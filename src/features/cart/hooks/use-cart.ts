import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { getCart } from '@/features/cart/api'

export const useCart = () => {
  const { isAuthenticated } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
    enabled: isAuthenticated
  })

  const cart = data?.data
    ? {
        ...data.data,
        items: [...data.data.items].sort((a, b) => a.product.id - b.product.id)
      }
    : undefined

  return { cart, isLoading, isError }
}

export const useCartItemCount = () => {
  const { cart } = useCart()
  return cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0
}
