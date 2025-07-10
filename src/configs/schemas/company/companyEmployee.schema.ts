// This regex checks for at least one lowercase letter, one uppercase letter, one digit, and one special character, with a minimum length of 8 characters.
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

import { Role } from '@/constants/enum';
import * as Yup from 'yup';

export const companyEmployeeSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    role: Yup.mixed<Role>()
        .oneOf(Object.values(Role), 'Invalid role')
        .required('Role is required'),
    phone: Yup.string()
        .matches(/^[0-9]+$/, 'Phone number must contain only digits')
        .required('Phone number is required'),
    email: Yup.string().required('Email is required').email('Invalid email format'),
    password: Yup.string()
        .matches(passwordRegex, 'Password must contain at least 8 characters, one uppercase, one lowercase, and one digit')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
});

export type ICompanyEmployeeForm = {
    firstName: string;
    middleName?: string | undefined | null;
    lastName: string;
    role: Role;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}