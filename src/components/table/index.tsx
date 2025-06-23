
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    type RowSelectionState,
    useReactTable,
} from '@tanstack/react-table'
import { Loader2, Plus } from 'lucide-react'
import React, { type ReactNode } from 'react'
import { DataTablePagination } from './pagination/index'
import { DataTableSearch } from './TableSearch'

export interface IPagination {
    page: number
    limit: number
    searchTerm: string
    total: number
    totalPages: number
    refreshTable: boolean
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    loading?: boolean
    data: TData[]
    pagination: IPagination
    setPagination: React.Dispatch<React.SetStateAction<IPagination>>
    addButton?: boolean
    tools?: ReactNode
    toolsButtonLabel?: string
    addButtonLabel?: string
    addButtonIcon?: ReactNode
    setAddOpen?: (data: boolean) => void
    customJsx?: ReactNode
    rowSelection?: RowSelectionState
    setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
    onSelectedRowsChange?: (selectedRows: TData[]) => void
    enableRowSelection?: boolean
}

export function DataTable<TData, TValue>({
    columns,
    loading = false,
    data,
    pagination,
    setPagination,
    addButton = false,
    tools,
    toolsButtonLabel = "Tools",
    addButtonLabel = "Add New",
    addButtonIcon,
    setAddOpen,
    customJsx,
    rowSelection = {},
    setRowSelection,
    onSelectedRowsChange,
    enableRowSelection = true,
}: DataTableProps<TData, TValue>) {
    // Create selection column
    const selectionColumn: ColumnDef<TData, TValue> = {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    }

    // Combine selection column with user columns
    const tableColumns = enableRowSelection
        ? [selectionColumn, ...columns]
        : columns

    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        manualPagination: true,
        pageCount: pagination.totalPages,
        state: {
            rowSelection: enableRowSelection ? rowSelection : {},
        },
        onRowSelectionChange: enableRowSelection ? setRowSelection : undefined,
        enableRowSelection: enableRowSelection,
        getRowId: (row, index) => {
            // Try to use 'id' field, fallback to index
            return (row as any).id?.toString() || index.toString()
        },
    })

    // Handle selected rows change
    React.useEffect(() => {
        if (onSelectedRowsChange && enableRowSelection) {
            const selectedRows = table.getSelectedRowModel().rows.map(row => row.original)
            onSelectedRowsChange(selectedRows)
        }
    }, [rowSelection, onSelectedRowsChange, table, enableRowSelection])

    const handleAddClick = () => {
        if (setAddOpen) {
            setAddOpen(true)
        }
    }

    const selectedRowsCount = enableRowSelection ? table.getSelectedRowModel().rows.length : 0

    return (
        <div className="space-y-4">
            {/* Header Section - Search, Tools, Add Button */}
            <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                    {/* Search Component */}
                    <DataTableSearch
                        pagination={pagination}
                        setPagination={setPagination}
                        className="max-w-sm"
                        placeholder="Search..."
                    />

                    {/* Selected rows indicator */}
                    {enableRowSelection && selectedRowsCount > 0 && (
                        <div className="text-sm text-muted-foreground">
                            {selectedRowsCount} of {table.getFilteredRowModel().rows.length} row(s) selected
                        </div>
                    )}
                </div>

                <div className="flex items-center space-x-2">
                    {/* Custom JSX */}
                    {customJsx}

                    {/* Tools */}
                    {tools && (
                        <div className="flex items-center space-x-2">
                            {tools}
                        </div>
                    )}

                    {/* Add Button */}
                    {addButton && (
                        <Button onClick={handleAddClick} className="ml-2">
                            {addButtonIcon || <Plus className="mr-2 h-4 w-4" />}
                            {addButtonLabel}
                        </Button>
                    )}
                </div>
            </div>

            {/* Table Section */}
            <Card>
                <div className="relative">
                    {/* Loading Overlay */}
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                            <div className="flex items-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm text-muted-foreground">Loading...</span>
                            </div>
                        </div>
                    )}

                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={tableColumns.length}
                                        className="h-24 text-center"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                <span>Loading...</span>
                                            </div>
                                        ) : pagination.searchTerm ? (
                                            <div className="text-muted-foreground">
                                                No results found for "{pagination.searchTerm}"
                                            </div>
                                        ) : (
                                            <div className="text-muted-foreground">
                                                No data available
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <DataTablePagination
                    pagination={pagination}
                    setPagination={setPagination}
                />
            </Card>
        </div>
    )
}