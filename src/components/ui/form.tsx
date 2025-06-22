import type { ReactNode } from 'react'

export const FormLabel = ({
    className,
    children,
    required,
}: {
    className?: string
    children?: ReactNode
    required?: boolean
}) => {
    return (
        <p className={` ${className} pb-1 text-[14px] text-foreground dark:text-slate-300`}>
            {children}
            <small className={`${required ? 'inline-flex' : 'hidden'} text-destructive`}>&nbsp;*</small>
        </p>
    )
}

export const FormError = ({ error }: { error: string | undefined }) => {
    if (!error || error === '') return null
    return <p className='text-destructive text-[12px]'>{error}</p>
}
