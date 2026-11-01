import { Toast } from '@base-ui/react/toast'
import { Cancel01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { cn } from '@/lib/utils'

const Toaster = () => {
  const { toasts } = Toast.useToastManager()

  return (
    <Toast.Portal>
      <Toast.Viewport className="fixed right-4 bottom-4 z-[60] flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            toast={toast}
            className={cn(
              'bg-card text-card-foreground border-border pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all duration-200',
              'data-ending-style:translate-x-full data-ending-style:opacity-0 data-starting-style:translate-x-full data-starting-style:opacity-0'
            )}
          >
            <div className="min-w-0 flex-1">
              {toast.title && (
                <Toast.Title className="text-foreground text-sm font-semibold" />
              )}
              {toast.description && (
                <Toast.Description className="text-muted-foreground text-sm" />
              )}
            </div>
            <Toast.Close
              aria-label="Dismiss notification"
              className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} />
            </Toast.Close>
          </Toast.Root>
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  )
}

export { Toaster }
