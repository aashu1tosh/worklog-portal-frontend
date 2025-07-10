import Loading from '@/components/loading/Loading'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { LoginSchema } from '@/configs/schemas/auth.schema'
import { endPoint } from '@/constants/endPoint'
import { DocumentTitle } from '@/functions/DocumentTitle'
import useAPI from '@/hooks/useAPI'
import useAuth from '@/hooks/useAuth'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { AiOutlineLock } from 'react-icons/ai'
import { FiLogIn } from 'react-icons/fi'
import { IoMailOutline } from 'react-icons/io5'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface ILogin {
    email: string
    password: string
    rememberMe?: boolean
}

const Login = () => {
    DocumentTitle('Login - Panel')
    const { post } = useAPI()
    const navigate = useNavigate()
    const { isAuthorized, setIsAuthorized, setAuthData, loading } = useAuth()

    const defaultValues = {
        email: '',
        password: '',
    }

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ILogin>({
        resolver: yupResolver(LoginSchema()),
        defaultValues,
    })

    const loginFn = async (data: { email: string; password: string; }) => {
        const response = await post(endPoint?.auth?.login, data)
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
                password: loginInput?.password,
            })
            setIsAuthorized(true);
            setAuthData(res?.data)
            navigate('/dashboard')
            toast.success('Operation Successful', {
                description: res?.message || 'Login successful',
            })
            reset(defaultValues)
        } catch (error: any) {
            toast.error('Login Failed', {
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
                <div className='mb-4'>
                    <Input
                        label="Password"
                        required
                        error={errors?.password}
                        type='password'
                        placeholder='xxxxxxxxx'
                        icon={<AiOutlineLock />}
                        {...register('password')}
                    />
                </div>
                <div className='flex justify-between'>
                    <div className='flex items-center space-x-2 pb-4'>
                        <Checkbox id='rememberMe' {...register('rememberMe')} defaultChecked />
                        <label
                            htmlFor='rememberMe'
                            className='text-sm dark:text-slate-100 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                        >
                            Remember Me
                        </label>
                    </div>
                    <label
                        htmlFor='terms'
                        className='text-sm  leading-none  text-destructive cursor-pointer hover:underline'
                        onClick={() => {
                            navigate('/forget-password')
                        }}
                    >
                        Forgot Password?
                    </label>
                </div>
                <Button loading={isSubmitting} className='w-full' icon={<FiLogIn />}>
                    Login
                </Button>
            </form>
        </div>
    )
}

export default Login


