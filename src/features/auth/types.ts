export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export interface JwtClaims {
  sub: string
  name: string
  email: string
  role: string
  iat: number
  exp: number
}

export interface FieldError {
  field: string
  message: string
}

export interface ProblemDetails {
  title: string
  detail: string
  status: number
  type: string
  instance?: string
  errors?: FieldError[]
}
