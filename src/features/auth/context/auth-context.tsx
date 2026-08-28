import { createContext, useEffect, useState, type ReactNode } from 'react'

import { refreshSession } from '@/features/auth/api'
import type { AuthUser, JwtClaims } from '@/features/auth/types'
import { decodeJwt } from '@/lib/jwt'
import { setAccessToken, setSessionExpiredHandler } from '@/lib/token-store'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  isInitializing: boolean
  login: (token: string) => void
  logout: () => void
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

  const login = (token: string) => {
    setAccessToken(token)
    const claims = decodeJwt<JwtClaims>(token)
    setUser(claims ? toAuthUser(claims) : null)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
  }

  useEffect(() => {
    setSessionExpiredHandler(logout)

    refreshSession()
      .then(login)
      .catch(() => {})
      .finally(() => setIsInitializing(false))
  }, [])

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
