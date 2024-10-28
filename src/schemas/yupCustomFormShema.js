import * as yup from "yup";

export const YupCustomFormSchema = yup.object({
    name: yup
        .string()
        .required("Name is required")
        .min(2, "Name should be longer"),
    datepicker: yup.string().required("Datepicker is required"),
    region: yup
        .string()
        .required("Region is required"),
});