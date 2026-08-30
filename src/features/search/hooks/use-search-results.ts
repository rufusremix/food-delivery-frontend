import { useQuery } from '@tanstack/react-query'

import { getProducts } from '@/features/products/api'
import { getRestaurants } from '@/features/restaurants/api'

const SEARCH_RESTAURANT_LIMIT = 3
const SEARCH_PRODUCT_LIMIT = 5

export const useSearchResults = (query: string) => {
  const enabled = query.trim().length > 0

  const restaurantsQuery = useQuery({
    queryKey: ['search', 'restaurants', query],
    queryFn: () =>
      getRestaurants({
        search: query,
        isOpen: true,
        size: SEARCH_RESTAURANT_LIMIT,
        page: 1
      }),
    enabled
  })

  const productsQuery = useQuery({
    queryKey: ['search', 'products', query],
    queryFn: () =>
      getProducts({
        search: query,
        isAvailable: true,
        size: SEARCH_PRODUCT_LIMIT,
        page: 1
      }),
    enabled
  })

  return {
    restaurants: restaurantsQuery.data?.data ?? [],
    products: productsQuery.data?.data ?? [],
    isLoading: restaurantsQuery.isLoading || productsQuery.isLoading,
    isFetching: restaurantsQuery.isFetching || productsQuery.isFetching,
    isError: restaurantsQuery.isError || productsQuery.isError
  }
}
