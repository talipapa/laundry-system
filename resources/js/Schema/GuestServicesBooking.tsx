import * as yup from "yup";

export const BookingSchema = yup.object().shape({
    first_name: yup.string().min(1, 'Invalid first name').required("This field is required"),
    last_name: yup.string().min(1, 'Invalid last name').required("This field is required"),
    email: yup.string().email("Invalid email format").min(1, 'Invalid email').required("This field is required"),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup.string()
     .oneOf([yup.ref('password')], 'Passwords must match'),
    serviceType: yup.array().required('This field is required'),
    addOns: yup.array().of(yup.object().shape({
        name: yup.string(),
        price: yup.number()
    })),
    reserveOn: yup.string().required('This field is required'),
})

