import { image } from '@/constants/image'
import { RiArrowLeftDoubleLine } from 'react-icons/ri'
import { Outlet, useNavigate } from 'react-router-dom'

const AuthTemplate = () => {
    const navigate = useNavigate()
    return (

        <div className='flex bg-[#F3F4F6]   dark:bg-dark  w-full min-h-[100vh] items-center justify-center  lg:px-[10rem] dark:lg:px-[25rem] md:px-[2rem] px-[1rem]'>
            <div className='grid w-full grid-cols-2  md:h-[28rem] h-[100%]'>
                <div className='border-l-[1px] border-y-[1px]  border-gray-100 dark:border-slate-600 md:block hidden dark:hidden'>
                    <img className='h-[100%] w-[100%] object-cover' src={image?.authBackground} alt="Auth Background" />
                </div>
                <div className='bg-white dark:bg-dark-light  border-[1px] border-gray-100 dark:border-slate-600  md:col-span-1 dark:md:col-span-2 col-span-2 flex flex-col justify-center py-5 lg:px-12 md:px-5 px-4'>
                    <div className=''>
                        <h3 className='font-extrabold lg:text-[1.5rem] md:text-[1.3rem] text-[1.15rem] text-primary-dark dark:text-slate-200'>
                            Welcome to Work Log Portal
                        </h3>
                    </div>
                    <div className='pb-2 pt-3'>
                        <Outlet />
                    </div>
                    <p
                        onClick={() => {
                            navigate(-1)
                        }}
                        className='text-left pt-3 flex  items-center text-primary-600 dark:text-slate-300 text-xs cursor-pointer hover:underline'
                    >
                        <RiArrowLeftDoubleLine size={15} />
                        {'Go Back'}
                    </p>
                    <div className='pt-4'>
                        <p className='text-center text-gray-600 dark:text-slate-400 text-xs'>
                            { }&nbsp;
                            <a href='https://www.aashutoshparajuli.com.np' className='text-primary dark:text-slate-300'>
                                Aashutosh Parajuli
                            </a>
                        </p>
                        <p className='text-center text-gray-600 dark:text-slate-400 text-xs'>
                            {new Date().getFullYear()} Work Log Portal. No rights reserved feel free to use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthTemplate
