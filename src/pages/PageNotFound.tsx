import { Button } from '@/components/ui/button'
import { DocumentTitle } from '@/functions/DocumentTitle'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    DocumentTitle('Page Not Found')
    const navigate = useNavigate()

    return (
        <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 flex items-center justify-center px-4'>
            <div className='max-w-4xl mx-auto text-center relative'>

                {/* Animated background elements */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute -top-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
                    <div className='absolute -bottom-40 -right-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000'></div>
                </div>

                {/* Main content */}
                <div className='relative z-10'>
                    {/* Large 404 number with gradient */}
                    <div className='relative mb-8'>
                        <h1 className='text-[12rem] md:text-[16rem] lg:text-[20rem] font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none select-none'>
                            404
                        </h1>

                        {/* Glitch effect overlay */}
                        <div className='absolute inset-0 text-[12rem] md:text-[16rem] lg:text-[20rem] font-black text-red-500 opacity-20 animate-pulse leading-none select-none'>
                            404
                        </div>
                    </div>

                    {/* Error message */}
                    <div className='space-y-6 mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-gray-800 dark:text-white'>
                            Page Not Found
                        </h2>
                        <p className='text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed'>
                            The page you're looking for seems to have wandered off into the digital void. Let's get you back on track!
                        </p>
                    </div>

                    {/* Action button */}
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                        <Button
                            onClick={() => navigate(-1)}
                            className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2'
                        >
                            <IoIosArrowRoundBack size={20} />
                            Go Back
                        </Button>

                        <Button
                            onClick={() => navigate('/dashboard')}
                            variant="outline"
                            className='border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-200'
                        >
                            Go to Homepage
                        </Button>
                    </div>

                    {/* Decorative elements */}
                    <div className='mt-16 flex justify-center space-x-2'>
                        <div className='w-3 h-3 bg-indigo-500 rounded-full animate-bounce'></div>
                        <div className='w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100'></div>
                        <div className='w-3 h-3 bg-pink-500 rounded-full animate-bounce delay-200'></div>
                    </div>
                </div>

                {/* Floating shapes */}
                <div className='absolute top-20 left-10 w-4 h-4 bg-indigo-400 rounded-full opacity-60 animate-ping'></div>
                <div className='absolute bottom-20 right-10 w-6 h-6 bg-purple-400 rounded-full opacity-40 animate-ping delay-500'></div>
                <div className='absolute top-1/2 left-5 w-2 h-2 bg-pink-400 rounded-full opacity-80 animate-ping delay-1000'></div>
            </div>
        </div>
    )
}

export default PageNotFound