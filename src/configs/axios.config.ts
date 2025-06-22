import { endPoint } from '@/constants/endPoint'
import axios from 'axios'

export const PrivateAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
})

const refreshAccessToken = async () => {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}${endPoint?.auth?.refreshToken}`, {}, { withCredentials: true })
        return true
    } catch (error) {
        console.error('Failed to refresh access token:', error)
        throw error
    }
}

PrivateAxiosInstance.interceptors.response.use(
    (response) => {
        // If the response is successful, just return it
        return response
    },
    async (error) => {
        const originalRequest = error.config

        if (
            error.response &&
            error.response.status === 401 &&
            error?.response?.data?.message === 'TOKEN_EXPIRED' &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true // Prevent infinite loop

            try {
                // Attempt to refresh the access token
                await refreshAccessToken()

                // Retry the original request
                return PrivateAxiosInstance(originalRequest)
            } catch (refreshError) {
                // Handle token refresh failure (e.g., log out the user)
                console.error('Failed to refresh token:', refreshError)
                throw refreshError
            }
        }

        // If the error is not a 401, reject it
        return Promise.reject(error)
    }
)
