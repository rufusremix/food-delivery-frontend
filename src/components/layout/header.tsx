import { Moon02Icon, Sun01Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { NavLink } from 'react-router'

import { MobileNav } from '@/components/layout/mobile-nav'
import { NAV_LINKS } from '@/components/layout/nav-links'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { NavItem } from '@/components/ui/nav-link'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { useTheme } from '@/hooks/use-theme'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="border-border border-b">
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
          {isAuthenticated ? (
            <span className="text-foreground text-sm font-medium">
              Hi, {user?.name}
            </span>
          ) : (
            <NavItem to="/signin">Sign in</NavItem>
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
