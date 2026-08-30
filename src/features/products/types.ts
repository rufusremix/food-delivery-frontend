export interface ProductRestaurant {
  id: number
  name: string
  isOpen: boolean
  deliveryFee: number
}

export interface Product {
  id: number
  name: string
  description: string
  imageUrl: string
  price: number
  isVeg: boolean
  isAvailable: boolean
  restaurant: ProductRestaurant
}

export interface GetProductsParams {
  search?: string
  isAvailable?: boolean
  page?: number
  size?: number
}
