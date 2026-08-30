export interface Restaurant {
  id: number
  name: string
  description: string
  cuisine: string
  address: string
  imageUrl: string
  isOpen: boolean
  deliveryFee: number
}

export interface GetRestaurantsParams {
  search?: string
  isOpen?: boolean
  page?: number
  size?: number
}
