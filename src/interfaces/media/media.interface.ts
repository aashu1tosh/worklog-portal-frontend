import type { MediaType } from '@/constants/enum'
import { type IBaseInterface } from '@/interfaces/base.interface'

export interface IMedia extends IBaseInterface {
    name?: string
    originalName?: string
    mimeType?: string
    type?: MediaType
    path?: string
}

export interface AppState {
    selectedFiles: File[]
    mediaGroup: IMedia[]
    deleteMedia: IMedia[] | string[]
}