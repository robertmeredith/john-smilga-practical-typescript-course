import { Filters, ProductsContainer, PaginationContainer } from '@/components'
import { customFetch, type ProductsResponse, type ProductsResponseWithParams } from '../utils'
import { type LoaderFunction } from 'react-router-dom'

const url = '/products'

// // Product data loader that is called in the router for this page
// export const loader: LoaderFunction = async (): Promise<ProductsResponse> => {
//   const response = await customFetch<ProductsResponse>(url)
//   return { ...response.data }
// }

// Updated loader function to include request parameter
export const loader: LoaderFunction = async ({
  request,
}): Promise<ProductsResponseWithParams> => {
  // Extract the URL from the request
  const urlObj = new URL(request.url)

  // Get search params iterable from URL
  const searchParams = urlObj.searchParams

  // Convert to object
  const paramsObject = Object.fromEntries([...searchParams])

  const response = await customFetch<ProductsResponse>(url, {
    params: paramsObject,
  })
  return { ...response.data, params: paramsObject }
}

function Products() {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}
export default Products
