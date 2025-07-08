import Modal from '@/components/modal'
import { SubmitButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5'
import { TbBuildingBank } from 'react-icons/tb'

interface IProps {
    open: boolean
    setOpen: (data: boolean) => void
    selectedId: string | null
    setSelectedId?: (data: string | null) => void
}
const AddWorklog = ({ open, setOpen, selectedId }: IProps) => {
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
        queryKey: ['worklog-details', selectedId],
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
    }, [selectedId])

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
            title={selectedId ? 'Update Company Details' : 'Add New Company'}
            onSubmit={handleSubmit(onSubmit)}
            showFooter
            footerButton={<SubmitButton update={!!selectedId} loading={isSubmitting} />}
            onHandleClose={() => {
                reset(defaultValues)
            }}
        >
            {selectedId && isLoading ? (
                'Loading...'
            ) :
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-2'>
                    <Input
                        label={'Name'}
                        required
                        error={errors?.taskCompleted}
                        placeholder={'Todays completed task'}
                        icon={<TbBuildingBank />}
                        {...register('taskCompleted')}
                    />
                    <Input
                        label={'Address'}
                        required
                        error={errors?.taskPlanned}
                        placeholder={'Planned task for tomorrow'}
                        icon={<IoLocationOutline />}
                        {...register('taskPlanned')}
                    />
                    <Input
                        label={'Challenging Task'}
                        error={errors?.challengingTask}
                        placeholder={'Enter challenges faced'}
                        icon={<IoCallOutline />}
                        {...register('challengingTask')}
                    />
                </div>
            }
        </Modal>
    )
}

export default AddWorklog
