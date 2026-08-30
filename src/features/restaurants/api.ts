import { apiClient } from '@/lib/api-client'
import type { PaginatedResponse } from '@/lib/api-types'
import type {
  GetRestaurantsParams,
  Restaurant
} from '@/features/restaurants/types'

export const getRestaurants = async (
  params: GetRestaurantsParams
): Promise<PaginatedResponse<Restaurant>> => {
  const response = await apiClient.get<PaginatedResponse<Restaurant>>(
    '/restaurants',
    {
      params
    }
  )
  return response.data
}
