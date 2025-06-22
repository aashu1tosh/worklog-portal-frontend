import { type JSX, type LazyExoticComponent, Suspense } from 'react'

const LazyLoading = (Component: LazyExoticComponent<() => JSX.Element>) => {
    const LazyComponent = (props: Record<string, never>) => (
        <Suspense
            fallback={
                <div className=' flex h-[100vh] w-full justify-center items-center dark:bg-dark-foreground'>
                    <div className='loader'></div>
                </div>
            }
        >
            <Component {...props} />
        </Suspense>
    )

    LazyComponent.displayName = `Lazy ${(Component as any)?.displayName || (Component as any)?.name}`

    return LazyComponent
}

export default LazyLoading
