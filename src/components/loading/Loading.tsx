import React, { useEffect, useState } from 'react'
import './../../App.css'

interface LoadingComponentProps {
    loadingTime?: number // Time in seconds
    loading?: boolean // Optional loading state
    children: React.ReactNode // Component to render after loading
}

const Loading: React.FC<LoadingComponentProps> = ({ loadingTime, loading, children }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(
            () => {
                setIsLoading(false)
            },
            (loadingTime ?? 1) * 1000
        )

        return () => clearTimeout(timer)
    }, [loadingTime])

    if (isLoading || loading) {
        return (
            <div className='flex h-[100vh] w-full justify-center items-center dark:bg-dark-foreground'>
                <div className='loader'></div>
            </div>
        )
    }

    return <>{children}</>
}

export default Loading
