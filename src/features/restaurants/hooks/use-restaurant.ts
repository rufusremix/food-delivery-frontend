import { useQuery } from '@tanstack/react-query'

import { getRestaurantById } from '@/features/restaurants/api'

export const useRestaurant = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => getRestaurantById(id),
    enabled: Number.isFinite(id)
  })

  return { restaurant: data?.data, isLoading, isError }
}
