import { cva, type VariantProps } from 'class-variance-authority'
import { NavLink, type NavLinkProps } from 'react-router'

import { cn } from '@/lib/utils'

const navLinkVariants = cva(
  'font-medium text-muted-foreground transition-colors hover:text-foreground',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base'
      }
    },
    defaultVariants: { size: 'sm' }
  }
)

const NavItem = ({
  className,
  size,
  ...props
}: NavLinkProps & VariantProps<typeof navLinkVariants>) => {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        cn(navLinkVariants({ size }), isActive && 'text-primary', className)
      }
    />
  )
}

export { NavItem }
