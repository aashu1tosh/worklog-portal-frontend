import Modal from '@/components/modal'
import { SubmitButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { adminSchema, type IAdminForm } from '@/configs/schemas/admin/admin.schema'
import { endPoint } from '@/constants/endPoint'
import { Role } from '@/constants/enum'
import { handleFormSubmission } from '@/functions/formSubmission'
import useApiMutation from '@/hooks/useAPIMutation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Lock, Phone, User } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { IoMailOutline } from 'react-icons/io5'

interface IProps {
    open: boolean
    setOpen: (data: boolean) => void
    selectedId: string | null
    setSelectedId?: (data: string | null) => void
}
const AddCompany = ({ open, setOpen, selectedId }: IProps) => {

    const { createMutation } = useApiMutation({
        endpoint: endPoint?.admin?.admin,
    })

    const defaultValues = {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(adminSchema),
        defaultValues,
    })

    const onSubmit = async (data: IAdminForm) => {
        const payload = {
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            role: Role.ADMIN,
        }
        await handleFormSubmission({
            createMutation: async () => {
                await createMutation.mutateAsync(payload)
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
            size='lg'
            showFooter
            footerButton={<SubmitButton update={!!selectedId} loading={isSubmitting} />}
            onHandleClose={() => {
                reset(defaultValues)
            }}
        >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 py-2'>
                <Input
                    label={'First Name'}
                    required
                    error={errors?.firstName}
                    placeholder={'Enter first name'}
                    icon={<User size={16} />}
                    {...register('firstName')}
                />
                <Input
                    label={'Middle Name'}
                    error={errors?.middleName}
                    placeholder={'Enter middle name (optional)'}
                    icon={<User size={16} />}
                    {...register('middleName')}
                />
                <Input
                    label={'Last Name'}
                    required
                    error={errors?.lastName}
                    placeholder={'Enter last name'}
                    icon={<User size={16} />}
                    {...register('lastName')}
                />
                <Input
                    label={'Contact Number'}
                    required
                    error={errors?.phone}
                    placeholder={'Enter contact number'}
                    icon={<Phone size={16} />}
                    {...register('phone')}
                />
                <Input
                    label={'Contact Email'}
                    type='email'
                    required
                    error={errors?.email}
                    placeholder={'Enter contact email'}
                    icon={<IoMailOutline size={16} />}
                    {...register('email')}
                />
                <Input
                    label={'Password'}
                    type='password'
                    required
                    error={errors?.password}
                    placeholder={'Enter password'}
                    icon={<Lock size={16} />}
                    {...register('password')}
                />
                <Input
                    label={'Confirm Password'}
                    type='password'
                    required
                    error={errors?.confirmPassword}
                    placeholder={'Confirm password'}
                    icon={<Lock size={16} />}
                    {...register('confirmPassword')}
                />
            </div>
        </Modal>
    )
}

export default AddCompany
