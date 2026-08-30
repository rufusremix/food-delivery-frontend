import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const RestaurantCardSkeleton = () => {
  return (
    <Card className="p-0">
      <div className="flex flex-row items-center gap-4 p-3">
        <Skeleton className="size-24 shrink-0 rounded-lg" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-4 w-16 shrink-0" />
      </div>
    </Card>
  )
}

export { RestaurantCardSkeleton }
