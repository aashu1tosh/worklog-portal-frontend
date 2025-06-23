
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { IPagination } from '@/interfaces/pagination.interface'
import { cn } from '@/lib/utils'
import { Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface DataTableSearchProps {
    pagination: IPagination
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>
    className?: string
    placeholder?: string
    debounceMs?: number
}

export function DataTableSearch({
    pagination,
    setPagination,
    className,
    placeholder = "Search...",
    debounceMs = 300
}: DataTableSearchProps) {
    // Local state for the input value (for immediate UI updates)
    const [inputValue, setInputValue] = useState(pagination.searchTerm)

    // Debounced effect to update pagination searchTerm
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Only update if the value has actually changed
            if (inputValue !== pagination.searchTerm) {
                setPagination(prev => ({
                    ...prev,
                    searchTerm: inputValue,
                    page: 1, // Reset to first page when searching
                }))
            }
        }, debounceMs)

        // Cleanup timeout on value change or component unmount
        return () => clearTimeout(timeoutId)
    }, [inputValue, debounceMs, setPagination, pagination.searchTerm])

    // Handle input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    // Handle clear search
    const handleClearSearch = () => {
        setInputValue('')
        setPagination(prev => ({
            ...prev,
            searchTerm: '',
            page: 1,
        }))
    }

    // Handle form submission (for Enter key)
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Force immediate update on form submission
        if (inputValue !== pagination.searchTerm) {
            setPagination(prev => ({
                ...prev,
                searchTerm: inputValue,
                page: 1,
            }))
        }
    }

    return (
        <form onSubmit={handleSubmit} className={cn("relative", className)}>
            <div className="relative">
                {/* Search icon */}
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                {/* Search input */}
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    className="pl-9 pr-9"
                />

                {/* Clear button - only show when there's text */}
                {inputValue && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0 hover:bg-transparent"
                        onClick={handleClearSearch}
                    >
                        <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        <span className="sr-only">Clear search</span>
                    </Button>
                )}
            </div>
        </form>
    )
}