import { Navigate, Outlet, useLocation } from 'react-router'

import { useAuth } from '@/features/auth/hooks/use-auth'

const ProtectedRoute = () => {
  const location = useLocation()
  const { isAuthenticated, isInitializing } = useAuth()

  if (isInitializing) return null

  if (!isAuthenticated)
    return <Navigate to="/signin" state={{ from: location }} replace />

  return <Outlet />
}

export { ProtectedRoute }
