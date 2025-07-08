import * as Yup from 'yup';

export const worklogSchema = Yup.object().shape({
    taskCompleted: Yup.string().required('Task completed is required'),
    taskPlanned: Yup.string().required('Task planned is required'),
})

export type IAdminForm = Yup.InferType<typeof adminSchema>;