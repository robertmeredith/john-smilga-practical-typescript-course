type ConstructUrlParams = {
  pageNumber: number
  search: string
  pathname: string
}

export const constructUrl = ({
  pageNumber,
  search,
  pathname,
}: ConstructUrlParams): string => {
  const searchParams = new URLSearchParams(search)
  searchParams.set('page', pageNumber.toString())

  return `${pathname}?${searchParams.toString()}`
}

type ConstructPrevOrNextParams = {
  currentPage: number
  pageCount: number
  search: string
  pathname: string
}

export const constructPrevOrNextUrl = ({
  currentPage,
  pageCount,
  search,
  pathname,
}: ConstructPrevOrNextParams): { prevUrl: string; nextUrl: string } => {
  // Helper function to generate URLs
  const generateUrl = (page: number): string => {
    const params = new URLSearchParams(search)
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`
  }

  const prevUrl =
    currentPage > 1 ? generateUrl(currentPage - 1) : generateUrl(currentPage)
  const nextUrl =
    currentPage < pageCount
      ? generateUrl(currentPage + 1)
      : generateUrl(currentPage)

  return { prevUrl, nextUrl }
}
