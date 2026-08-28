import { apiClient, REFRESH_URL } from '@/lib/api-client'

interface SignInPayload {
  email: string
  password: string
}

interface TokenResponse {
  data: {
    token: string
  }
}

export const signIn = async (payload: SignInPayload): Promise<string> => {
  const response = await apiClient.post<TokenResponse>('/auth/signin', payload)
  return response.data.data.token
}

export const refreshSession = async (): Promise<string> => {
  const response = await apiClient.post<TokenResponse>(REFRESH_URL)
  return response.data.data.token
}
