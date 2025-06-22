import { endPoint } from '@/constants/endPoint'
import useAPI from '@/hooks/useAPI'
import { createContext, useEffect, useState } from 'react'

interface IProviderProps {
    children: React.ReactNode
}

export const IsAuthorize = createContext<{
    isAuthorized: boolean
    loading: boolean
    authData: any
    setAuthData: React.Dispatch<React.SetStateAction<any>>
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>
}>({
    isAuthorized: false,
    authData: null,
    loading: true,
    setAuthData: () => { },
    setIsAuthorized: () => { },
})

const AuthProvider = ({ children }: IProviderProps) => {
    const { getOne } = useAPI()
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [authData, setAuthData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true)

    const checkAuthorize = async () => {
        try {
            const response = await getOne(endPoint?.auth?.isAuthenticated)
            if (response?.status) setIsAuthorized(true)
            else throw new Error('Unauthorized')
            setAuthData(response?.data)
        } catch (error) {
            setIsAuthorized(false)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuthorize()
    }, [])

    return (
        <IsAuthorize.Provider
            value={{
                loading,
                authData,
                isAuthorized,
                setAuthData: setAuthData as React.Dispatch<React.SetStateAction<boolean>>,
                setIsAuthorized: setIsAuthorized as React.Dispatch<React.SetStateAction<boolean>>,
            }}
        >
            {children}
        </IsAuthorize.Provider>
    )
}

export default AuthProvider
