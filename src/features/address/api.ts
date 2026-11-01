import type { Address } from '@/features/address/types'
import { apiClient } from '@/lib/api-client'
import type { SingleResponse } from '@/lib/api-types'

export const getAddresses = async (
  userId: string
): Promise<SingleResponse<Address[]>> => {
  const response = await apiClient.get<SingleResponse<Address[]>>(
    `/users/${userId}/addresses`
  )
  return response.data
}

export interface CreateAddressParams {
  street: string
  city: string
  state: string
  zip: string
}

export const createAddress = async (
  userId: string,
  payload: CreateAddressParams
): Promise<SingleResponse<Address>> => {
  const response = await apiClient.post<SingleResponse<Address>>(
    `/users/${userId}/addresses`,
    payload
  )
  return response.data
}
