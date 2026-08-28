import axios from 'axios'

import {
  getAccessToken,
  notifySessionExpired,
  setAccessToken
} from '@/lib/token-store'

const REFRESH_URL = '/auth/refresh'
const NO_RETRY_URLS = ['/auth/signin', REFRESH_URL]

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
})

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise: Promise<string> | null = null

const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post(REFRESH_URL)
      .then((response) => {
        const token = response.data.data.token as string
        setAccessToken(token)
        return token
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const isAuthRequest = NO_RETRY_URLS.some((url) =>
      originalRequest?.url?.includes(url)
    )

    if (
      error.response?.status === 401 &&
      !isAuthRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const token = await refreshAccessToken()
        originalRequest.headers.Authorization = `Bearer ${token}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        setAccessToken(null)
        notifySessionExpired()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { apiClient, REFRESH_URL }
