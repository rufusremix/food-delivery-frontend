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
