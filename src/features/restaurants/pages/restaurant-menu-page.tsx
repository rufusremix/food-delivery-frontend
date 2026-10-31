import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useIsMutating } from '@tanstack/react-query'
import { useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { linkVariants } from '@/components/ui/link'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/features/auth/hooks/use-auth'
import { QuantityStepper } from '@/features/cart/components/quantity-stepper'
import { useAddToCart } from '@/features/cart/hooks/use-add-to-cart'
import { useCart } from '@/features/cart/hooks/use-cart'
import { useRemoveFromCart } from '@/features/cart/hooks/use-remove-from-cart'
import { useUpdateCartItem } from '@/features/cart/hooks/use-update-cart-item'
import { useRestaurant } from '@/features/restaurants/hooks/use-restaurant'
import { useRestaurantMenu } from '@/features/restaurants/hooks/use-restaurant-menu'
import type { MenuItem } from '@/features/restaurants/types'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import { cn } from '@/lib/utils'

const MenuItemRow = ({ item }: { item: MenuItem }) => {
  const { isAuthenticated } = useAuth()
  const { cart } = useCart()
  const { addToCart } = useAddToCart()
  const { updateQuantity } = useUpdateCartItem()
  const { removeItem } = useRemoveFromCart()
  const navigate = useNavigate()
  const location = useLocation()
  const isCartBusy = useIsMutating({ mutationKey: ['cart-mutation'] }) > 0

  const quantity =
    cart?.items.find((cartItem) => cartItem.product.id === item.id)?.quantity ??
    0

  const handleAdd = () => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: location } })
      return
    }

    addToCart(item.id)
  }

  const handleIncrement = () => updateQuantity(item.id, quantity + 1)

  const handleDecrement = () => {
    if (quantity <= 1) {
      removeItem(item.id)
      return
    }
    updateQuantity(item.id, quantity - 1)
  }

  return (
    <div className="border-border flex items-center gap-4 border-b py-4 last:border-b-0">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="size-16 shrink-0 rounded-lg object-cover"
      />
      <div className="min-w-0 flex-1">
        <h3 className="text-foreground font-medium">{item.name}</h3>
        <p className="text-muted-foreground truncate text-sm">
          {item.description}
        </p>
        <p className="text-foreground mt-1 text-sm font-semibold">
          ₹{item.price.toFixed(2)}
        </p>
      </div>
      {quantity === 0 ? (
        <Button
          variant="outline"
          size="sm"
          disabled={isCartBusy}
          onClick={handleAdd}
        >
          Add
        </Button>
      ) : (
        <QuantityStepper
          quantity={quantity}
          label={item.name}
          disabled={isCartBusy}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
        />
      )}
    </div>
  )
}

const RestaurantMenuPage = () => {
  const { id } = useParams()
  const restaurantId = Number(id)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, 400)

  const { restaurant, isLoading: isRestaurantLoading } =
    useRestaurant(restaurantId)
  const { menuItems, isLoading: isMenuLoading } = useRestaurantMenu({
    restaurantId,
    search: debouncedSearch
  })

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 md:px-8">
      <Link
        to="/"
        className={cn(
          linkVariants(),
          'group mb-4 flex w-fit items-center gap-1 text-sm font-medium no-underline hover:no-underline'
        )}
      >
        <HugeiconsIcon
          icon={ArrowLeft02Icon}
          size={16}
          strokeWidth={3}
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
        Back to Restaurants
      </Link>

      {isRestaurantLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-5 w-1/3" />
        </div>
      ) : (
        restaurant && (
          <>
            <h1 className="text-foreground text-3xl font-bold">
              {restaurant.name}
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {restaurant.cuisine}
            </p>
          </>
        )
      )}

      <Input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search dishes..."
        className="mt-6"
      />

      <h2 className="text-foreground mt-6 text-lg font-semibold">Menu</h2>

      <div className="mt-2">
        {isMenuLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="border-border flex items-center gap-4 border-b py-4 last:border-b-0"
            >
              <Skeleton className="size-16 shrink-0 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-3 w-1/6" />
              </div>
            </div>
          ))
        ) : menuItems.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-sm">
            No dishes found.
          </p>
        ) : (
          menuItems.map((item) => <MenuItemRow key={item.id} item={item} />)
        )}
      </div>
    </section>
  )
}

export { RestaurantMenuPage }
