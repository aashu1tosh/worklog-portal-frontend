import Loading from '@/components/loading/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { restorePasswordSchema } from '@/configs/schemas/auth.schema'
import { endPoint } from '@/constants/endPoint'
import { DocumentTitle } from '@/functions/DocumentTitle'
import useAPI from '@/hooks/useAPI'
import useAuth from '@/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FiLogIn } from 'react-icons/fi'
import { IoMailOutline } from 'react-icons/io5'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

interface IPayload {
    newPassword: string
    confirmPassword: string
}

const ForgotPassword = () => {
    DocumentTitle('Forgot Password')
    const { post } = useAPI()
    const { isAuthorized, loading } = useAuth()
    const { token } = useParams()
    const navigate = useNavigate()

    const defaultValues = {
        newPassword: '',
        confirmPassword: '',
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<IPayload>({
        resolver: yupResolver(restorePasswordSchema),
        defaultValues,
    })

    const restorePasswordFn = async (data: { newPassword: string; }) => {
        const response = await post(endPoint?.auth?.restorePassword + '/' + token, data)
        if (!response?.status) throw new Error(response?.message)
        return response
    }

    const mutation = useMutation({
        mutationFn: restorePasswordFn,
    })

    const onSubmit = async (payload: IPayload) => {
        try {
            const res = await mutation.mutateAsync({
                newPassword: payload?.newPassword,
            })

            toast.success('Operation Successful', {
                description: res?.message || 'Password restoration successful.',
            })
            reset(defaultValues)
            navigate('/auth/login')
        } catch (error: any) {
            toast.error('Restore password failed', {
                description: error?.message ?? 'Something went wrong',
            })
        }
    }

    if (loading) return <Loading loading={loading}>&nbsp;</Loading>
    return isAuthorized ? (
        <Navigate to='/dashboard' replace />
    ) : (
        <div className='pt-3'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-4 mb-4'>
                    <Input
                        label="New Password"
                        required
                        type='password'
                        error={errors?.newPassword}
                        placeholder="xxxxxxxxxxxx"
                        icon={<IoMailOutline />}
                        {...register('newPassword')}
                    />
                    <Input
                        label="Confirm Password"
                        required
                        type='password'
                        error={errors?.confirmPassword}
                        placeholder='xxxxxxxxxxxx'
                        icon={<IoMailOutline />}
                        {...register('confirmPassword')}
                    />
                </div>
                <Button loading={isSubmitting} className='w-full' icon={<FiLogIn />}>
                    Restore Password
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword


