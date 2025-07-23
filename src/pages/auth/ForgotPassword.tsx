import Loading from '@/components/loading/Loading'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema } from '@/configs/schemas/auth.schema'
import { endPoint } from '@/constants/endPoint'
import { DocumentTitle } from '@/functions/DocumentTitle'
import useAPI from '@/hooks/useAPI'
import useAuth from '@/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FiLogIn } from 'react-icons/fi'
import { IoMailOutline } from 'react-icons/io5'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'

interface ILogin {
    email: string
}

const ForgotPassword = () => {
    DocumentTitle('Forgot Password')
    const { post } = useAPI()
    const { isAuthorized, loading } = useAuth()

    const defaultValues = {
        email: '',
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ILogin>({
        resolver: yupResolver(forgotPasswordSchema),
        defaultValues,
    })

    const loginFn = async (data: { email: string; }) => {
        const response = await post(endPoint?.auth?.forgotPassword, data)
        if (!response?.status) throw new Error(response?.message)
        return response
    }

    const mutation = useMutation({
        mutationFn: loginFn,
    })

    const onSubmit = async (loginInput: ILogin) => {
        try {
            const res = await mutation.mutateAsync({
                email: loginInput?.email,

            })

            toast.success('Operation Successful', {
                description: res?.message || 'Forgot Password mail has been sent',
            })
            reset(defaultValues)
        } catch (error: any) {
            toast.error('ForgotPassword Failed', {
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
                <div className='mb-4'>
                    <Input
                        label="Email / Phone Number"
                        required
                        error={errors?.email}
                        placeholder="Enter your email or phone number"
                        icon={<IoMailOutline />}
                        {...register('email')}
                    />
                </div>
                <Button loading={isSubmitting} className='w-full' icon={<FiLogIn />}>
                    Forgot Password
                </Button>
            </form>
        </div>
    )
}

export default ForgotPassword


