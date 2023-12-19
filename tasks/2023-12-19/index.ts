export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number) {
	const totalItems = items.length
	const totalPages = Math.ceil(totalItems / itemsPerPage)

	if (items.length === 0 || pageNumber > totalPages) {
		return {
			currentPageItems: [],
			totalPages,
			totalItems,
		}
	}

	const startIndex = (pageNumber - 1) * itemsPerPage
	const endIndex = Math.min(startIndex + itemsPerPage, totalItems)
	const currentPageItems = items.slice(startIndex, endIndex)

	return {
		currentPageItems,
		totalPages,
		totalItems,
	}
}
