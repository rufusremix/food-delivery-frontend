import { useAddresses } from '@/features/address/hooks/use-addresses'
import { useCartStore } from '@/features/cart/store/cart-store'

export const useSelectedAddress = () => {
  const { addresses, isLoading } = useAddresses()
  const selectedAddressId = useCartStore((state) => state.selectedAddressId)

  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ??
    addresses[0] ??
    null

  return { addresses, selectedAddress, isLoading }
}
