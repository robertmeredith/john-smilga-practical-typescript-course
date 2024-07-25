import { Hero, FeaturedProducts } from '@/components'
import { type LoaderFunction } from 'react-router-dom'
import { customFetch, type ProductsResponse } from '@/utils'

const url = '/products?featured=true'

// Product data loader that is called in the router for this page
export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
  const response = await customFetch<ProductsResponse>(url)

  return { ...response.data }
}

function Landing() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}
export default Landing
