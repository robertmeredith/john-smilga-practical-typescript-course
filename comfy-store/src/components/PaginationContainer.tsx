import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  ProductsResponseWithParams,
  constructUrl,
  constructPrevOrNextUrl,
} from '@/utils'

import { useLoaderData, useLocation } from 'react-router-dom'

function PaginationContainer() {
  const { meta } = useLoaderData() as ProductsResponseWithParams
  const { pageCount, page } = meta.pagination

  const { search, pathname } = useLocation()
  console.log(search, pathname)

  // Create array of lenght pageCount and fill it with numbers to signify pages
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  // If less than 2 pages, return nothing
  if (pageCount < 2) return null

  // Get previous and next urls
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname: pathname,
  })

  // render pagination buttons

  const renderedPagination = pages.map((pageNumber) => {
    // check if active page
    const isActive = pageNumber === page
    const url = constructUrl({ pageNumber, search, pathname })
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    )
  })

  return (
    <Pagination>
      <PaginationContent>
        {/* PREVIOUS */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious to={prevUrl} />
          </PaginationItem>
        )}
        {/* PAGINATION */}
        {renderedPagination}
        {/* NEXT */}
        {page < pageCount && (
          <PaginationItem>
            <PaginationNext to={nextUrl} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )

  return <div>PaginationContainer</div>
}
export default PaginationContainer
