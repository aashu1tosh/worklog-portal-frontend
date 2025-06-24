import Modal from '@/components/modal'
import { SubmitButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { companySchema } from '@/configs/schemas/company/company.schema'
import { endPoint } from '@/constants/endPoint'
import { handleFormSubmission } from '@/functions/formSubmission'
import useAPI from '@/hooks/useAPI'
import useApiMutation from '@/hooks/useAPIMutation'
import type { ICompany } from '@/interfaces/company/company.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoCallOutline, IoLocationOutline, IoMailOutline } from 'react-icons/io5'
import { TbBuildingBank } from 'react-icons/tb'

interface IProps {
    open: boolean
    setOpen: (data: boolean) => void
    selectedId: string | null
    setSelectedId?: (data: string | null) => void
}
const AddCompany = ({ open, setOpen, selectedId }: IProps) => {
    const { getById } = useAPI<ICompany>()
    const [selectedValue, setSelectedValue] = useState<ICompany | null>(null)

    const { createMutation, updateMutation } = useApiMutation<
        ICompany
    >({
        endpoint: endPoint?.company?.company,
    })

    const defaultValues = {
        name: '',
        address: '',
        contactNumber: '',
        contactEmail: '',
        remarks: '',
    }

    const { isLoading, data } = useQuery({
        queryKey: ['workLogDetails', selectedId],
        queryFn: async () => {
            const response = await getById(endPoint?.company?.company, selectedId as string)
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
    } = useForm<ICompany>({
        resolver: yupResolver(companySchema),
        defaultValues,
    })

    useEffect(() => {
        if (data?.data) setSelectedValue(data?.data as ICompany)
    }, [data])

    useEffect(() => {
        if (selectedId) {
            reset({
                name: selectedValue?.name ?? '',
                address: selectedValue?.address ?? '',
                phone: selectedValue?.phone ?? '',
                email: selectedValue?.email ?? '',
            })
        }
    }, [selectedValue])

    const onSubmit = async (data: ICompany) => {

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
            isUpdate: !!selectedValue,
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
                        error={errors?.name}
                        placeholder={'Enter company name'}
                        icon={<TbBuildingBank />}
                        {...register('name')}
                    />
                    <Input
                        label={'Address'}
                        required
                        error={errors?.name}
                        placeholder={'Enter company address'}
                        icon={<IoLocationOutline />}
                        {...register('address')}
                    />
                    <Input
                        label={'Contact Number'}
                        error={errors?.phone}
                        placeholder={'Enter contact number'}
                        icon={<IoCallOutline />}
                        {...register('phone')}
                    />
                    <Input
                        label={'Contact Email'}
                        type='email'
                        error={errors?.email}
                        placeholder={'Enter contact email'}
                        icon={<IoMailOutline />}
                        {...register('email')}
                    />
                </div>
            }
        </Modal>
    )
}

export default AddCompany
