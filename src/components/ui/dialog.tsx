import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import * as React from 'react'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Dialog = BaseDialog.Root
const DialogTrigger = BaseDialog.Trigger
const DialogClose = BaseDialog.Close

const DialogContent = ({
  className,
  overlayClassName,
  onBackdropClick,
  children,
  ...props
}: React.ComponentProps<typeof BaseDialog.Popup> & {
  overlayClassName?: string
  onBackdropClick?: () => void
}) => {
  return (
    <BaseDialog.Portal container={document.body}>
      <BaseDialog.Backdrop
        forceRender
        onClick={onBackdropClick}
        className={cn(
          'bg-background/60 fixed inset-0 z-50 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0',
          overlayClassName
        )}
      />
      <BaseDialog.Popup
        data-slot="dialog-content"
        className={cn(
          'bg-card text-card-foreground fixed top-1/2 left-1/2 z-50 flex w-full max-w-sm -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-lg p-6 shadow-lg transition-all duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
          className
        )}
        {...props}
      >
        {children}
        <DialogClose
          aria-label="Close dialog"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'absolute top-3 right-3'
          )}
        >
          <HugeiconsIcon icon={Cancel01Icon} size={20} />
        </DialogClose>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  )
}

const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Title>) => (
  <BaseDialog.Title
    className={cn('text-foreground text-lg font-semibold', className)}
    {...props}
  />
)

const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseDialog.Description>) => (
  <BaseDialog.Description
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
)

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
}
