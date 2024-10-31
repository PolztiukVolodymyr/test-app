import * as yup from "yup";

// regex for Ukrainian language and round brackets, coma, dots, dashes
const regexUkr = /^[А-Яа-яҐґЄєІіЇїОоУуЮюЯя0-9\s(),.-]+$/


export const YupNovapostBlockSchema = yup.object({
    name: yup
        .string()
        .required("Заповніть це поле")
        .min(2, "Мінімум два символи"),
    email: yup
        .string()
        .email("Не вілідний email")
        .required("Заповніть це поле"),
    city: yup
        .string()
        .required("Заповніть це поле")
        .matches(regexUkr, 'Підтримується пошук тільки українською мовою...')
        .min(2, "Мінімум два символи")
        .test({
            name: "city",
            test(value, ctx) {
                // console.log('ValidationValue:', value)
                const notExist = this.options.context.cities.length === 0;
                if (notExist) {
                    return ctx.createError({
                        message: "Виберіть місто зі списку"
                    })
                }
                return true;
            },
        }),
    department: yup
        .string()
        .required("Заповніть це поле")
        .test({
            name: "department",
            test(value, ctx) {
                const notExist = this.options.context.departments.length === 0;
                if (notExist) {
                    return ctx.createError({
                        message: "Такого відділення немає"
                    })
                }
                return true;
            },
        }),
});