import { PrivateAxiosInstance } from "@/configs/axios.config"
import { endPoint } from "@/constants/endPoint"
import type { MediaType } from "@/constants/enum"
import type { IMedia } from "@/interfaces/media/media.interface"


const mediaUploadFn = async (file: File[], fileType: MediaType, description = "media"): Promise<IMedia[] | null> => {
    if (!file || file?.length === 0) return null
    const formData = new FormData()
    formData.append('type', fileType)
    formData.append('description', description)
    file.forEach((f) => {
        formData.append('files', f)
    })

    try {
        const url = endPoint.media
        const response = await PrivateAxiosInstance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return response?.data?.data as IMedia[]
    } catch (error) {
        throw error
    }
}

function getDeletedMediaIds(deleteMedia: (IMedia | string)[] | undefined): string[] {
    return (
        deleteMedia
            ?.filter((item): item is IMedia => typeof item !== 'string' && 'id' in item)
            .map((item) => item.id)
            .filter((id): id is string => id !== undefined) || []
    )
}
export { getDeletedMediaIds, mediaUploadFn }

