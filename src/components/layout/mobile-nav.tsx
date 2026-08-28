import { Dialog } from '@base-ui/react/dialog'
import { Menu01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

import { NAV_LINKS } from '@/components/layout/nav-links'
import { buttonVariants } from '@/components/ui/button'
import { NavItem } from '@/components/ui/nav-link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const MobileNav = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'md:hidden'
        )}
      >
        <HugeiconsIcon icon={Menu01Icon} />
      </SheetTrigger>
      <SheetContent side="left" className="top-16" overlayClassName="top-16">
        <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
        <nav aria-label="Primary" className="flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <NavItem
              key={link.to}
              to={link.to}
              size="base"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavItem>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export { MobileNav }
