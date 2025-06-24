import * as Yup from 'yup'

export const companySchema = Yup.object().shape({
    name: Yup.string().required('Company name is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
})
