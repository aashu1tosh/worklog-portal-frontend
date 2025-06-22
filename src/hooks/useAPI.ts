import { PrivateAxiosInstance } from '@/configs/axios.config'
import envConfig from '@/configs/env.config'
import type { IResponse, IResponseById } from '@/interfaces/response.interface'

export interface IGetParameter {
    perpage?: number
    page?: number
    search?: string
}
type IGets = Record<string, any>

const useAPI = <T>() => {

    const get = async (endPoint: string, args?: IGets): Promise<IResponse<T>> => {
        try {
            const url = new URL(`${envConfig.uri}${endPoint}`)
            if (args) {
                const searchParams = new URLSearchParams(url.search)
                for (const [key, value] of Object.entries(args)) {
                    if (value) searchParams.set(key, value)
                }
                url.search = searchParams.toString()
            }

            const response = await PrivateAxiosInstance.get(url.toString())
            return {
                status: true,
                data: response?.data?.data,
                message: 'Fetched',
            }
        } catch (error: unknown) {
            let message = 'An error occurred'

            return {
                status: false,
                data: null,
                message,
            }
        }
    }

    const getOne = async (endPoint: string, args?: IGets): Promise<IResponseById<T>> => {
        try {
            const url = new URL(`${envConfig.uri}${endPoint}`)
            if (args) {
                const searchParams = new URLSearchParams(url.search)
                for (const [key, value] of Object.entries(args)) {
                    if (value !== null && value !== undefined) {
                        searchParams.set(key, value)
                    }
                }
                url.search = searchParams.toString()
            }

            const response = await PrivateAxiosInstance.get(url.toString())
            return {
                status: true,
                data: response?.data?.data,
                message: 'Fetched',
            }
        } catch (error: unknown) {
            let message = 'An error occurred'

            return {
                status: false,
                data: null,
                message: error instanceof Error ? error.message : message,
            }
        }
    }

    const getById = async (endPoint: string, id: string): Promise<IResponseById<T>> => {
        try {
            const response = await PrivateAxiosInstance.get(`${endPoint}/${id}`)
            return {
                status: true,
                data: response?.data?.data,
                message: response?.data?.message || 'Fetched Successfully',
            }
        } catch (error: unknown) {
            let message = 'An error occurred'

            return {
                status: false,
                data: null,
                message: error instanceof Error ? error?.message : message
            }
        }
    }

    const post = async (endPoint: string, data: Partial<T>) => {
        try {
            const response = await PrivateAxiosInstance.post(endPoint, data)
            return {
                status: true,
                message: response?.data?.message ?? 'Created Successfully',
                data: response?.data?.data || null,
            }
        } catch (error: unknown) {
            let message = 'An error occurred'
            return {
                status: false,
                message: error instanceof Error ? error.message : message,
            }
        }
    }

    const patch = async (endPoint: string, data: Partial<T>) => {
        try {
            const response = await PrivateAxiosInstance.patch(endPoint, data)
            return {
                status: true,
                message: response?.data?.message || 'Updated successfully',
                data: response?.data?.data || null,
            }
        } catch (error: unknown) {
            let message = 'An error occurred'

            return {
                status: false,
                message: error instanceof Error ? error.message : message,
            }
        }
    }

    const remove = async (
        endPoint: string,
        id: string
    ): Promise<{
        status: boolean
        message: string
    }> => {
        try {
            const response = await PrivateAxiosInstance.delete(`${endPoint}/${id}`)
            return {
                status: true,
                message: response?.data?.message ?? 'Deleted successfully',
            }
        } catch (error: unknown) {
            let message = 'An error occurred'

            return {
                status: false,
                message: error instanceof Error ? error.message : message,
            }
        }
    }

    return { get, getById, post, patch, remove, getOne }
}

export default useAPI
