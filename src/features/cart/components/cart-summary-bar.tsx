import { ArrowRight01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { useCartItemCount } from '@/features/cart/hooks/use-cart'
import { openCart } from '@/features/cart/store/cart-store'

const CartSummaryBar = () => {
  const itemCount = useCartItemCount()

  if (itemCount === 0) return null

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label="View cart"
      className="bg-primary text-primary-foreground fixed right-0 bottom-0 left-0 z-40 flex items-center justify-between px-4 py-3"
    >
      <span className="text-sm font-medium">
        {itemCount} {itemCount === 1 ? 'Item' : 'Items'} added
      </span>
      <span className="flex items-center gap-1 text-sm font-semibold">
        View Cart
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={3} />
      </span>
    </button>
  )
}

export { CartSummaryBar }
