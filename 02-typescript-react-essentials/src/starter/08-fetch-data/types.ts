import { z } from 'zod'
import axios from 'axios'

export const tourSchema = z.object({
  id: z.string(),
  image: z.string(),
  info: z.string(),
  name: z.string(),
  price: z.string(),
})

export type Tour = z.infer<typeof tourSchema>

const url = 'https://www.course-api.com/react-tours-project'

export const fetchTours = async (): Promise<Tour[]> => {
  const response = await axios.get<Tour[]>(url)
  console.log('RESPONSE ', response)

  // validation using zod
  const result = tourSchema.array().safeParse(response.data)

  if (!result.success) {
    console.log(result.error.message)
    throw new Error('Failed to parse tours')
  }
  return result.data
}
