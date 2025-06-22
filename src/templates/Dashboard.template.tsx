import Breadcrumb from '@/components/breadcrumb'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

const DashboardTemplate = () => {

    return (
        <div className='h-screen flex flex-col bg-accent dark:bg-dark-dark'>
            <div className='w-full'>
                <Navbar />
            </div>
            <div className='flex flex-1  overflow-y-hidden'>
                <div className='w-[auto] lg:block hidden'>
                    <Sidebar />
                </div>
                <div className='w-full overflow-x-auto rounded-t-lg  '>
                    <div className='h-[calc(100vh-49px)] overflow-y-auto overflow-x-auto bg-white dark:bg-dark-foreground '>                        <div className='p-3'>
                        <Breadcrumb />
                        <Outlet />
                    </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default DashboardTemplate
