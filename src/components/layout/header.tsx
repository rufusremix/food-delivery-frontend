import {
  Moon02Icon,
  Sun01Icon,
  UserCircle02Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { NavLink } from 'react-router'

import { MobileNav } from '@/components/layout/mobile-nav'
import { NAV_LINKS } from '@/components/layout/nav-links'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Logo } from '@/components/ui/logo'
import { NavItem } from '@/components/ui/nav-link'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { CartIcon } from '@/features/cart/components/cart-icon'
import { useTheme } from '@/hooks/use-theme'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <header className="border-border bg-background shrink-0 border-b">
      <div className="flex h-16 items-center justify-between px-4 md:grid md:grid-cols-3 md:px-8">
        <div className="flex items-center gap-3 justify-self-start">
          <MobileNav />
          <NavLink to="/" className="text-primary flex items-center gap-2">
            <Logo />
            <span className="font-heading text-foreground text-lg font-bold">
              FoodFlow
            </span>
          </NavLink>
        </div>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 justify-self-center md:flex"
        >
          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} to={link.to}>
              {link.label}
            </NavItem>
          ))}
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <CartIcon />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="text-foreground flex h-16 cursor-pointer items-center gap-1.5 text-sm font-medium outline-none">
                <HugeiconsIcon icon={UserCircle02Icon} size={18} />
                <span className="max-w-28 truncate">Hi, {user?.name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <NavItem
              to="/signin"
              className="text-foreground flex items-center gap-1.5"
            >
              <HugeiconsIcon icon={UserCircle02Icon} size={18} />
              Sign in
            </NavItem>
          )}
          <Button
            variant="ghost"
            size="icon"
            aria-label={
              theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
            }
            onClick={toggleTheme}
          >
            <HugeiconsIcon
              icon={Sun01Icon}
              altIcon={Moon02Icon}
              showAlt={theme === 'dark'}
            />
          </Button>
        </div>
      </div>
    </header>
  )
}

export { Header }
