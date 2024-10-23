import * as yup from "yup";

export const YupCustomFormSchema = yup.object({

    region: yup.string().required("Region is required"),

});