import * as yup from "yup";

export const YupNovapostBlockSchema = yup.object({
    name: yup
        .string()
        .required("Username is required"),
    email: yup
        .string()
        .email("Email format is not valid")
        .required("Email is required"),
    city: yup
        .string()
        .required("City is required")
        .test({
            name: "city",
            test(value, ctx) {
                const notExist = this.options.context.cities.length === 0;
                if (notExist) {
                    return ctx.createError({
                        message: "Цього міста немає у списку"
                    })
                }
                return true;
            },
        }),
    department: yup
        .string()
        .required("Department is required")
        .test({
            name: "department",
            test(value, ctx) {
                const notExist = this.options.context.departments.length === 0;
                if (notExist) {
                    return ctx.createError({
                        message: "Тут немає відділень"
                    })
                }
                return true;
            },
        }),
});