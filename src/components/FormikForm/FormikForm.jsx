import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formSchema } from "../../schemas/formShema";
import { addDays, subDays, formatDate } from "../../helpers/dateHelper";
import styles from "./FormikForm.module.scss";

const initialValues = {
    userName: "",
    phone: "",
    objNumber: "",
    checkIn: null,
    checkOut: null,
};

const onSubmit = (values, submitProps) => {
    const formedValues = {
        ...values,
        checkIn: formatDate(values.checkIn),
        checkOut: formatDate(values.checkOut),
    };
    console.log("Form data values:", values);
    console.log("formedValues:", formedValues);
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
            {({ errors, touched, isValid, values }) => {
                // console.log("Formik Values:", values);
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
                        <div className={styles.inputWrap}>
                            <svg className={styles.iconSvg}>
                                <use href='/sprite.svg#icon-calendar' />
                            </svg>
                            <svg className={styles.iconSvgRight}>
                                <use href='/sprite.svg#icon-chevron-down' />
                            </svg>
                            {/* <label htmlFor='checkIn' className={styles.label}>
                                'Дата заїзду
                            </label> */}
                            <Field name='checkIn' id='checkIn'>
                                {({ form, field }) => {
                                    const { setFieldValue } = form;
                                    const { value } = field;
                                    // console.log("errors", errors);
                                    // console.log("touched.", touched);
                                    return (
                                        <DatePicker
                                            id='checkIn'
                                            selectsStart
                                            className={
                                                errors.checkIn &&
                                                touched.checkIn
                                                    ? `${styles.input} ${styles.inputError}`
                                                    : styles.input
                                            }
                                            placeholderText='Дата заїзду'
                                            {...field}
                                            selected={value}
                                            onChange={(val) =>
                                                setFieldValue("checkIn", val)
                                            }
                                            excludeDateIntervals={[
                                                {
                                                    start: subDays(
                                                        new Date(),
                                                        100
                                                    ),
                                                    end: addDays(new Date(), 0),
                                                },
                                            ]}
                                            includeDateIntervals={[
                                                {
                                                    start: subDays(
                                                        new Date(),
                                                        2
                                                    ),
                                                    end: addDays(
                                                        new Date(),
                                                        20
                                                    ),
                                                },
                                            ]}
                                        />
                                    );
                                }}
                            </Field>
                            <ErrorMessage
                                name='checkIn'
                                className={styles.error}
                                component='p'
                            />
                        </div>
                        {/* check_Out  */}
                        <div className={styles.inputWrap}>
                            <svg className={styles.iconSvg}>
                                <use href='/sprite.svg#icon-calendar' />
                            </svg>
                            <svg className={styles.iconSvgRight}>
                                <use href='/sprite.svg#icon-chevron-down' />
                            </svg>
                            {/* <label htmlFor='checkIn' className={styles.label}>
                                'Дата заїзду
                            </label> */}
                            <Field name='checkOut' id='checkOut'>
                                {({ form, field }) => {
                                    const { setFieldValue } = form;
                                    const { value } = field;
                                    return (
                                        <DatePicker
                                            id='checkOut'
                                            selectsEnd
                                            minDate={values.checkIn}
                                            className={
                                                errors.checkOut &&
                                                touched.checkOut
                                                    ? `${styles.input} ${styles.inputError}`
                                                    : styles.input
                                            }
                                            placeholderText='Дата виїзду'
                                            {...field}
                                            selected={value}
                                            onChange={(val) =>
                                                setFieldValue("checkOut", val)
                                            }
                                            includeDateIntervals={[
                                                {
                                                    start: subDays(
                                                        new Date(),
                                                        2
                                                    ),
                                                    end: addDays(
                                                        new Date(),
                                                        20
                                                    ),
                                                },
                                            ]}
                                        />
                                    );
                                }}
                            </Field>
                            <ErrorMessage
                                name='checkOut'
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
