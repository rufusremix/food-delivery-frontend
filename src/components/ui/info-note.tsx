import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react'
import type { ReactNode } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface InfoNoteProps {
  icon: IconSvgElement
  title?: string
  children: ReactNode
  className?: string
}

const InfoNote = ({
  icon,
  title = 'Info Note',
  children,
  className
}: InfoNoteProps) => {
  return (
    <Card
      size="sm"
      className={cn('bg-primary/5 ring-primary/60 w-full', className)}
    >
      <CardContent className="flex flex-col gap-1">
        <div className="text-primary flex items-center gap-2">
          <HugeiconsIcon icon={icon} size={18} />
          <span className="font-semibold">{title}</span>
        </div>
        <p className="text-muted-foreground pl-6.5 text-sm">{children}</p>
      </CardContent>
    </Card>
  )
}

export { InfoNote }
