import * as yup from "yup";

export const YupNovapostBlockSchema = yup.object({
    name: yup
        .string()
        .required("Username is required"),
    email: yup
        .string()
        .email("Email format is not valid")
        .required("Email is required"),
    department: yup
        .string()
        .required("Department is required"),
    city: yup
        .string()
        .required("City is required"),
});