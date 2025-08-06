import { image } from '@/data/image'
import { RiArrowLeftDoubleLine } from 'react-icons/ri'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthTemplate = () => {
    const navigate = useNavigate()
    return (
        <div className='flex bg-background w-full min-h-[100vh] items-center justify-center lg:px-[10rem] md:px-[2rem] px-[1rem] transition-colors duration-300'>
            <div className='grid w-full grid-cols-1 md:grid-cols-2 h-auto shadow-2xl rounded-lg overflow-hidden bg-card border border-border'>
                
                {/* Auth Background Image Section */}
                <div className='relative md:block hidden overflow-hidden'>
                    <img 
                        className='h-full w-full object-cover' 
                        src={image?.authBg ?? image?.fallback} 
                        alt="Auth Background" 
                    />
                    {/* Gradient overlay for better contrast in both themes */}
                    <div className='absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent'></div>
                    
                    {/* Optional branding overlay */}
                    <div className='absolute bottom-6 left-6 text-primary-foreground'>
                        <h2 className='text-2xl font-bold mb-2 drop-shadow-lg'>Work Log Portal</h2>
                        <p className='text-sm opacity-90 drop-shadow-md'>Streamline your productivity</p>
                    </div>
                </div>
                
                {/* Auth Form Container */}
                <div className='bg-card flex flex-col justify-center py-8 lg:px-12 md:px-8 px-6 transition-colors duration-300'>
                    
                    {/* Header Section */}
                    <div className='mb-6'>
                        <h3 className='font-extrabold lg:text-2xl md:text-xl text-lg text-foreground mb-2 transition-colors duration-300'>
                            Welcome to Work Log Portal
                        </h3>
                        <p className='text-muted-foreground text-sm transition-colors duration-300'>
                            Please sign in to continue
                        </p>
                    </div>
                    
                    {/* Form Content */}
                    <div className='mb-6'>
                        <Outlet />
                    </div>
                    
                    {/* Go Back Button */}
                    <button
                        onClick={() => navigate(-1)}
                        className='self-start flex items-center gap-2 text-primary hover:text-primary-dark text-sm cursor-pointer hover:underline transition-all duration-200 group'
                    >
                        <RiArrowLeftDoubleLine 
                            size={16} 
                            className='group-hover:-translate-x-1 transition-transform duration-200' 
                        />
                        Go Back
                    </button>
                    
                    {/* Footer Section */}
                    <div className='mt-8 pt-6 border-t border-border transition-colors duration-300'>
                        <div className='text-center space-y-2'>
                            <p className='text-muted-foreground text-xs transition-colors duration-300'>
                                Developed by
                            </p>
                            <a 
                                href='https://www.aashutoshparajuli.com.np' 
                                target='_blank'
                                rel='noopener noreferrer'
                                className='block text-primary hover:text-primary-dark hover:underline transition-colors duration-200 font-medium text-sm'
                            >
                                Aashutosh Parajuli
                            </a>
                            <p className='text-muted-foreground text-xs transition-colors duration-300 pt-2'>
                                © {new Date().getFullYear()} Work Log Portal. Open source & free to use.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthTemplate