import { useInfiniteQuery } from '@tanstack/react-query'

import { getRestaurants } from '@/features/restaurants/api'

const PAGE_SIZE = 12

export const useRestaurants = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useInfiniteQuery({
    queryKey: ['restaurants'],
    queryFn: ({ pageParam }) =>
      getRestaurants({ page: pageParam, size: PAGE_SIZE }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta.pagination
      return currentPage < totalPages ? currentPage + 1 : undefined
    }
  })

  const restaurants = data?.pages.flatMap((page) => page.data) ?? []

  return {
    restaurants,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  }
}
