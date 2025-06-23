import PageNotFound from '@/pages/PageNotFound'
import { ProtectedRoute } from '@/ProtectedRoute'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import LazyLoading from '../LazyLoading'
const DashboardTemplate = LazyLoading(lazy(async () => await import('@/templates/Dashboard.template')))
const Dashboard = LazyLoading(lazy(async () => await import('@/pages/dashboard')))
const LoginLog = LazyLoading(lazy(async () => await import('@/pages/dashboard/loginlog')))

export const userRoute = [
    {
        path: 'dashboard',
        element: (
            <ProtectedRoute>
                <DashboardTemplate />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <Navigate to='home' />,
            },
            {
                path: 'home',
                element: <Dashboard />,
            },
             {
                path: 'login-log',
                element: <LoginLog />,
            },
            {
                path: '*',
                element: <PageNotFound />,
            },
        ],
    },
]
