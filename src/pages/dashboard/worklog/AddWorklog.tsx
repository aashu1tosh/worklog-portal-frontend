import Modal from '@/components/modal'
import { SubmitButton } from '@/components/ui/button'
import { worklogSchema } from '@/configs/schemas/company/worklog/worklog.schema'
import { endPoint } from '@/constants/endPoint'
import { handleFormSubmission } from '@/functions/formSubmission'
import useAPI from '@/hooks/useAPI'
import useApiMutation from '@/hooks/useAPIMutation'
import type { IWorklog } from '@/interfaces/company/worklog/worklog.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IProps {
    open: boolean
    setOpen: (data: boolean) => void
    selectedId: string | null
    setSelectedId?: (data: string | null) => void
}
const AddWorklog = ({ open, setOpen, selectedId, setSelectedId }: IProps) => {
    const { getById } = useAPI<IWorklog>()
    const [selectedValue, setSelectedValue] = useState<IWorklog | null>(null)

    const { createMutation, updateMutation } = useApiMutation<
        IWorklog
    >({
        endpoint: endPoint?.company?.worklog,
    })

    const defaultValues = {
        taskCompleted: '',
        taskPlanned: '',
    }

    const { isLoading, data } = useQuery({
        queryKey: [selectedId],
        queryFn: async () => {
            const response = await getById(endPoint?.company?.worklog, selectedId as string)
            if (!response?.status) throw new Error(response?.message)

            return {
                data: response?.data,
            }
        },
        enabled: !!selectedId,
    })

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IWorklog>({
        resolver: yupResolver(worklogSchema),
        defaultValues,
    })

    useEffect(() => {
        if (data?.data) setSelectedValue(data?.data as IWorklog)
    }, [data])

    useEffect(() => {
        if (selectedId) {
            reset({
                taskCompleted: selectedValue?.taskCompleted ?? '',
                taskPlanned: selectedValue?.taskPlanned ?? '',
                challengingTask: selectedValue?.challengingTask ?? '',
            })
        }
    }, [selectedValue])

    const onSubmit = async (data: IWorklog) => {

        await handleFormSubmission({
            createMutation: async () => {
                await createMutation.mutateAsync(data)
            },
            updateMutation: async () => {
                await updateMutation.mutateAsync({
                    data,
                    id: selectedValue?.id ?? '',
                })
            },
            reset: () => reset(defaultValues),
            setOpen,
            isUpdate: !!selectedId,
        })
    }

    return (
        <Modal
            open={open}
            setOpen={setOpen}
            title={selectedId ? 'Update Worklog' : 'Add New Worklog'}
            onSubmit={handleSubmit(onSubmit)}
            showFooter
            footerButton={<SubmitButton update={!!selectedId} loading={isSubmitting} />}
            onHandleClose={() => {
                reset(defaultValues)
                setSelectedValue(null)
                if (setSelectedId)
                    setSelectedId(null)
            }}
        >
            {selectedId && isLoading ? (
                'Loading...'
            ) :
                <div className='grid grid-cols-1 gap-4 py-2'>
                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-foreground'>
                            Tasks Completed Today <span className='text-destructive'>*</span>
                        </label>
                        <textarea
                            className='w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground transition-colors'
                            placeholder='Describe the tasks you completed today...'
                            rows={4}
                            {...register('taskCompleted')}
                        />
                        {errors?.taskCompleted && (
                            <span className='text-destructive text-sm'>{errors.taskCompleted.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-foreground'>
                            Tasks Planned for Tomorrow <span className='text-destructive'>*</span>
                        </label>
                        <textarea
                            className='w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground transition-colors'
                            placeholder='Describe the tasks you plan to work on tomorrow...'
                            rows={4}
                            {...register('taskPlanned')}
                        />
                        {errors?.taskPlanned && (
                            <span className='text-destructive text-sm'>{errors.taskPlanned.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-foreground'>
                            Challenging Tasks / Issues
                        </label>
                        <textarea
                            className='w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none text-foreground placeholder:text-muted-foreground transition-colors'
                            placeholder='Describe any challenges or issues you faced...'
                            rows={3}
                            {...register('challengingTask')}
                        />
                        {errors?.challengingTask && (
                            <span className='text-destructive text-sm'>{errors.challengingTask.message}</span>
                        )}
                    </div>
                </div>
            }
        </Modal>
    )
}

export default AddWorklog