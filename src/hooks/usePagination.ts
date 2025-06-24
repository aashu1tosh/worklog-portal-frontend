import type  { IPagination } from '@/interfaces/pagination.interface'
import { useState } from 'react'

const usePagination = (): [IPagination, React.Dispatch<React.SetStateAction<IPagination>>] => {
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    limit: 20,
    searchTerm: '',
    total: 1,
    totalPages: 1,
    refreshTable: false,
  })

  return [pagination, setPagination]
}

export default usePagination
