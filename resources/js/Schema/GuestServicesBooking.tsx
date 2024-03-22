import * as yup from "yup";
import valid from 'card-validator'; //import statement


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
    address: yup.string().min(10, 'Invalid address, please be more specific').required("This field is required"),
    reserveOn: yup.string().required('This field is required'),
})

export const SessionedBookingSchema = yup.object().shape({
    serviceType: yup.array().required('This field is required'),
    addOns: yup.array().of(yup.object().shape({
        name: yup.string(),
        price: yup.number()
    })),
    address: yup.string().required('This field is required'),
    reserveOn: yup.string().required('This field is required'),
})

export const PaymongoPaymentSchema = yup.object().shape({
    paymentType: yup.string().required("This field is required"),
    creditCardNumber: yup
    .string()
    .when('paymentType', (paymentType: any) => {
        return paymentType[0] === 'card' ? yup.string()
        .test("test-ccNumber", "Invalid Credit card number", (value: any) => {
            return valid.number(value).isValid
        })
        .required('This field is required') : yup.string().optional()
    }),
    creditCardExpMonth: yup
    .string()
    .when('paymentType', (paymentType: any) => {
        return paymentType[0] === 'card' ? yup.string()
        .test("test-expMonth", "Invalid expiration month", (value: any) =>{
            return valid.expirationMonth(value).isValid;
        })
        .required('This field is required') : yup.string().optional()
    }),

    creditCardExpYear: yup
    .string()
    .when('paymentType', (paymentType: any) => {
        return paymentType[0] === 'card' ? yup.string()
        .test("test-expYear", "Invalid expiration year", (value: any) =>{
            return valid.expirationYear(value).isValid
        })
        .required('This field is required') : yup.string().optional()
    }),

    creditCardVerificationValue: yup
    .string()
    .when('paymentType', (paymentType: any) => {
        return paymentType[0] === 'card' ? yup.string()
        .test("test-ccv", "Invalid CVV", (value) =>{
            return valid.cvv(value).isValid
        })
        .required('This field is required') : yup.string().optional()
    }),

    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    email: yup.string().email("Invalid email format").required("This field is required"),
    address: yup.string().required("This field is required"),
})

