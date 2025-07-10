import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { FormError, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectTrigger } from '@/components/ui/select'
import useAPI from '@/hooks/useAPI'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { type ReactNode, useEffect, useRef, useState } from 'react'
import { type FieldError } from 'react-hook-form'
import { LuCheck, LuSearch } from 'react-icons/lu'

type SelectListProps<T> = {
    value: string | undefined
    error?: FieldError
    handleChange: (value: string) => void
    label?: string
    required?: boolean
    className?: string
    showAll?: boolean
    showNone?: boolean
    endpoint: string // The endpoint to fetch data from
    extractName: (item: T) => string // Function to extract display name from an item
    extractId: (item: T) => string // Function to extract ID from an item
    searchPlaceholder?: string
    selectPlaceholder?: string
    queryParams?: Record<string, any>
    showTags?: (item: T) => ReactNode
    readOnly?: boolean
}

const GenericAPISelect = <T,>({
    value,
    error,
    handleChange,
    label,
    required,
    className,
    showAll = false,
    showNone = false,
    endpoint,
    extractName,
    extractId,
    searchPlaceholder = 'Search here...',
    selectPlaceholder = 'Select option...',
    queryParams,
    showTags,
    readOnly = false,
}: SelectListProps<T>) => {
    const { get } = useAPI<T>()
    const [searchTerm, setSearchTerm] = useState('')
    const [values, setValues] = useState<T[]>([])
    const [mounted, setMounted] = useState(false)
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false)

    const handleInputChange = (e: string) => {
        setSearchTerm(e)
    }

    const timer = useRef<number | null>(null)

    useEffect(() => {
        if (mounted) {
            timer.current = window.setTimeout(() => {
                setSearch(searchTerm)
            }, 500) as unknown as number

            return () => {
                if (timer.current) clearTimeout(timer.current)
            }
        } else {
            setMounted(true)
        }
    }, [searchTerm])

    const { data } = useQuery({
        queryKey: [endpoint, search, queryParams],
        queryFn: async () => {
            const response = await get(endpoint, { search, ...queryParams })
            if (!response?.status) throw new Error(response?.message)

            return {
                data: response?.data,
            }
        },
    })

    useEffect(() => {
        if (data?.data) setValues(data?.data?.data as unknown as T[])
        else setValues([])
    }, [data])

    return (
        <div className={`w-[100%] ${className}`}>
            {label && <FormLabel required={required}>{label}</FormLabel>}

            <Select>
                <SelectTrigger className={`text-[13px] ${error ? 'border-red-500' : ''}`} onClick={() => setOpen(true)}>
                    <div
                        role='combobox'
                        aria-expanded={open}
                        className='w-full flex items-center justify-between text-[13px] font-normal whitespace-nowrap max-w-[1000px] overflow-hidden text-ellipsis'
                    >
                        {value === 'ALL'
                            ? 'ALL'
                            : value && value !== ''
                                ? extractName(values?.find((item) => extractId(item) === value) as T)
                                : selectPlaceholder}
                    </div>
                </SelectTrigger>

                {open && !readOnly && (
                    <SelectContent className={`bg-white ${readOnly ? 'bg-slate-200 pointer-events-none' : ''}`}>
                        <Command>
                            <Input
                                className='border-none h-[35px] rounded-none'
                                required
                                type='search'
                                value={searchTerm}
                                placeholder={searchPlaceholder}
                                icon={<LuSearch />}
                                onChange={(e) => {
                                    handleInputChange(e.target?.value)
                                }}
                            />
                            <hr className='dark:bg-slate-500 bg-gray-200 h-[1px] w-full border-none' />
                            <CommandList>
                                <CommandEmpty>Not found.</CommandEmpty>
                                <CommandGroup>
                                    {showAll && (
                                        <CommandItem
                                            key={'ALL'}
                                            value={'ALL'}
                                            onSelect={() => {
                                                handleChange('ALL')
                                                setOpen(false)
                                            }}
                                        >
                                            All
                                            <LuCheck className={cn('ml-auto mt-[4px]', value === 'ALL' ? 'opacity-100 ' : 'opacity-0')} />
                                        </CommandItem>
                                    )}
                                    {showNone && (
                                        <CommandItem
                                            key={'NONE'}
                                            value={'NONE'}
                                            onSelect={() => {
                                                handleChange('')
                                                setOpen(false)
                                            }}
                                        >
                                            None
                                            <LuCheck className={cn('ml-auto mt-[4px]', value === 'NONE' ? 'opacity-100 ' : 'opacity-0')} />
                                        </CommandItem>
                                    )}
                                    {values?.map((item) => (
                                        <CommandItem
                                            key={extractId(item)}
                                            value={extractId(item)}
                                            className={`${value === extractId(item) ? 'bg-gray-200 text-black hover:bg-gray-200' : 'text-black'
                                                } whitespace-nowrap`}
                                            onSelect={(currentValue) => {
                                                handleChange(currentValue)
                                                setOpen(false)
                                            }}
                                        >
                                            {showTags ? <div className='pr-1'>{showTags(item)}</div> : extractName(item)}
                                            <LuCheck
                                                className={cn('ml-auto mt-[4px]', value === extractId(item) ? 'opacity-100 ' : 'opacity-0')}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </SelectContent>
                )}
            </Select>
            <FormError error={error?.message} />
        </div>
    )
}

export default GenericAPISelect
