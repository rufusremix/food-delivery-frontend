import { useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode
} from 'react'

import { logoutSession, refreshSession } from '@/features/auth/api'
import type { AuthUser, JwtClaims } from '@/features/auth/types'
import { decodeJwt } from '@/lib/jwt'
import { setAccessToken, setSessionExpiredHandler } from '@/lib/token-store'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isInitializing: boolean
  login: (token: string) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const toAuthUser = (claims: JwtClaims): AuthUser => ({
  id: claims.sub,
  name: claims.name,
  email: claims.email,
  role: claims.role
})

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const queryClient = useQueryClient()

  const login = (token: string) => {
    setAccessToken(token)
    const claims = decodeJwt<JwtClaims>(token)
    setUser(claims ? toAuthUser(claims) : null)
  }

  const logout = useCallback(async () => {
    try {
      await logoutSession()
    } catch {
      // Clear local state regardless of whether the server call succeeded.
    }
    setAccessToken(null)
    setUser(null)
    queryClient.clear()
  }, [queryClient])

  useEffect(() => {
    setSessionExpiredHandler(logout)

    refreshSession()
      .then(login)
      .catch(() => {})
      .finally(() => setIsInitializing(false))
  }, [logout])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isInitializing,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
