import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useCreateAddress } from '@/features/address/hooks/use-create-address'

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP is required')
})

type AddressFormValues = z.infer<typeof addressSchema>

type AddAddressDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (addressId: number) => void
}

const AddAddressDialog = ({
  open,
  onOpenChange,
  onCreated
}: AddAddressDialogProps) => {
  const { createAddress, isCreating } = useCreateAddress()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddressFormValues>({ resolver: zodResolver(addressSchema) })

  const onSubmit = async (values: AddressFormValues) => {
    const address = await createAddress(values)
    onCreated(address.data.id)
    reset()
    onOpenChange(false)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) reset()
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent onBackdropClick={() => handleOpenChange(false)}>
        <DialogTitle>Add a new address</DialogTitle>
        <DialogDescription>
          Enter the address you'd like to deliver to.
        </DialogDescription>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="street"
              className="text-foreground text-sm font-medium"
            >
              Street
            </label>
            <Input
              id="street"
              aria-invalid={!!errors.street}
              {...register('street')}
            />
            {errors.street && (
              <p className="text-destructive text-sm">
                {errors.street.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="city"
              className="text-foreground text-sm font-medium"
            >
              City
            </label>
            <Input
              id="city"
              aria-invalid={!!errors.city}
              {...register('city')}
            />
            {errors.city && (
              <p className="text-destructive text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="state"
              className="text-foreground text-sm font-medium"
            >
              State
            </label>
            <Input
              id="state"
              aria-invalid={!!errors.state}
              {...register('state')}
            />
            {errors.state && (
              <p className="text-destructive text-sm">{errors.state.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="zip"
              className="text-foreground text-sm font-medium"
            >
              ZIP
            </label>
            <Input id="zip" aria-invalid={!!errors.zip} {...register('zip')} />
            {errors.zip && (
              <p className="text-destructive text-sm">{errors.zip.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isCreating} className="mt-2 w-full">
            {isCreating ? 'Adding...' : 'Add address'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { AddAddressDialog }
