import * as yup from "yup";

export const AdminSetupSchema = yup.object().shape({
  laundryLocation_lat: yup.number().min(1, 'Invalid latitude').required("This field is required"),
  laundryLocation_lng: yup.number().min(1, 'Invalid longitude').required("This field is required"),
  laundryLocation_email: yup.string().email("Invalid email format").min(1, 'Invalid email').required("This field is required"),
  laundryLocation_phone: yup.string().min(1, 'Invalid phone').required("This field is required"),
  laundryLocation_address: yup.string().min(1, 'Invalid Address').required("This field is required"),
});

export const BusinessInformationSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").min(1, 'Invalid email').required("This field is required"),
  phone: yup.string().min(1, 'Invalid phone').required("This field is required"),
  address: yup.string().min(1, 'Invalid Address').required("This field is required"),
})

export const LaundryLocationSchema = yup.object().shape({
  latitude: yup.number().min(1, 'Invalid latitude').required("This field is required"),
  longitude: yup.number().min(1, 'Invalid longitude').required("This field is required"),
})

