import * as Yup from 'yup'
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const upperCaseRegex = /[A-Z]/
export const lowerCaseRegex = /[a-z]/
export const numberRegex = /\d/
export const specialCharacterRegex = /[@$!%*?&#]/

export const LoginSchema = () => {
    return Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        password: Yup.string()
            .required('Password is required')
    })
}

export const updatePasswordSchema = Yup.object({
  oldPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .required('New password is required')
    .matches(
      passwordRegex,
      'New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords do not match')
    .required('Confirm password is required'),
})



