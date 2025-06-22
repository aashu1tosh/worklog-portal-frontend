import { lazy } from 'react'
import LazyLoading from '../LazyLoading'
const AuthTemplate = LazyLoading(lazy(async () => await import('@/templates/Auth.template')))
const Login = LazyLoading(lazy(async () => await import('@/components/auth/Login')))


export const authRoute = [
    {
        path: '',
        element:
            <AuthTemplate />,
        children: [
            {
                path: '',
                element: <Login />,
            },
            {
                path: '*',
                element: <Login />,
            },
        ],
    },
]
