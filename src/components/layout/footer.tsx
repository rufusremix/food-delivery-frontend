import { Github01Icon, GoogleDocIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

import { linkVariants } from '@/components/ui/link'
import { cn } from '@/lib/utils'

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com', icon: Github01Icon },
  { label: 'API Docs', href: '/api-docs', icon: GoogleDocIcon }
]

const Footer = () => {
  return (
    <footer className="border-border border-t">
      <div className="flex h-14 items-center gap-6 px-4 md:px-8">
        {FOOTER_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              linkVariants({ variant: 'muted' }),
              'flex items-center gap-1.5 text-sm'
            )}
          >
            <HugeiconsIcon icon={link.icon} size={16} />
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  )
}

export { Footer }
