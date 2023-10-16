import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../helpers/regularExp";
import styles from "./FormikForm.module.scss";

const listOfNumbers = ["1", "2", "3", "4", "55", "55", "99"];

const initialValues = {
    userName: "",
    phone: "",
    objNumber: "",
};

const validationSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Ім’я має бути довшим")
        .max(20, "Ім’я має бути коротшим")
        .required("Заповніть це поле"),
    phone: Yup.string()
        .matches(phoneRegExp, "+380123456789")
        .required("Заповніть це поле"),
    objNumber: Yup.number()
        .positive("Тільки цифри")
        .moreThan(-1, "Тільки позитивні цифри")
        .test({
            name: "objNumber",
            // skipAbsent: true,
            test(value, ctx) {
                // console.log("String(value):", String(value));
                // console.log("ctx:", ctx);
                if (!listOfNumbers.includes(String(value))) {
                    return ctx.createError({
                        message: "Такого номера немає",
                    });
                }

                // if ((value) => value > 0) {
                //     return ctx.createError({
                //         message: "Такого номера немає",
                //     });
                // }

                return true;
            },
        })

        .required("Заповніть це поле"),
});

const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    // console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
};

const FormikForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ errors, touched, isValid }) => {
                // console.log("isValid:", isValid);
                return (
                    <Form className={styles.form}>
                        <div className={styles.inputWrap}>
                            <svg className={styles.iconSvg}>
                                <use href='/sprite.svg#icon-user' />
                            </svg>
                            {/* <label htmlFor='userName' className={styles.label}>
                                Ім’я
                            </label> */}
                            <Field
                                type='text'
                                name='userName'
                                id='userName'
                                placeholder='Ім’я'
                                maxLength='40'
                                className={
                                    errors.userName && touched.userName
                                        ? `${styles.input} ${styles.inputError}`
                                        : styles.input
                                }
                            />
                            <ErrorMessage
                                name='userName'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        <div className={styles.inputWrap}>
                            <svg className={styles.iconSvg}>
                                <use href='/sprite.svg#icon-phone' />
                            </svg>
                            {/* <label htmlFor='phone' className={styles.label}>
                                Номер телефону
                            </label> */}
                            <Field
                                type='text'
                                name='phone'
                                id='phone'
                                placeholder='Номер телефону'
                                maxLength='20'
                                className={
                                    errors.phone && touched.phone
                                        ? `${styles.input} ${styles.inputError}`
                                        : styles.input
                                }
                            />
                            <ErrorMessage
                                name='phone'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        <div className={styles.inputWrap}>
                            <svg className={styles.iconSvg}>
                                <use href='/sprite.svg#icon-hash' />
                            </svg>
                            {/* <label htmlFor='objNumber' className={styles.label}>
                                Номер об’єкту
                            </label> */}
                            <Field
                                type='text'
                                name='objNumber'
                                id='objNumber'
                                maxLength='3'
                                placeholder='Номер об’єкту'
                                className={
                                    errors.objNumber && touched.objNumber
                                        ? `${styles.input} ${styles.inputError}`
                                        : styles.input
                                }
                            />
                            <ErrorMessage
                                name='objNumber'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        <button disabled={!isValid} type='submit'>
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormikForm;
