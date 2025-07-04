import { FormError, FormLabel } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import type { FieldError } from 'react-hook-form'

type GenericSelectProps<T extends Record<string, string | number>> = {
  value: T[keyof T] | (Omit<T[keyof T], 'ALL'> & 'ALL')
  error?: FieldError | undefined
  handleChange: (value: T[keyof T] | (Omit<T[keyof T], 'ALL'> & 'ALL')) => void
  label?: string
  required?: boolean
  hideOptions?: T[keyof T][]
  options: T
  placeholder?: string
  showAll?: boolean
  className?: string
  disabled?: boolean
  variant?: 'PRIMARY' | 'SECONDARY'
  colors?: Partial<Record<T[keyof T], string>>
  rounded?: 'lg' | 'none'
}

const GenericSelect = <T extends Record<string, string | number>>({
  value,
  error,
  handleChange,
  label,
  required = false,
  hideOptions = [],
  options,
  showAll = false,
  placeholder = 'Select an option',
  className,
  variant = 'PRIMARY',
  disabled = false,
  colors,
  rounded = 'none',
}: GenericSelectProps<T>) => {
  const [selectedValue, setSelectedValue] = useState<string | number>('')

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  return (
    <div>
      {label ? <FormLabel required={required}>{label}</FormLabel> : ''}
      <Select
        onValueChange={(e) => {
          setSelectedValue(e)
          handleChange(e as T[keyof T] | (Omit<T[keyof T], 'ALL'> & 'ALL'))
        }}
        value={selectedValue?.toString()}
        disabled={disabled}
      >
        <SelectTrigger
          className={`text-[13px] 
          ${variant === 'PRIMARY' ? '' : 'border-none bg-transparent dark:bg-transparent p-0'}
          ${error ? 'border-red-500' : ''} ${className}`}
          style={
            variant === 'PRIMARY' && colors
              ? {
                  color: colors[value as T[keyof T]] ?? '#b02004',
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '0px',
                  borderRadius: rounded === 'lg' ? '1rem' : '0',
                }
              : {}
          }
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {showAll && (
            <SelectItem
              key={'ALL'}
              className='text-[13px] rounded-none'
              value={'ALL'}
              style={
                variant === 'PRIMARY' && colors
                  ? {
                      backgroundColor: '#b02004',
                      color: 'white',
                    }
                  : {}
              }
            >
              <span className='whitespace-nowrap'>ALL</span>
            </SelectItem>
          )}
          {Object.values(options).map((option: any) => {
            if (hideOptions.includes(option)) return null
            return (
              <SelectItem
                key={option}
                className='text-[13px] rounded-none'
                value={option?.toString()}
                style={
                  variant === 'PRIMARY' && colors && option in colors
                    ? {
                        backgroundColor: colors[option as T[keyof T]],
                        color: 'white',
                      }
                    : {}
                }
              >
                <span className='whitespace-nowrap'>{option?.replace(/_/g, ' ')}</span>
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      <FormError error={error?.message} />
    </div>
  )
}

export default GenericSelect
