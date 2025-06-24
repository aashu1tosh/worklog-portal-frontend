import useAPI from '@/hooks/useAPI'
import type { IPagination } from '@/interfaces/pagination.interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type UseDataFetchProps = {
  endpoint: string
  customQueryKey?: (string | unknown)[] // query keys for React Query
  queryEnabled?: boolean //(for conditional fetching)
  pagination: {
    pagination: IPagination
    setPagination: (val: IPagination) => void
  }
  queryParams?: Record<string, unknown>
}

export function useDataFetch<T, V = T | null>({
  endpoint,
  customQueryKey,
  queryEnabled = true,
  pagination: { pagination, setPagination },
  queryParams,
}: UseDataFetchProps) {
  const { get } = useAPI<T>()
  const [values, setValues] = useState<T[] | null>(null)
  const [selectedValue, setSelectedValue] = useState<V | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const key = endpoint?.toString()

  const queryKey = [key, ...(customQueryKey || []), pagination]

  const { isLoading, data, error } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await get(endpoint, {
        search: pagination.searchTerm,
        page: pagination.page,
        perpage: pagination.limit,
        ...queryParams,
      })
      if (!response?.status) throw new Error(response?.message)
      return response.data
    },
    enabled: queryEnabled,
  })

  useEffect(() => {
    if (data) {
      setValues(data.data)
      setPagination({
        ...pagination,
        total: data.pagination?.total,
        page: data.pagination?.page,
        limit: data.pagination?.limit,
        totalPages: data.pagination?.totalPages,
        refreshTable: false,
      })
    }
  }, [data])

  useEffect(() => {
    if (selectedValue) setAddOpen(true)
  }, [selectedValue])

  useEffect(() => {
    if (!addOpen) setSelectedValue(null)
  }, [addOpen])

  return {
    isLoading,
    error,
    values,
    addOpen,
    setAddOpen,
    selectedValue,
    setSelectedValue,
  }
}
