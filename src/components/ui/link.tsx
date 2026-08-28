import { cva } from 'class-variance-authority'

const linkVariants = cva('font-medium underline-offset-4 transition-colors', {
  variants: {
    variant: {
      default: 'text-primary hover:underline',
      muted: 'text-muted-foreground hover:text-foreground',
      destructive: 'text-destructive hover:underline'
    }
  },
  defaultVariants: { variant: 'default' }
})

export { linkVariants }
