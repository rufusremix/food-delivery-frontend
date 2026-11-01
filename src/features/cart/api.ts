import { isAxiosError } from 'axios'

import type { Cart, CartLineItem } from '@/features/cart/types'
import { apiClient } from '@/lib/api-client'
import type { ProblemDetails, SingleResponse } from '@/lib/api-types'

const EMPTY_CART: Cart = {
  id: '',
  items: [],
  totalPrice: 0,
  deliveryFee: 0,
  grandTotal: 0,
  restaurant: null
}

export const getCart = async (): Promise<SingleResponse<Cart>> => {
  try {
    const response = await apiClient.get<SingleResponse<Cart>>('/cart')
    return response.data
  } catch (err) {
    const problem = isAxiosError<ProblemDetails>(err)
      ? err.response?.data
      : null

    if (problem?.type === '/errors/cart-not-found') return { data: EMPTY_CART }

    throw err
  }
}

export interface AddCartItemParams {
  productId: number
  quantity?: number
  replace?: boolean
}

export const addCartItem = async ({
  productId,
  quantity = 1,
  replace = false
}: AddCartItemParams): Promise<SingleResponse<CartLineItem>> => {
  const response = await apiClient.post<SingleResponse<CartLineItem>>(
    '/cart/items',
    { productId, quantity },
    { params: { replace } }
  )
  return response.data
}

export interface UpdateCartItemParams {
  productId: number
  quantity: number
}

export const updateCartItem = async ({
  productId,
  quantity
}: UpdateCartItemParams): Promise<SingleResponse<CartLineItem>> => {
  const response = await apiClient.put<SingleResponse<CartLineItem>>(
    `/cart/items/${productId}`,
    { quantity }
  )
  return response.data
}

export const removeCartItem = async (productId: number): Promise<void> => {
  await apiClient.delete(`/cart/items/${productId}`)
}

export const clearCart = async (): Promise<void> => {
  await apiClient.delete('/cart/items')
}

export const checkout = async (addressId: number): Promise<void> => {
  await apiClient.post('/checkout', { addressId })
}
