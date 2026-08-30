import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from 'react-router'

import { Card } from '@/components/ui/card'
import type { Restaurant } from '@/features/restaurants/types'
import { cn } from '@/lib/utils'

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Card className="group p-0">
      <Link
        to={`/restaurants/${restaurant.id}`}
        className="flex flex-row items-center gap-4 p-3"
      >
        <img
          src={restaurant.imageUrl}
          alt={restaurant.name}
          className={cn(
            'size-24 shrink-0 rounded-lg object-cover',
            !restaurant.isOpen && 'opacity-50 grayscale'
          )}
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-foreground truncate text-base font-semibold">
              {restaurant.name}
            </h3>
            {!restaurant.isOpen && (
              <span className="text-muted-foreground inline-flex shrink-0 items-center gap-1 text-xs font-medium">
                <span
                  aria-hidden="true"
                  className="bg-muted-foreground size-1.5 rounded-full"
                />
                Closed
              </span>
            )}
          </div>
          <p className="text-muted-foreground truncate text-sm">
            {restaurant.cuisine}
          </p>
        </div>
        <span
          className={cn(
            'flex shrink-0 items-center gap-1 text-sm font-medium',
            restaurant.isOpen ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          View Menu
          <HugeiconsIcon
            icon={ArrowRight02Icon}
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </span>
      </Link>
    </Card>
  )
}

export { RestaurantCard }
