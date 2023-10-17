import { Formik, Form, Field, ErrorMessage } from "formik";
import { formSchema } from "../../schemas/formShema";
import styles from "./FormikForm.module.scss";

const initialValues = {
    userName: "",
    phone: "",
    objNumber: "",
};

const onSubmit = (values, submitProps) => {
    console.log("Form data values:", values);
    // console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
};

const FormikForm = () => {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
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
                                maxLength='30'
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
