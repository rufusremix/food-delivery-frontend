import { useQuery } from '@tanstack/react-query'

import { getRestaurantMenu } from '@/features/restaurants/api'

const PAGE_SIZE = 20

type UseRestaurantMenuParams = {
  restaurantId: number
  search?: string
}

export const useRestaurantMenu = ({
  restaurantId,
  search
}: UseRestaurantMenuParams) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurant-menu', restaurantId, search],
    queryFn: () =>
      getRestaurantMenu(restaurantId, {
        search,
        isAvailable: true,
        page: 1,
        size: PAGE_SIZE
      }),
    enabled: Number.isFinite(restaurantId)
  })

  return { menuItems: data?.data ?? [], isLoading, isError }
}
