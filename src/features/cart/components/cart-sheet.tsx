import { Sheet, SheetContent } from '@/components/ui/sheet'
import { CartContents } from '@/features/cart/components/cart-contents'
import { closeCart, useCartStore } from '@/features/cart/store/cart-store'

const CartSheet = () => {
  const isCartOpen = useCartStore((state) => state.isCartOpen)

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) closeCart()
      }}
    >
      <SheetContent side="bottom" className="max-h-[85vh]">
        <CartContents />
      </SheetContent>
    </Sheet>
  )
}

export { CartSheet }
