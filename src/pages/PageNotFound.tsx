import { DocumentTitle } from '@/functions/DocumentTitle'
import { ArrowLeft, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    DocumentTitle('Page Not Found')
    const navigate = useNavigate();
    // Simulated navigation functions for demo
    const handleGoBack = () => {
        navigate(-1);
    }

    const handleGoHome = () => {
        navigate('/');
    }

    return (
        <div className='h-full w-full bg-gradient-to-br from-background via-card to-muted dark:from-background dark:via-card dark:to-muted flex items-center justify-center px-4 py-8'>
            <div className='max-w-4xl mx-auto text-center relative'>

                {/* Animated background elements with olive theme */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute -top-40 -left-40 w-80 h-80 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
                    <div className='absolute -bottom-40 -right-40 w-80 h-80 bg-accent/30 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-1000'></div>
                    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-complementary/10 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse delay-500'></div>
                </div>

                {/* Main content */}
                <div className='relative z-10'>
                    {/* Large 404 number with olive gradient */}
                    <div className='relative mb-8'>
                        <h1 className='text-[8rem] md:text-[12rem] lg:text-[16rem] font-black bg-gradient-to-r from-primary via-success to-info bg-clip-text text-transparent leading-none select-none'>
                            404
                        </h1>

                        {/* Subtle glitch effect overlay */}
                        <div className='absolute inset-0 text-[8rem] md:text-[12rem] lg:text-[16rem] font-black text-complementary/20 opacity-30 animate-pulse leading-none select-none'>
                            404
                        </div>

                        {/* Decorative shapes around 404 */}
                        <div className='absolute top-4 right-4 w-6 h-6 bg-warning/60 rounded-full animate-bounce'></div>
                        <div className='absolute bottom-4 left-4 w-4 h-4 bg-info/60 rounded-full animate-bounce delay-300'></div>
                        <div className='absolute top-1/2 left-2 w-3 h-3 bg-success/60 rounded-full animate-bounce delay-600'></div>
                    </div>

                    {/* Error message */}
                    <div className='space-y-6 mb-12'>
                        <h2 className='text-3xl md:text-4xl font-bold text-foreground'>
                            Oops! Page Not Found
                        </h2>
                        <p className='text-lg text-muted-foreground max-w-md mx-auto leading-relaxed'>
                            The page you're looking for seems to have wandered off into the digital wilderness. Let's get you back on the right path!
                        </p>
                    </div>

                    {/* Action buttons */}
                    <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-12'>
                        <button
                            onClick={handleGoBack}
                            className='bg-gradient-to-r from-primary to-success hover:from-primary-dark hover:to-success-dark text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2'
                        >
                            <ArrowLeft size={20} />
                            Go Back
                        </button>

                        <button
                            onClick={handleGoHome}
                            className='border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2'
                        >
                            <Home size={18} />
                            Go to Homepage
                        </button>
                    </div>

                    {/* Decorative animated dots */}
                    <div className='flex justify-center space-x-2'>
                        <div className='w-3 h-3 bg-primary rounded-full animate-bounce'></div>
                        <div className='w-3 h-3 bg-success rounded-full animate-bounce delay-100'></div>
                        <div className='w-3 h-3 bg-warning rounded-full animate-bounce delay-200'></div>
                        <div className='w-3 h-3 bg-info rounded-full animate-bounce delay-300'></div>
                    </div>
                </div>

                {/* Floating animated elements */}
                <div className='absolute top-20 left-10 w-4 h-4 bg-primary/60 rounded-full animate-ping'></div>
                <div className='absolute bottom-20 right-10 w-6 h-6 bg-warning/50 rounded-full animate-ping delay-500'></div>
                <div className='absolute top-1/3 right-5 w-2 h-2 bg-success/70 rounded-full animate-ping delay-1000'></div>
                <div className='absolute bottom-1/3 left-8 w-5 h-5 bg-info/40 rounded-full animate-ping delay-1500'></div>

                {/* Subtle pattern overlay */}
                <div className='absolute inset-0 opacity-5 pointer-events-none'>
                    <div className='w-full h-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transform rotate-45'></div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound