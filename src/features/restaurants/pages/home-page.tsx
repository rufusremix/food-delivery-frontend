import { Button } from '@/components/ui/button'
import { RestaurantCard } from '@/features/restaurants/components/restaurant-card'
import { RestaurantCardSkeleton } from '@/features/restaurants/components/restaurant-card-skeleton'
import { useRestaurants } from '@/features/restaurants/hooks/use-restaurants'
import { SearchBar } from '@/features/search/components/search-bar'

const HomePage = () => {
  const {
    restaurants,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useRestaurants()

  return (
    <section className="mx-auto max-w-7xl py-8 md:px-8">
      <h1 className="text-foreground px-4 text-3xl font-bold md:px-0">
        Restaurants
      </h1>
      <p className="text-muted-foreground mt-1 px-4 md:px-0">
        Find the best food near you.
      </p>

      <div className="bg-background sticky top-16 z-20 px-4 pt-3 pb-3 md:mx-auto md:max-w-xl md:bg-transparent md:px-0 md:pt-3 md:pb-0">
        <SearchBar />
      </div>

      {isError && (
        <p className="text-destructive mt-6 px-4 text-center text-sm md:px-0">
          Something went wrong loading restaurants. Please try again.
        </p>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 md:px-0 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          : restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, index) => (
            <RestaurantCardSkeleton key={`next-${index}`} />
          ))}
      </div>

      {hasNextPage && (
        <div className="mt-8 flex justify-center px-4 md:px-0">
          <Button
            variant="outline"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  )
}

export { HomePage }
