import { useParams } from 'react-router'

const RestaurantMenuPage = () => {
  const { id } = useParams()

  return (
    <section className="px-4 py-8 md:px-8">
      <h1 className="text-foreground text-3xl font-bold">Restaurant #{id}</h1>
      <p className="text-muted-foreground mt-1">Menu page coming soon.</p>
    </section>
  )
}

export { RestaurantMenuPage }
