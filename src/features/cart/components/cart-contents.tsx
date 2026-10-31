import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useIsMutating } from '@tanstack/react-query'
import { Link } from 'react-router'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { linkVariants } from '@/components/ui/link'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { CartFooterSummary } from '@/features/cart/components/cart-footer-summary'
import { CartItemRow } from '@/features/cart/components/cart-item-row'
import { useCart } from '@/features/cart/hooks/use-cart'
import { useClearCart } from '@/features/cart/hooks/use-clear-cart'
import { cn } from '@/lib/utils'

type CartContentsProps = {
  onClose?: () => void
}

const cartMessageClassName = 'text-muted-foreground mt-8 text-center text-sm'

const CartContents = ({ onClose }: CartContentsProps) => {
  const { isAuthenticated } = useAuth()
  const { cart } = useCart()
  const { clearCart } = useClearCart()
  const isCartBusy = useIsMutating({ mutationKey: ['cart-mutation'] }) > 0

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-foreground text-lg font-semibold">Your Cart</h2>
        {onClose ? (
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close cart"
            onClick={onClose}
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </Button>
        ) : null}
      </div>

      {!isAuthenticated ? (
        <p className={cartMessageClassName}>
          Please{' '}
          <Link to="/signin" className={cn(linkVariants(), 'font-medium')}>
            login
          </Link>{' '}
          to view the cart.
        </p>
      ) : !cart || cart.items.length === 0 ? (
        <p className={cartMessageClassName}>Your cart is empty.</p>
      ) : (
        <>
          <div className="mt-4 flex items-center justify-between gap-3">
            {cart.restaurant ? (
              <div className="flex min-w-0 items-center gap-2">
                <img
                  src={cart.restaurant.imageUrl}
                  alt={cart.restaurant.name}
                  className="size-8 shrink-0 rounded-full object-cover"
                />
                <span className="text-foreground truncate text-sm font-medium">
                  {cart.restaurant.name}
                </span>
                {!cart.restaurant.isOpen && (
                  <Badge
                    variant="destructive"
                    size="sm"
                    className="shrink-0 px-1 py-px"
                  >
                    Closed
                  </Badge>
                )}
              </div>
            ) : (
              <div />
            )}
            <button
              type="button"
              disabled={isCartBusy}
              onClick={() => clearCart()}
              className={cn(
                linkVariants(),
                'shrink-0 text-sm disabled:pointer-events-none disabled:opacity-50'
              )}
            >
              Clear cart
            </button>
          </div>
          <div
            className={cn(
              'flex min-h-0 flex-1 scrollbar-thin flex-col gap-4 overflow-y-auto',
              onClose ? 'mt-4' : 'mt-2'
            )}
          >
            {cart.items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                disabled={isCartBusy}
              />
            ))}
          </div>
          <div className="mt-6">
            <CartFooterSummary
              subtotal={cart.totalPrice}
              deliveryFee={cart.deliveryFee}
              grandTotal={cart.grandTotal}
              disabled={isCartBusy || cart.restaurant?.isOpen === false}
            />
          </div>
        </>
      )}
    </>
  )
}

export { CartContents }
