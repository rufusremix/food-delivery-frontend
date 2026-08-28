import * as React from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { HugeiconsIcon } from '@hugeicons/react'
import { Cancel01Icon } from '@hugeicons/core-free-icons'

import { cn } from '@/lib/utils'

const Sheet = Dialog.Root
const SheetTrigger = Dialog.Trigger
const SheetClose = Dialog.Close

const sheetContentVariants = cva(
  'fixed z-50 flex flex-col gap-4 bg-card p-6 text-card-foreground shadow-lg transition-transform duration-300 data-starting-style:transition-none',
  {
    variants: {
      side: {
        left: 'top-0 bottom-0 left-0 w-72 max-w-[80vw] data-starting-style:-translate-x-full data-ending-style:-translate-x-full',
        right:
          'top-0 bottom-0 right-0 w-72 max-w-[80vw] data-starting-style:translate-x-full data-ending-style:translate-x-full'
      }
    },
    defaultVariants: { side: 'left' }
  }
)

const SheetContent = ({
  side,
  className,
  overlayClassName,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Popup> &
  VariantProps<typeof sheetContentVariants> & {
    overlayClassName?: string
  }) => {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop
        className={cn(
          'bg-background/60 fixed inset-0 z-40 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0',
          overlayClassName
        )}
      />
      <Dialog.Popup
        data-slot="sheet-content"
        className={cn(sheetContentVariants({ side }), className)}
        {...props}
      >
        {children}
        <SheetClose
          aria-label="Close menu"
          className="text-muted-foreground hover:text-foreground absolute top-4 right-4"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
        </SheetClose>
      </Dialog.Popup>
    </Dialog.Portal>
  )
}

export { Sheet, SheetTrigger, SheetContent, SheetClose }
