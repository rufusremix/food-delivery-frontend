import { useSearchParams } from 'react-router'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  return (
    <section className="px-4 py-8 md:px-8">
      <h1 className="text-foreground text-3xl font-bold">Search results</h1>
      {query && (
        <p className="text-muted-foreground mt-1">
          Showing results for "{query}"
        </p>
      )}
    </section>
  )
}

export { SearchPage }
