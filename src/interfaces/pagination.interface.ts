export interface IPagination {
    page: number
    limit: number
    searchTerm: string
    total: number
    totalPages: number
    refreshTable: boolean
}
