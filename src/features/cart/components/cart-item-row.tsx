import { Delete02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { Button } from '@/components/ui/button'
import { QuantityStepper } from '@/features/cart/components/quantity-stepper'
import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart'
import { useRemoveFromCart } from '@/features/cart/hooks/use-remove-from-cart'
import { useUpdateCartItem } from '@/features/cart/hooks/use-update-cart-item'
import type { CartLineItem } from '@/features/cart/types'

type CartItemRowProps = {
  item: CartLineItem
  disabled?: boolean
}

const CartItemRow = ({ item, disabled = false }: CartItemRowProps) => {
  const { addToCart } = useAddToCart()
  const { updateQuantity } = useUpdateCartItem()
  const { removeItem } = useRemoveFromCart()
  const { product, quantity } = item

  const handleIncrement = () => {
    if (quantity === 0) {
      addToCart(product.id)
      return
    }
    updateQuantity(product.id, quantity + 1)
  }

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeItem(product.id)
      return
    }
    updateQuantity(product.id, quantity - 1)
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="size-12 shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-sm font-semibold">
          {product.name}
        </p>
        <p className="text-muted-foreground text-sm">
          ₹{product.price.toFixed(2)}
        </p>
      </div>
      <QuantityStepper
        quantity={quantity}
        label={product.name}
        variant="secondary"
        disabled={disabled}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
      />
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={disabled}
        aria-label={`Remove ${product.name} from cart`}
        onClick={() => removeItem(product.id)}
      >
        <HugeiconsIcon icon={Delete02Icon} size={16} />
      </Button>
    </div>
  )
}

export { CartItemRow }
