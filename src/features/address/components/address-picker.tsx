import {
  ArrowDown01Icon,
  Location09Icon,
  LocationAdd02Icon
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { AddAddressDialog } from '@/features/address/components/add-address-dialog'
import { useSelectedAddress } from '@/features/cart/hooks/use-selected-address'
import { selectAddress } from '@/features/cart/store/cart-store'

const AddressPicker = () => {
  const { addresses, selectedAddress } = useSelectedAddress()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-foreground flex cursor-pointer items-center gap-1.5 text-sm font-medium outline-none">
          <HugeiconsIcon icon={Location09Icon} size={16} className="shrink-0" />
          {selectedAddress ? (
            <>
              <span>Deliver to</span>
              <span className="max-w-32 truncate font-semibold">
                {selectedAddress.street}
              </span>
            </>
          ) : (
            <span>Add an address</span>
          )}
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            size={14}
            className="shrink-0"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {addresses.length > 0 && (
            <>
              <DropdownMenuRadioGroup
                value={selectedAddress?.id ?? null}
                onValueChange={(value) => selectAddress(value as number)}
              >
                {addresses.map((address) => (
                  <DropdownMenuRadioItem key={address.id} value={address.id}>
                    <span className="truncate">
                      {address.street}, {address.city}
                    </span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              <Separator className="my-1" />
            </>
          )}
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <HugeiconsIcon
              icon={LocationAdd02Icon}
              size={16}
              className="mr-2"
            />
            Add new address
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AddAddressDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreated={selectAddress}
      />
    </>
  )
}

export { AddressPicker }
