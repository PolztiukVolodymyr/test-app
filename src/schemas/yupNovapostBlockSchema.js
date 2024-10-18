import * as yup from "yup";

export const YupNovapostBlockSchema = yup.object({
    name: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Email format is not valid")
        .required("Email is required"),
    region: yup.string().required("Region is required"),
    settlement: yup.string().required("Settlement is required"),
    datepicker: yup.string().required("Datepicker is required"),
});