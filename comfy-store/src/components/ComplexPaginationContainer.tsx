import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination'
import {
  constructUrl,
  constructPrevOrNextUrl,
  type OrdersResponse,
} from '@/utils'

import { useLoaderData, useLocation } from 'react-router-dom'

function ComplexPaginationContainer() {
  const { meta } = useLoaderData() as OrdersResponse
  const { pageCount, page } = meta.pagination

  const { search, pathname } = useLocation()
  
  // If less than 2 pages, return nothing
  if (pageCount < 2) return null

  const constructButton = ({
    pageNumber,
    isActive,
  }: {
    pageNumber: number
    isActive: boolean
  }): React.ReactNode => {
    const url = constructUrl({ pageNumber, search, pathname })
    return (
      <PaginationItem key={pageNumber}>
        <PaginationLink to={url} isActive={isActive}>
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    )
  }

  const constructEllipsis = (key: string): React.ReactNode => {
    return (
      <PaginationItem key={key}>
        <PaginationEllipsis />
      </PaginationItem>
    )
  }

  // RENDER PAGINATION
  const renderedPagination = () => {
    const pages: React.ReactNode[] = []

    // first page
    pages.push(constructButton({ pageNumber: 1, isActive: page === 1 }))

    if (page > 3) {
      pages.push(constructEllipsis('dots-1'))
    }

    for (let i = page - 1; i <= page + 1; i++) {
      if (i >= 2 && i <= pageCount - 1) {
        pages.push(constructButton({ pageNumber: i, isActive: page === i }))
      }
    }

    if (page < pageCount - 2) {
      pages.push(constructEllipsis('dots-2'))
    }

    // last page
    pages.push(
      constructButton({ pageNumber: pageCount, isActive: page === pageCount })
    )
    return pages
  }

  // Get previous and next urls
  const { prevUrl, nextUrl } = constructPrevOrNextUrl({
    currentPage: page,
    pageCount,
    search,
    pathname: pathname,
  })

  return (
    <Pagination className="mt-16">
      <PaginationContent>
        {/* PREVIOUS */}
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious to={prevUrl} />
          </PaginationItem>
        )}
        {/* PAGINATION */}
        {renderedPagination()}
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
export default ComplexPaginationContainer
