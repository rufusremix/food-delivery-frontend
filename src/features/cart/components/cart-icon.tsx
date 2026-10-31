import { ShoppingCart02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartItemCount } from '@/features/cart/hooks/use-cart'
import { toggleCart } from '@/features/cart/store/cart-store'

const CartIcon = () => {
  const itemCount = useCartItemCount()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Open cart"
      className="relative hidden md:inline-flex"
      onClick={toggleCart}
    >
      <HugeiconsIcon icon={ShoppingCart02Icon} />
      {itemCount > 0 && (
        <Badge
          size="sm"
          className="absolute -top-1 -right-1"
          aria-label={`${itemCount} items in cart`}
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  )
}

export { CartIcon }
