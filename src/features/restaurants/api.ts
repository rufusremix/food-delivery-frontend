import type {
  GetRestaurantMenuParams,
  GetRestaurantsParams,
  MenuItem,
  Restaurant
} from '@/features/restaurants/types'
import { apiClient } from '@/lib/api-client'
import type { PaginatedResponse, SingleResponse } from '@/lib/api-types'

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

export const getRestaurantById = async (
  id: number
): Promise<SingleResponse<Restaurant>> => {
  const response = await apiClient.get<SingleResponse<Restaurant>>(
    `/restaurants/${id}`
  )
  return response.data
}

export const getRestaurantMenu = async (
  id: number,
  params: GetRestaurantMenuParams
): Promise<PaginatedResponse<MenuItem>> => {
  const response = await apiClient.get<PaginatedResponse<MenuItem>>(
    `/restaurants/${id}/menu`,
    {
      params
    }
  )
  return response.data
}
