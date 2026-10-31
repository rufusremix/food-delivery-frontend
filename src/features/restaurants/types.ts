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

export interface MenuItem {
  id: number
  name: string
  description: string
  imageUrl: string
  price: number
  isVeg: boolean
  isAvailable: boolean
}

export interface GetRestaurantMenuParams {
  search?: string
  isVeg?: boolean
  isAvailable?: boolean
  page?: number
  size?: number
}
