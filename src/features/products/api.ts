import { apiClient } from '@/lib/api-client'
import type { PaginatedResponse } from '@/lib/api-types'
import type { GetProductsParams, Product } from '@/features/products/types'

export const getProducts = async (
  params: GetProductsParams
): Promise<PaginatedResponse<Product>> => {
  const response = await apiClient.get<PaginatedResponse<Product>>(
    '/products',
    {
      params
    }
  )
  return response.data
}
