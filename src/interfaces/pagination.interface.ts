export interface IPagination {
    page: number
    size: number
    searchTerm: string
    total: number
    totalPages: number
    refreshTable: boolean
}
