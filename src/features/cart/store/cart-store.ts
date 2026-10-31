import { create } from 'zustand'

type PendingCartAdd = {
  productId: number
  quantity: number
}

type CartState = {
  isCartOpen: boolean
  conflict: PendingCartAdd | null
}

export const useCartStore = create<CartState>(() => ({
  isCartOpen: false,
  conflict: null
}))

export const openCart = () => {
  useCartStore.setState({ isCartOpen: true })
}

export const closeCart = () => {
  useCartStore.setState({ isCartOpen: false })
}

export const toggleCart = () => {
  useCartStore.setState((state) => ({ isCartOpen: !state.isCartOpen }))
}

export const openCartConflict = (pending: PendingCartAdd) => {
  useCartStore.setState({ conflict: pending })
}

export const closeCartConflict = () => {
  useCartStore.setState({ conflict: null })
}
