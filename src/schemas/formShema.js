import * as Yup from "yup";
import { phoneRegExp } from "../helpers/regularExp";

// const listOfNumbers = ["1", "2", "3", "4", "55", "77", "99"];

export const formSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Ім’я має бути довшим")
        .max(29, "Ім’я має бути коротшим")
        .required("Заповніть це поле"),
    phone: Yup.string()
        .matches(phoneRegExp, "+380123456789")
        .required('Заповніть це поле'),
    objNumber: Yup.number()
        .moreThan(-1, "Тільки позитивні цифри")
        .typeError("Тільки цифри")
        .test({
            name: "objNumber",
            test(value, ctx) {
                // console.log('this.options.context:', this.options.context)
                const listOfNumbers = this.options.context;
                if (!listOfNumbers.includes(String(value)) && value) {
                    return ctx.createError({
                        message: "Такого номера немає",
                    });
                }

                return true;
            },
        })
    // .required('Заповніть це поле')
    ,
    checkIn: Yup.string()
        .nullable()
    // .required('Заповніть це поле')
    ,

    checkOut: Yup.string()
        .nullable()
    // .when('checkIn',
    //     (checkIn, formSchema) => {
    //         console.log('checkIn[0]', checkIn[0])
    //         console.log('checkOut', checkOut)
    //         // const qwe = document.getElementById("#checkOut")
    //         // console.log('qwe', qwe.value)
    //         if (checkIn) {
    //             const dayAfter = new Date(startDate.getTime() + 86400000);

    //             return formSchema.min(dayAfter, 'Невірна послідовність дат');
    //         }

    //         return formSchema;

    //     }),

    // checkOut: Yup.date()
    //     .nullable()
    //     .test({
    //         name: "checkOut",
    //         test(value, ctx) {
    //             console.log('YUP values:', value)

    //             if (value.checkIn && value.checkOut && value.checkIn > value.checkOut) {
    //                 return ctx.createError({
    //                     message: "Невірна послідовність дат",
    //                 });
    //             }

    //             return true;
    //         },
    //     })
    // .required('Заповніть це поле')
});