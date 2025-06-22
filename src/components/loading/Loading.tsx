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
        // Convert seconds to milliseconds
        const timer = setTimeout(
            () => {
                setIsLoading(false)
            },
            (loadingTime ?? 1) * 1000
        )

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer)
    }, [loadingTime])

    // Loading effect
    if (isLoading || loading) {
        return (
            <div className='flex h-[100vh] w-full justify-center items-center dark:bg-dark-foreground'>
                <div className='loader'></div>
            </div>
        )
    }

    // After loading time, return children components
    return <>{children}</>
}

export default Loading
