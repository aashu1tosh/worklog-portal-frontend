import type { IPagination } from '@/interfaces/pagination.interface';

export interface IResponse<T> {
    data: { data: T[]; pagination: IPagination } | null
    message: string
    status: boolean
}

export interface IResponseById<T> {
    data: T | null
    message: string
    status: boolean
}
