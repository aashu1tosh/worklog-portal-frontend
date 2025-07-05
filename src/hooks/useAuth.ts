import { IsAuthorize } from '@/contexts/auth'
import type { IAuth } from '@/interfaces/auth/auth.interface'
import { useContext } from 'react'

const useAuth = (): {
    isAuthorized: boolean
    loading: boolean
    authData: IAuth | null
    setAuthData: React.Dispatch<React.SetStateAction<IAuth | null>>
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
} => {
    return useContext<{
        isAuthorized: boolean
        loading: boolean
        authData: IAuth | null
        setAuthData: React.Dispatch<React.SetStateAction<IAuth | null>>
        setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
    }>(IsAuthorize)
}

export default useAuth
