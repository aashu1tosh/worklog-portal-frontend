import { IsAuthorize } from '@/contexts/auth'
import { useContext } from 'react'

const useAuth = (): {
    isAuthorized: boolean
    loading: boolean
    authData: any
    setAuthData: React.Dispatch<React.SetStateAction<any>>
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
} => {
    return useContext<{
        isAuthorized: boolean
        loading: boolean
        authData: any
        setAuthData: React.Dispatch<React.SetStateAction<any>>
        setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
    }>(IsAuthorize)
}

export default useAuth
