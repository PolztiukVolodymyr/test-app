import * as yup from "yup";

export const YupNovaPoshtaSchema = yup.object({
    city: yup
        .string('Введіть назву міста')
        .matches(
            /^[\u0400-\u04FF\s]+$/,
            'Підтримується пошук тільки українською мовою...'
        )
        .required(`"Назва" міста є обов'язкова`),
    departmentsNumber: yup.number('Введіть номер відділення...'),
});