import { Add01Icon, Remove01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const quantityStepperVariants = cva(
  'flex items-center gap-3 rounded-lg border px-3 py-1.5',
  {
    variants: {
      variant: {
        default: 'border-primary text-primary',
        secondary: 'border-border text-muted-foreground'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)

type QuantityStepperProps = {
  quantity: number
  onIncrement: () => void
  onDecrement: () => void
  label: string
  className?: string
  disabled?: boolean
} & VariantProps<typeof quantityStepperVariants>

const stepperButtonClassName =
  'flex cursor-pointer items-center justify-center p-1 disabled:pointer-events-none disabled:opacity-50'

const QuantityStepper = ({
  quantity,
  onIncrement,
  onDecrement,
  label,
  variant,
  className,
  disabled = false
}: QuantityStepperProps) => (
  <div className={cn(quantityStepperVariants({ variant }), className)}>
    <button
      type="button"
      disabled={disabled}
      aria-label={`Decrease quantity of ${label}`}
      onClick={onDecrement}
      className={stepperButtonClassName}
    >
      <HugeiconsIcon icon={Remove01Icon} size={16} strokeWidth={3} />
    </button>
    <span className="w-4 text-center text-sm font-semibold select-none">
      {quantity}
    </span>
    <button
      type="button"
      disabled={disabled}
      aria-label={`Increase quantity of ${label}`}
      onClick={onIncrement}
      className={stepperButtonClassName}
    >
      <HugeiconsIcon icon={Add01Icon} size={16} strokeWidth={3} />
    </button>
  </div>
)

export { QuantityStepper }
