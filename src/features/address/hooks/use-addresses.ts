import { useQuery } from '@tanstack/react-query'

import { getAddresses } from '@/features/address/api'
import { useAuth } from '@/features/auth/hooks/use-auth'

export const useAddresses = () => {
  const { user, isAuthenticated } = useAuth()

  const { data, isLoading } = useQuery({
    queryKey: ['addresses', user?.id],
    queryFn: () => getAddresses(user!.id),
    enabled: isAuthenticated && !!user
  })

  return { addresses: data?.data ?? [], isLoading }
}
