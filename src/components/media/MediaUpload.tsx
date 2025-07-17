import ImageRenderer from '@/components/media/ImageRenderer'
import { Input } from '@/components/ui/input'
import type { IMedia } from '@/interfaces/media/media.interface'

import React from 'react'

type acceptExtension = 'images' | 'pdf' | 'xlsx' | 'svg'

export interface AppState {
    selectedFiles: File[]
    mediaGroup: IMedia[]
    deleteMedia: IMedia[] | string[]
}

interface IProps {
    title: string
    hideCross?: boolean
    hideUpload?: boolean
    accept?: acceptExtension[]
    appState: AppState
    setAppState: React.Dispatch<React.SetStateAction<AppState>>
    multipleUpload?: boolean
    isRequired?: boolean
    requiredMessage?: string
    showError?: boolean
    replace?: boolean
}

const FileUpload = ({
    title,
    hideCross = false,
    hideUpload = false,
    accept = ['images'],
    appState,
    setAppState,
    multipleUpload = true,
    isRequired = false,
    requiredMessage = '',
    showError = false,
    replace = false,
}: IProps) => {
    const handleDeleteFile = (index: number) => {
        setAppState((prevState) => ({
            ...prevState,
            selectedFiles: prevState.selectedFiles.filter((_item, i) => i !== index),
        }))
    }

    const deleteMediaFile = (index: number, media: any) => {
        setAppState((prevState) => ({
            ...prevState,
            mediaGroup: prevState.mediaGroup.filter((_item, i) => i !== index),
            deleteMedia: [...prevState.deleteMedia, media],
        }))
    }

    const supported: string[] = []
    if (accept.includes('images')) supported.push('image/png', 'image/jpeg', 'image/jpg')
    if (accept.includes('pdf')) supported.push('application/pdf , pdf')
    if (accept.includes('xlsx')) supported.push('.xlsx')

    const acceptExt: string = supported.join(', ')

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const temp = Array.from(e.target.files ?? [])

        if (replace) {
            // When replace is true, clear existing files and set new ones
            setAppState((prevState) => ({
                ...prevState,
                selectedFiles: temp,
                mediaGroup: [],
                // If there are existing mediaGroup items, move them to deleteMedia
                deleteMedia: [...(prevState.deleteMedia as IMedia[]), ...prevState.mediaGroup],
            }))
        } else if (multipleUpload) {
            setAppState((prevState) => ({
                ...prevState,
                selectedFiles: [...prevState.selectedFiles, ...temp],
            }))
        } else {
            setAppState((prevState) => ({
                ...prevState,
                selectedFiles: temp,
            }))
        }
    }

    return (
        <div>
            <div className='flex flex-wrap gap-2' style={{ paddingBottom: appState?.mediaGroup?.length > 0 ? 3 : 0 }}>
                {appState?.mediaGroup?.map((media: IMedia, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <ImageRenderer
                                title={title}
                                url={media.path as string}
                                mimeType={media?.mimeType as string}
                                hideCross={hideCross}
                                handleDeleteFile={() => {
                                    deleteMediaFile(index, media)
                                }}
                            />
                        </React.Fragment>
                    )
                })}
            </div>
            <div style={{ paddingBottom: appState?.mediaGroup?.length > 0 ? 3 : 0 }} className='flex flex-wrap gap-2'>
                {appState?.selectedFiles?.map((file, index: number) => {
                    return (
                        <React.Fragment key={index}>
                            <ImageRenderer
                                title={title}
                                file={file as File}
                                mimeType={file?.type as string}
                                handleDeleteFile={() => {
                                    handleDeleteFile(index)
                                }}
                            />
                        </React.Fragment>
                    )
                })}
            </div>
            {!hideUpload && (
                <>
                    <Input
                        label={title}
                        required={isRequired}
                        type='file'
                        placeholder='Enter full name'
                        multiple={false}
                        accept={acceptExt}
                        onChange={handleFileChange}
                    />
                    {isRequired ? (
                        <div className='flex flex-col gap-2'>
                            {showError && <p className='pt-2 text-[13px] text-red-500'>{requiredMessage}</p>}
                            <p className='pt-2 text-primary text-[13px]'>
                                {"Allowed Extensions"}: {accept.join(', ')}
                            </p>
                        </div>
                    ) : (
                        <p className='pt-2 text-primary text-[13px]'>
                            {"Allowed Extensions"}: {accept.join(', ')}
                        </p>
                    )}
                </>
            )}
        </div>
    )
}

export default FileUpload

