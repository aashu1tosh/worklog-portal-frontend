import { lazy } from 'react'
import LazyLoading from '../LazyLoading'
const AuthTemplate = LazyLoading(lazy(async () => await import('@/templates/Auth.template')))
const Login = LazyLoading(lazy(async () => await import('@/pages/auth/Login')))
const ForgotPassword = LazyLoading(lazy(async () => await import('@/pages/auth/ForgotPassword')))

export const authRoute = [
    {
        path: '/',
        element:
            <AuthTemplate />,
        children: [
            {
                path: '',
                element: <Login />,
            },
            {
                path: '/auth/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '*',
                element: <Login />,
            },
        ],
    },
]
