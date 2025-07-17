import Modal from '@/components/modal'
import { image } from '@/data/image'
import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { LuDownload } from 'react-icons/lu'
import { MdOutlineZoomOutMap } from 'react-icons/md'
import { RiFileExcel2Line } from 'react-icons/ri'
import { VscFilePdf } from 'react-icons/vsc'

interface ImageRenderProps {
    url?: string
    file?: File
    mimeType?: string
    handleDeleteFile?: () => void
    hideCross?: boolean
    width?: string
    height?: string
    title?: string
    variant?: 'md' | 'sm'
    showDownload?: boolean
    className?: string
}

const ImageRenderer = ({
    file,
    mimeType,
    handleDeleteFile,
    url,
    hideCross,
    width = '100px',
    height = '100px',
    title,
    variant = 'md',
    showDownload = false,
    className,
}: ImageRenderProps) => {
    const [open, setOpen] = useState(false)
    const [path, setPath] = useState<string | null>(null)
    const [type, setType] = useState<string | null>(null)

    return (
        <>
            {variant === 'sm' ? (
                <div
                    className={`bg-gray-100 border border-gray-200 dark:border-gray-600 px-4 py-1 cursor-pointer ${className}`}
                >
                    <div className='flex items-center gap-2'>
                        <p className='text-sm'>{title ?? 'Attachment'}</p>
                        {showDownload && url && (
                            <a href={url} download={url.split('/').pop() ?? ''} target='_blank' className='flex items-center'>
                                <LuDownload size={14} />
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className='relative border border-gray-200 dark:border-gray-600 overflow-hidden'
                    style={{ width: width ?? '100px', height: height ?? '100px' }}
                >
                    {file ? (
                        <>
                            <Zoom
                                onclick={() => {
                                    setOpen(true)
                                    setPath(URL.createObjectURL(file))
                                    setType(mimeType as string)
                                }}
                            />

                            {file.type.startsWith('image/') ? (
                                <img className='object-cover w-full h-full' src={URL.createObjectURL(file)} width='100%' />
                            ) : file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                                file.type === 'application/vnd.ms-excel' ? (
                                <div
                                    className='flex justify-center items-center'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <RiFileExcel2Line size={60} color='gray' />
                                </div>
                            ) : (
                                <div
                                    className='flex justify-center items-center'
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <VscFilePdf size={60} color='gray' />
                                </div>
                            )}
                        </>
                    ) : url ? (
                        <>
                            {mimeType?.startsWith('image/') ? (
                                <div className='relative'>
                                    {showDownload && (
                                        <a
                                            href={url}
                                            download={url.split('/').pop() ?? ''}
                                            target='_blank'
                                            className='absolute top-0 right-0 bg-black bg-opacity-20 p-1'
                                        >
                                            <LuDownload color='white' size={18} />
                                        </a>
                                    )}
                                    <img src={url} className='object-cover w-[100px] h-[100px]' width='100%' height='100%' />
                                </div>
                            ) : (
                                <div
                                    className='w-[100%] h-[100%]'
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <VscFilePdf size={60} color='gray' />
                                    {showDownload && (
                                        <a
                                            href={url}
                                            download={url.split('/').pop() ?? ''}
                                            target='_blank'
                                            className='absolute top-0 right-0 bg-black bg-opacity-20 p-1'
                                        >
                                            <LuDownload color='white' size={18} />
                                        </a>
                                    )}
                                </div>
                            )}
                            <Zoom
                                onclick={() => {
                                    setOpen(true)
                                    setPath(url)
                                    setType(mimeType as string)
                                }}
                            />
                        </>
                    ) : null}
                    {!hideCross && (
                        <div
                            className='absolute top-0 right-0 bg-gray-100 dark:bg-transparent p-1 cursor-pointer text-red-500 z-10'
                            onClick={() => {
                                handleDeleteFile && handleDeleteFile()
                            }}
                        >
                            <AiOutlineClose size={15} />
                        </div>
                    )}
                </div>
            )}

            <Modal open={open} setOpen={setOpen} title={title ?? 'Attachment'} size='md'>
                <div>
                    {type?.startsWith('image/') ? (
                        <div className='relative'>
                            <img
                                src={path ?? image.fallback}
                                width='100%'
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                            {showDownload && path && (
                                <a
                                    href={path}
                                    download={path.split('/').pop() ?? ''}
                                    target='_blank'
                                    className='absolute bottom-4 right-4 bg-black bg-opacity-20 p-2 rounded'
                                >
                                    <LuDownload color='white' size={24} />
                                </a>
                            )}
                        </div>
                    ) : (
                        <div className='relative'>
                            <iframe width='100%' height='500px' src={path as string} allowFullScreen />
                            {showDownload && path && (
                                <a
                                    href={path}
                                    download={path.split('/').pop() ?? ''}
                                    target='_blank'
                                    className='absolute bottom-4 right-4 bg-black bg-opacity-20 p-2 rounded'
                                >
                                    <LuDownload color='white' size={24} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default ImageRenderer

interface ZoomProps {
    onclick: () => void
}
const Zoom = ({ onclick }: ZoomProps) => {
    return (
        <div className='absolute top-0 right-0 w-[100%] h-[100%]  flex items-center justify-center cursor-pointer'>
            <div
                onClick={() => {
                    onclick()
                }}
                className='bg-black bg-opacity-20 p-1'
            >
                <MdOutlineZoomOutMap color='white' size={'18px'} />
            </div>
        </div>
    )
}
