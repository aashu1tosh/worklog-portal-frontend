import type { ReactNode } from 'react'

export const FormLabel = ({
    className,
    children,
    required,
    readOnly
}: {
    className?: string
    children?: ReactNode
    required?: boolean
    readOnly?: boolean
}) => {
    return (
        <p className={` ${className} pb-1 text-[14px] text-foreground dark:text-slate-300`}>
            {children}
            <small className={`${required ? 'inline-flex' : 'hidden'} text-destructive`}>&nbsp;*</small>
            <small className={`${readOnly ? 'inline-flex' : 'hidden'} text-muted-foreground`}>&nbsp;(Read Only)</small>
        </p>
    )
}

export const FormError = ({ error }: { error: string | undefined }) => {
    if (!error || error === '') return null
    return <p className='text-destructive text-[12px]'>{error}</p>
}
