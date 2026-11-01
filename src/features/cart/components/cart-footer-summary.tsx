import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { useCheckout } from '@/features/cart/hooks/use-checkout'
import { useSelectedAddress } from '@/features/cart/hooks/use-selected-address'
import { toastManager } from '@/lib/toast'

type CartFooterSummaryProps = {
  subtotal: number
  deliveryFee: number
  grandTotal: number
  disabled?: boolean
}

const CartFooterSummary = ({
  subtotal,
  deliveryFee,
  grandTotal,
  disabled = false
}: CartFooterSummaryProps) => {
  const { selectedAddress } = useSelectedAddress()
  const { checkout, isCheckingOut } = useCheckout()

  const handleCheckout = () => {
    if (!selectedAddress) {
      toastManager.add({ description: 'Please add an address' })
      return
    }
    checkout(selectedAddress.id)
  }

  return (
    <div className="flex flex-col gap-3">
      <Separator />
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Subtotal</span>
        <span className="text-foreground font-medium">
          ₹{subtotal.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Delivery Fee</span>
        <span className="text-foreground font-medium">
          ₹{deliveryFee.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-foreground font-semibold">Total</span>
        <span className="text-primary text-lg font-bold">
          ₹{grandTotal.toFixed(2)}
        </span>
      </div>
      <Button
        className="w-full"
        disabled={disabled || isCheckingOut}
        onClick={handleCheckout}
      >
        {isCheckingOut ? 'Placing order...' : 'Checkout'}
      </Button>
    </div>
  )
}

export { CartFooterSummary }
