import * as yup from "yup";

export const ProfileInformationSchema = yup.object().shape({
    first_name: yup.string().min(1, 'Invalid first name').required("This field is required"),
    last_name: yup.string().min(1, 'Invalid last name').required("This field is required"),
    email: yup.string().email("Invalid email format").min(1, 'Invalid email').required("This field is required"),
    address: yup.string().min(10, 'Invalid Address, be more specific')
})

export const PasswordSchema = yup.object().shape({
    current_password: yup.string().min(1, 'Invalid password').required("This field is required"),
    password: yup.string().min(1, 'Invalid password').required("This field is required"),
    password_confirmation: yup.string().min(1, 'Invalid password').required("This field is required"),
})