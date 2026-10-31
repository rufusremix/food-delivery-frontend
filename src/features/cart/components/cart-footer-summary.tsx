import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
      <Button className="w-full" disabled={disabled}>
        Checkout
      </Button>
    </div>
  )
}

export { CartFooterSummary }
