import { Menu } from '@base-ui/react/menu'
import * as React from 'react'

import { cn } from '@/lib/utils'

const DropdownMenu = Menu.Root
const DropdownMenuTrigger = Menu.Trigger

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  align = 'end',
  children,
  ...props
}: React.ComponentProps<typeof Menu.Popup> &
  Pick<
    React.ComponentProps<typeof Menu.Positioner>,
    'sideOffset' | 'align'
  >) => {
  return (
    <Menu.Portal>
      <Menu.Positioner sideOffset={sideOffset} align={align} className="z-50">
        <Menu.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            'bg-card text-card-foreground border-border min-w-36 rounded-lg border p-1 shadow-lg transition-all duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
            className
          )}
          {...props}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

const DropdownMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof Menu.Item>) => (
  <Menu.Item
    data-slot="dropdown-menu-item"
    className={cn(
      'text-foreground data-highlighted:bg-secondary flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none',
      className
    )}
    {...props}
  />
)

const DropdownMenuRadioGroup = Menu.RadioGroup

const DropdownMenuRadioItem = ({
  className,
  closeOnClick = true,
  children,
  ...props
}: React.ComponentProps<typeof Menu.RadioItem>) => (
  <Menu.RadioItem
    data-slot="dropdown-menu-radio-item"
    closeOnClick={closeOnClick}
    className={cn(
      'text-foreground data-highlighted:bg-secondary group flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors outline-none',
      className
    )}
    {...props}
  >
    <span className="border-muted-foreground group-data-checked:border-primary flex size-4 shrink-0 items-center justify-center rounded-full border">
      <Menu.RadioItemIndicator className="bg-primary size-2 rounded-full" />
    </span>
    {children}
  </Menu.RadioItem>
)

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
}
