import { Input as InputPrimitive } from '@base-ui/react/input'

import { cn } from '@/lib/utils'

const Input = ({ className, ...props }: InputPrimitive.Props) => {
  return (
    <InputPrimitive
      data-slot="input"
      className={cn(
        'border-border text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 flex h-10 w-full rounded-lg border bg-transparent px-3 text-sm transition-colors outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export { Input }
