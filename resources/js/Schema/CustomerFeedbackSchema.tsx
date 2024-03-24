import * as yup from "yup";

export const FeedbackSchema = yup.object().shape({
    user_id: yup.number().required("Something wrong with your account. Please contact an Administrator"),
    rating: yup.number().min(1, "Invalid rating").max(5, "Invalid rating").required("Rating is required!"),
    message: yup.string().min(15, "Description is too short").max(50, "Descriptiong is way too long").required("Description is required")

})