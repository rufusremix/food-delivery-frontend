import { CartContents } from '@/features/cart/components/cart-contents'
import { closeCart, useCartStore } from '@/features/cart/store/cart-store'

const CartPanel = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen)

  if (!isCartOpen) return null

  return (
    <aside className="border-border bg-background flex h-full w-96 shrink-0 flex-col overflow-hidden border-l p-6">
      <CartContents onClose={closeCart} />
    </aside>
  )
}

export { CartPanel }
