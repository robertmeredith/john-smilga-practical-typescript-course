import { useState, useEffect } from 'react'
import { type Tour, tourSchema, fetchTours } from './types'
// const url = 'https://www.course-api.com/react-tours-project'

function Component() {
  // tours
  const [tours, setTours] = useState<Tour[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Fetch data functiond declaration
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // USING FETCH
        // const response = await fetch(url)

        // if (!response.ok) {
        //   throw new Error('Failed to fetch tours...')
        // }
        // const rawData: Tour[] = await response.json()

        // // validation using zod
        // const result = tourSchema.array().safeParse(rawData)
        // if (!result.success) {
        //   console.log(result.error.message)
        //   throw new Error('Failed to parse tours')
        // }
        // setTours(result.data)

        // USING AXIOS
        const data = await fetchTours()
        setTours(data)
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'There was an error...'
        setError(message)
      } finally {
        setIsLoading(false)
      }
    }
    // run function
    fetchData()
  }, [])

  if (isLoading) {
    return <h3>Loading...</h3>
  }
  if (error) {
    return <h3>Error: {error}</h3>
  }

  return (
    <div>
      <h2 className="mb-1"></h2>
      {tours.map((tour) => {
        return (
          <p key={tour.id} className="mb-1">
            {tour.name}
          </p>
        )
      })}
    </div>
  )
}
export default Component
