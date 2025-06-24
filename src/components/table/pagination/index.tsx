import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { IPagination } from '@/interfaces/pagination.interface'
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from 'lucide-react'
import React from 'react'

interface DataTablePaginationProps {
    pagination: IPagination
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>
}

export function DataTablePagination({
    pagination,
    setPagination,
}: DataTablePaginationProps) {
    const { number, size, total, totalPages } = pagination

    // Calculate the range of items being displayed
    const startItem = total === 0 ? 0 : (number - 1) * size + 1
    const endItem = Math.min(number * size, total)

    // Handle number size change
    const handlePageSizeChange = (newLimit: string) => {
        const newLimitNumber = parseInt(newLimit)
        setPagination(prev => ({
            ...prev,
            size: newLimitNumber,
            number: 1, // Reset to first number when changing number size
        }))
    }

    // Handle number navigation
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPagination(prev => ({
                ...prev,
                number: newPage,
            }))
        }
    }

    // Navigation handlers
    const goToFirstPage = () => handlePageChange(1)
    const goToPreviousPage = () => handlePageChange(number - 1)
    const goToNextPage = () => handlePageChange(number + 1)
    const goToLastPage = () => handlePageChange(totalPages)

    return (
        <div className="flex items-center justify-between px-2 py-4">
            {/* Left side - Rows per number selector */}
            <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per number:</p>
                <Select
                    value={size?.toString()}
                    onValueChange={handlePageSizeChange}
                >
                    <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder={size?.toString()} />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
                            <SelectItem key={pageSize} value={pageSize.toString()}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Right side - Page info and navigation */}
            <div className="flex items-center space-x-6 lg:space-x-8">
                {/* Page info */}
                <div className="text-sm font-medium">
                    {startItem}-{endItem} of {total}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={goToFirstPage}
                        disabled={number === 1}
                    >
                        <span className="sr-only">Go to first number</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={goToPreviousPage}
                        disabled={number === 1}
                    >
                        <span className="sr-only">Go to previous number</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={goToNextPage}
                        disabled={number === totalPages || totalPages === 0}
                    >
                        <span className="sr-only">Go to next number</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={goToLastPage}
                        disabled={number === totalPages || totalPages === 0}
                    >
                        <span className="sr-only">Go to last number</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
