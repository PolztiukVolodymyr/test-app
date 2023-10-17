import * as Yup from "yup";
import { phoneRegExp } from "../helpers/regularExp";

const listOfNumbers = ["1", "2", "3", "4", "55", "77", "99"];

export const formSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Ім’я має бути довшим")
        .max(29, "Ім’я має бути коротшим")
        .required("Заповніть це поле"),
    phone: Yup.string()
        .matches(phoneRegExp, "+380123456789")
        .required("Заповніть це поле"),
    objNumber: Yup.number()
        .moreThan(-1, "Тільки позитивні цифри")
        .typeError("Тільки цифри")
        .test({
            name: "objNumber",
            test(value, ctx) {
                if (!listOfNumbers.includes(String(value))) {
                    return ctx.createError({
                        message: "Такого номера немає",
                    });
                }

                return true;
            },
        })

        .required("Заповніть це поле"),
});