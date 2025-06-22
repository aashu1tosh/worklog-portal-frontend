import Loading from '@/components/loading/Loading'
import useAuth from '@/hooks/useAuth'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'


export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthorized, loading } = useAuth()

    return !isAuthorized ? (
        <Loading loading={loading}>
            <Navigate to='/auth' replace />
        </Loading>
    ) : (
        <Loading loading={loading}>{children}</Loading>
    )
}
