import { Button, buttonVariants } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart'
import {
  closeCartConflict,
  useCartStore
} from '@/features/cart/store/cart-store'

const CartConflictDialog = () => {
  const conflict = useCartStore((state) => state.conflict)
  const { addToCart, isAdding } = useAddToCart()

  return (
    <Dialog
      open={conflict !== null}
      onOpenChange={(open) => {
        if (!open) closeCartConflict()
      }}
    >
      <DialogContent>
        <DialogTitle>Start a new cart?</DialogTitle>
        <DialogDescription>
          Your cart has items from a different restaurant. Adding this item will
          clear your current cart.
        </DialogDescription>
        <div className="flex justify-end gap-3">
          <DialogClose className={buttonVariants({ variant: 'outline' })}>
            Cancel
          </DialogClose>
          <Button
            disabled={isAdding}
            onClick={() => {
              if (!conflict) return
              addToCart(conflict.productId, conflict.quantity, true)
            }}
          >
            Clear cart & continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { CartConflictDialog }
