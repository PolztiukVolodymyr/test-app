import * as yup from "yup";

export const YupHookFormSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Email format is not valid")
        .required("Email is required"),
    comment: yup.string().required("Comment is required"),
});