import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { phoneRegExp } from "../../helpers/regularExp";
import styles from "./FormikForm.module.scss";

const initialValues = {
    userName: "",
    phone: "",
    objNumber: "",
};

const validationSchema = Yup.object({
    userName: Yup.string()
        .min(2, "Must be longer")
        .max(25, "Must be shorter than 25")
        .required("Required"),
    phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Must enter a phone number"),
    objNumber: Yup.string().required("Required"),
});

const onSubmit = (values, submitProps) => {
    console.log("Form data", values);
    console.log("submitProps", submitProps);
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
            {(formik) => {
                console.log("Formik props", formik);
                return (
                    <Form className={styles.form}>
                        <div className={styles.inputWrap}>
                            <label htmlFor='userName' className={styles.label}>
                                Ім’я
                            </label>
                            <Field
                                type='text'
                                name='userName'
                                id='userName'
                                className={styles.input}
                            />
                            <ErrorMessage
                                name='userName'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor='phone' className={styles.label}>
                                Номер телефону
                            </label>
                            <Field
                                type='text'
                                name='phone'
                                id='phone'
                                className={styles.input}
                            />
                            <ErrorMessage
                                name='phone'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        <div className={styles.inputWrap}>
                            <label htmlFor='objNumber' className={styles.label}>
                                Номер об’єкту
                            </label>
                            <Field
                                type='text'
                                name='objNumber'
                                id='objNumber'
                                className={styles.input}
                            />
                            <ErrorMessage
                                name='objNumber'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        <button type='submit'>Submit</button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default FormikForm;
