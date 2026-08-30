import {
  ArrowRight01Icon,
  ArrowRight02Icon,
  Cancel01Icon,
  Search01Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'

import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Spinner } from '@/components/ui/spinner'
import type { Product } from '@/features/products/types'
import type { Restaurant } from '@/features/restaurants/types'
import { useSearchResults } from '@/features/search/hooks/use-search-results'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { cn } from '@/lib/utils'

type SearchBarProps = {
  className?: string
}

const sectionLabelClassName =
  'text-muted-foreground px-2 py-1 text-xs font-semibold tracking-wide uppercase'

const resultRowClassName =
  'hover:bg-muted flex w-full items-center gap-3 rounded-md px-2 py-2 text-left'

const SEARCH_RESULT_SKELETON_ROWS = 3

const SearchResultRowSkeleton = () => (
  <div className="flex items-center gap-3 px-2 py-2">
    <Skeleton className="size-8 shrink-0 rounded-md" />
    <div className="min-w-0 flex-1 space-y-1.5">
      <Skeleton className="h-3.5 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  </div>
)

const SearchResultsSkeleton = () => (
  <div>
    {Array.from({ length: SEARCH_RESULT_SKELETON_ROWS }).map((_, index) => (
      <SearchResultRowSkeleton key={index} />
    ))}
  </div>
)

type RestaurantResultItemProps = {
  restaurant: Restaurant
  onSelect: (restaurantId: number) => void
}

const RestaurantResultItem = ({
  restaurant,
  onSelect
}: RestaurantResultItemProps) => (
  <button
    type="button"
    onClick={() => onSelect(restaurant.id)}
    className={resultRowClassName}
  >
    <img
      src={restaurant.imageUrl}
      alt={restaurant.name}
      className="size-8 shrink-0 rounded-md object-cover"
    />
    <span className="text-foreground flex-1 truncate text-sm font-medium">
      {restaurant.name}
    </span>
    <HugeiconsIcon
      icon={ArrowRight01Icon}
      size={16}
      className="text-muted-foreground"
    />
  </button>
)

type ProductResultItemProps = {
  product: Product
  onSelect: (restaurantId: number, productId?: number) => void
}

const ProductResultItem = ({ product, onSelect }: ProductResultItemProps) => (
  <button
    type="button"
    onClick={() => onSelect(product.restaurant.id, product.id)}
    className={cn(resultRowClassName, 'group')}
  >
    <img
      src={product.imageUrl}
      alt={product.name}
      className="size-8 shrink-0 rounded-md object-cover"
    />
    <span className="min-w-0 flex-1">
      <span className="text-foreground block truncate text-sm font-medium">
        {product.name}
      </span>
      <span className="text-muted-foreground block truncate text-xs">
        {product.restaurant.name}
      </span>
    </span>
    <span className="text-muted-foreground flex shrink-0 items-center gap-1 text-xs font-medium">
      View in Restaurant
      <HugeiconsIcon
        icon={ArrowRight02Icon}
        size={14}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </span>
  </button>
)

type SearchResultsDropdownProps = {
  query: string
  restaurants: Restaurant[]
  products: Product[]
  isPending: boolean
  onSelectResult: (restaurantId: number, productId?: number) => void
  onShowAllResults: () => void
}

const SearchResultsDropdown = ({
  query,
  restaurants,
  products,
  isPending,
  onSelectResult,
  onShowAllResults
}: SearchResultsDropdownProps) => {
  const hasRestaurants = restaurants.length > 0
  const hasProducts = products.length > 0
  const hasResults = hasRestaurants || hasProducts
  const showSectionDivider = hasRestaurants && hasProducts

  return (
    <div className="bg-card absolute top-full right-0 left-0 z-30 max-h-[70vh] overflow-y-auto rounded-b-lg p-2 shadow-lg max-sm:h-[calc(100vh-6rem)] max-sm:max-h-none">
      {isPending && !hasResults && <SearchResultsSkeleton />}

      {!isPending && !hasResults && (
        <p className="text-muted-foreground px-2 py-4 text-center text-sm">
          No results found.
        </p>
      )}

      {hasRestaurants && (
        <div className="mb-2">
          <p className={sectionLabelClassName}>Restaurants</p>
          {restaurants.map((restaurant) => (
            <RestaurantResultItem
              key={restaurant.id}
              restaurant={restaurant}
              onSelect={onSelectResult}
            />
          ))}
        </div>
      )}

      {showSectionDivider && <div className="bg-border mx-2 my-2 h-px" />}

      {hasProducts && (
        <div>
          <p className={sectionLabelClassName}>Dishes</p>
          {products.map((product) => (
            <ProductResultItem
              key={product.id}
              product={product}
              onSelect={onSelectResult}
            />
          ))}
        </div>
      )}

      {hasResults && (
        <>
          <div className="bg-border mx-2 my-2 h-px" />
          <button
            type="button"
            onClick={onShowAllResults}
            className="text-primary hover:bg-muted group flex w-full items-center gap-1 rounded-md px-2 py-2 text-left text-sm font-medium"
          >
            Show all results for &quot;{query.trim()}&quot;
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </>
      )}
    </div>
  )
}

const SearchBar = ({ className }: SearchBarProps) => {
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileSentinelRef = useRef<HTMLSpanElement>(null)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebouncedValue(query, 400)
  const { restaurants, products, isFetching } = useSearchResults(debouncedQuery)

  const showDropdown = isOpen && query.trim().length > 0
  const isDebouncePending = query.trim() !== debouncedQuery.trim()
  const isPending = isDebouncePending || isFetching
  const showSpinner = showDropdown && isPending

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!showDropdown || !mobileSentinelRef.current) return

    const isMobile =
      window.getComputedStyle(mobileSentinelRef.current).display !== 'none'
    if (!isMobile) return

    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [showDropdown])

  const goToRestaurant = (restaurantId: number, productId?: number) => {
    setQuery('')
    setIsOpen(false)
    navigate(
      productId
        ? `/restaurants/${restaurantId}?highlight=${productId}`
        : `/restaurants/${restaurantId}`
    )
  }

  const showAllResults = () => {
    const trimmedQuery = query.trim()
    setQuery('')
    setIsOpen(false)
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`)
  }

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <span
        ref={mobileSentinelRef}
        aria-hidden="true"
        className="hidden max-sm:block"
      />
      <div
        className={cn(
          'bg-card shadow-background rounded-lg shadow-[0_-1px_0_0]',
          showDropdown && 'border-border rounded-b-lg border'
        )}
      >
        <div className="relative">
          <HugeiconsIcon
            icon={Search01Icon}
            size={18}
            className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
          />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search restaurants or dishes..."
            className={cn(
              'h-12 pr-9 pl-9',
              query && 'pr-16',
              showDropdown &&
                'relative z-30 rounded-b-none border-transparent focus-visible:border-transparent focus-visible:ring-0'
            )}
          />
          {showSpinner && (
            <Spinner
              className={cn(
                'text-muted-foreground absolute top-1/2 z-40 -translate-y-1/2',
                query ? 'right-10' : 'right-3'
              )}
            />
          )}
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setQuery('')
                setIsOpen(false)
              }}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 z-40 -translate-y-1/2"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={18} />
            </button>
          )}
        </div>

        {showDropdown && (
          <SearchResultsDropdown
            query={query}
            restaurants={restaurants}
            products={products}
            isPending={isPending}
            onSelectResult={goToRestaurant}
            onShowAllResults={showAllResults}
          />
        )}
      </div>
    </div>
  )
}

export { SearchBar }
