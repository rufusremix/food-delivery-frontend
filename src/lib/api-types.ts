export interface Pagination {
  currentPage: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface SingleResponse<T> {
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    pagination: Pagination
  }
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
