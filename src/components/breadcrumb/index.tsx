import {
    Breadcrumb as BreadcrumbComponent,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Breadcrumb = ({ origin }: { origin?: 'DASHBOARD' | 'LANDING' }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const segments = location.pathname
        .split('/')
        .slice(1)
        ?.filter((segment) => {
            const uuidRegex = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i
            const isNumber = /^\d+$/.test(segment)
            const isUndef = segment === 'undefined'
            const isNull = segment === 'null'
            return segment && !uuidRegex.test(segment) && !isNumber && !isUndef && !isNull
        })

    // Function to format segment names for display
    const formatSegmentName = (segment: string) => {
        return segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    // Function to build the path for each breadcrumb item
    const buildPath = (index: number) => {
        const originalSegments = location.pathname.split('/').slice(1)
        const segmentIndex = originalSegments.findIndex(seg => seg === segments[index])
        return '/' + originalSegments.slice(0, segmentIndex + 1).join('/')
    }

    const handleBackClick = () => {
        if (origin === 'DASHBOARD') {
            navigate('/dashboard')
        } else if (origin === 'LANDING') {
            navigate('/')
        } else {
            navigate(-1)
        }
    }

    return (
        <div className='flex justify-between items-center border-b pb-2 border-gray-200 dark:border-gray-500'>
            <BreadcrumbComponent>
                <BreadcrumbList>
                    {/* Home/Root item */}
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={origin === 'DASHBOARD' ? '/dashboard' : '/'}>
                                {origin === 'DASHBOARD' ? 'Dashboard' : 'Home'}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {/* Render filtered segments */}
                    {segments.map((segment, index) => (
                        <div key={segment} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {index === segments.length - 1 ? (
                                    // Last item - not clickable
                                    <span className="font-medium text-gray-900 dark:text-gray-100">
                                        {formatSegmentName(segment)}
                                    </span>
                                ) : (
                                    // Clickable breadcrumb items
                                    <BreadcrumbLink asChild>
                                        <Link to={buildPath(index)}>
                                            {formatSegmentName(segment)}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    ))}
                </BreadcrumbList>
            </BreadcrumbComponent>

            {/* Back button */}
            <button
                onClick={handleBackClick}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                aria-label="Go back"
            >
                <IoIosArrowRoundBack className="w-5 h-5" />
                Back
            </button>
        </div>
    )
}

export default Breadcrumb