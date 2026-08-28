let accessToken: string | null = null

export const getAccessToken = (): string | null => accessToken

export const setAccessToken = (token: string | null) => {
  accessToken = token
}

let sessionExpiredHandler: (() => void) | null = null

export const setSessionExpiredHandler = (handler: () => void) => {
  sessionExpiredHandler = handler
}

export const notifySessionExpired = () => {
  sessionExpiredHandler?.()
}
