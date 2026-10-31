export interface CartItem {
  productId: number
  name: string
  price: number
  imageUrl: string
  quantity: number
}

export interface CartProduct {
  id: number
  name: string
  price: number
  imageUrl: string
}

export interface CartLineItem {
  product: CartProduct
  quantity: number
  totalPrice: number
}

export interface CartRestaurant {
  id: number
  name: string
  imageUrl: string
  isOpen: boolean
}

export interface Cart {
  id: string
  items: CartLineItem[]
  totalPrice: number
  deliveryFee: number
  grandTotal: number
  restaurant: CartRestaurant | null
}
