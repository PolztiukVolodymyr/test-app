import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays, formatDate } from "../../helpers/dateHelper";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.scss";

const FormUp = () => {
    const [form, setForm] = useState({
        userName: "",
        phone: "",
        objNumber: "",
        checkIn: null,
        checkOut: null,
        dirtyUserName: false,
        dirtyPhone: false,
        dirtyObjNumber: false,
        dirtyCheckIn: false,
        dirtyCheckOut: false,
        errorUserName: "Заповніть це поле",
        errorPhone: "Заповніть це поле",
        errorObjNumber: "Заповніть це поле",
        errorCheckIn: "Заповніть це поле",
        errorCheckOut: "Заповніть це поле",
        validForm: false,
    });

    const listOfNumbers = [1, 2, 3, 4, 55, 77, 99];

    useEffect(() => {
        if (
            form.errorUserName ||
            form.errorPhone ||
            form.errorCheckIn ||
            form.errorCheckOut ||
            form.errorObjNumber
        ) {
            setForm((prev) => ({ ...prev, validForm: false }));
        } else {
            setForm((prev) => ({ ...prev, validForm: true }));
        }
    }, [
        form.errorCheckIn,
        form.errorCheckOut,
        form.errorUserName,
        form.errorPhone,
        form.errorObjNumber,
    ]);

    const validateName = (value) => {
        if (value.length < 2) {
            setForm((prev) => ({
                ...prev,
                errorUserName: "Ім’я має бути довшим",
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                errorUserName: "",
            }));
        }
        if (value.length === 0) {
            setForm((prev) => ({
                ...prev,
                errorUserName: "Заповніть це поле",
            }));
        }
    };

    const validatePhone = (value) => {
        let re = /^\+\d{12}$/;

        if (!re.test(value)) {
            setForm((prev) => ({
                ...prev,
                errorPhone: "+380123456789",
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                errorPhone: "",
            }));
        }
        if (value.length === 0) {
            setForm((prev) => ({
                ...prev,
                errorPhone: "Заповніть це поле",
            }));
        }
    };

    const validateObjNumber = (value) => {
        let reNum = /^[0-9]*$/;
        const findNum = listOfNumbers?.find((item) => String(item) === value);

        if (!reNum.test(value)) {
            setForm((prev) => ({
                ...prev,
                errorObjNumber: "Тільки цифри",
            }));
        } else if (!findNum) {
            setForm((prev) => ({
                ...prev,
                errorObjNumber: "Такого номера немає",
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                errorObjNumber: "",
            }));
        }
        if (value.length === 0) {
            setForm((prev) => ({
                ...prev,
                errorObjNumber: "Заповніть це поле",
            }));
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        switch (name) {
            case "name":
                if (evt.target.value.length > 30) return;
                validateName(value);
                setForm((prev) => ({ ...prev, userName: value }));
                break;

            case "phone":
                if (evt.target.value.length > 13) return;
                validatePhone(value);
                setForm((prev) => ({ ...prev, phone: value }));
                break;

            case "objNumber":
                if (evt.target.value.length > 3) return;
                validateObjNumber(value);
                setForm((prev) => ({ ...prev, objNumber: value }));
                break;

            default:
                return;
        }
    };

    const handleBlur = (evt) => {
        switch (evt.target.name) {
            case "name":
                setForm((prev) => ({ ...prev, dirtyUserName: true }));
                break;

            case "phone":
                setForm((prev) => ({ ...prev, dirtyPhone: true }));
                break;

            case "objNumber":
                setForm((prev) => ({ ...prev, dirtyObjNumber: true }));
                break;

            default:
                return;
        }
    };

    const formSubmit = (evt) => {
        evt.preventDefault();

        const formData = {
            userName: form.userName,
            phone: form.phone,
            objNumber: form.objNumber,
            check_In: formatDate(form.checkIn),
            check_Out: formatDate(form.checkOut),
        };
        console.log("data:", formData);
        // console.log("formSubmit:", form);
        reset();
    };

    const reset = () => {
        setForm((prev) => ({ ...prev, userName: "" }));
        setForm((prev) => ({ ...prev, phone: "" }));
        setForm((prev) => ({ ...prev, objNumber: "" }));
        setForm((prev) => ({ ...prev, checkIn: null }));
        setForm((prev) => ({ ...prev, checkOut: null }));
        setForm((prev) => ({ ...prev, dirtyUserName: false }));
        setForm((prev) => ({ ...prev, dirtyPhone: false }));
        setForm((prev) => ({ ...prev, dirtyObjNumber: false }));
        setForm((prev) => ({ ...prev, dirtyCheckIn: false }));
        setForm((prev) => ({ ...prev, dirtyCheckOut: false }));
        setForm((prev) => ({ ...prev, errorUserName: "Заповніть це поле" }));
        setForm((prev) => ({ ...prev, errorPhone: "Заповніть це поле" }));
        setForm((prev) => ({ ...prev, errorObjNumber: "Заповніть це поле" }));
        setForm((prev) => ({ ...prev, errorCheckIn: "Заповніть це поле" }));
        setForm((prev) => ({ ...prev, errorCheckOut: "Заповніть це поле" }));
    };

    // const reset = () => {
    //     setForm({ ...form, checkIn: null });
    //     setForm({ ...form, checkOut: null });
    //     setForm({ ...form, dirtyCheckIn: false });
    //     setForm({ ...form, dirtyCheckOut: false });
    //     setForm({ ...form, errorCheckIn: "Заповніть це поле" });
    //     setForm({ ...form, errorCheckOut: "Заповніть це поле" });
    // };

    return (
        <>
            <form className={styles.form} onSubmit={formSubmit}>
                <div className={styles.innerWrap}>
                    <div className={styles.label}>
                        <svg className={styles.iconSvg}>
                            <use href='/sprite.svg#icon-user' />
                        </svg>

                        <div className={styles.wrapError}>
                            {form.dirtyUserName && form.errorUserName && (
                                <div className={styles.error}>
                                    {form.errorUserName}
                                </div>
                            )}
                            <input
                                type='text'
                                name='name'
                                value={form.userName}
                                placeholder='Ім’я'
                                autoComplete='off'
                                className={
                                    form.errorUserName && form.dirtyUserName
                                        ? `${styles.inputPic} ${styles.inputError}`
                                        : styles.inputPic
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    <div className={styles.label}>
                        <svg className={styles.iconSvg}>
                            <use href='/sprite.svg#icon-phone' />
                        </svg>

                        <div className={styles.wrapError}>
                            {form.dirtyPhone && form.errorPhone && (
                                <div className={styles.error}>
                                    {form.errorPhone}
                                </div>
                            )}
                            <input
                                type='tel'
                                name='phone'
                                value={form.phone}
                                placeholder='Номер телефону'
                                autoComplete='off'
                                className={
                                    form.errorPhone && form.dirtyPhone
                                        ? `${styles.inputPic} ${styles.inputError}`
                                        : styles.inputPic
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                    <div className={styles.label}>
                        <svg className={styles.iconSvg}>
                            <use href='/sprite.svg#icon-hash' />
                        </svg>

                        <div className={styles.wrapError}>
                            {form.dirtyObjNumber && form.errorObjNumber && (
                                <div className={styles.error}>
                                    {form.errorObjNumber}
                                </div>
                            )}
                            <input
                                type='text'
                                name='objNumber'
                                value={form.objNumber}
                                placeholder='Номер об’єкту'
                                autoComplete='off'
                                className={
                                    form.errorObjNumber && form.dirtyObjNumber
                                        ? `${styles.inputPic} ${styles.inputError}`
                                        : styles.inputPic
                                }
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.innerWrap}>
                    <div className={styles.label}>
                        <svg className={styles.iconSvg}>
                            <use href='/sprite.svg#icon-calendar' />
                        </svg>
                        <svg className={styles.iconSvgRight}>
                            <use href='/sprite.svg#icon-chevron-down' />
                        </svg>
                        <div className={styles.wrapError}>
                            {form.dirtyCheckIn && form.errorCheckIn && (
                                <div className={styles.error}>
                                    {form.errorCheckIn}
                                </div>
                            )}

                            <DatePicker
                                selected={form.checkIn}
                                onChange={(date) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        checkIn: date,
                                    }));
                                    setForm((prev) => ({
                                        ...prev,
                                        errorCheckIn: "",
                                    }));
                                }}
                                selectsStart
                                startDate={form.checkIn}
                                endDate={form.checkOut}
                                className={styles.inputPic}
                                placeholderText='Дата заїзду'
                                onBlur={() => {
                                    setForm((prev) => ({
                                        ...prev,
                                        dirtyCheckIn: true,
                                    }));
                                }}
                                excludeDateIntervals={[
                                    {
                                        start: subDays(new Date(), 100),
                                        end: addDays(new Date(), 0),
                                    },
                                ]}
                                includeDateIntervals={[
                                    {
                                        start: subDays(new Date(), 2),
                                        end: addDays(new Date(), 20),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                    <div className={styles.label}>
                        <svg className={styles.iconSvg}>
                            <use href='/sprite.svg#icon-calendar' />
                        </svg>
                        <svg className={styles.iconSvgRight}>
                            <use href='/sprite.svg#icon-chevron-down' />
                        </svg>
                        <div className={styles.wrapError}>
                            {form.dirtyCheckOut && form.errorCheckOut && (
                                <div className={styles.error}>
                                    {form.errorCheckOut}
                                </div>
                            )}
                            <DatePicker
                                name={form.checkOut}
                                selected={form.checkOut}
                                onChange={(date) => {
                                    setForm((prev) => ({
                                        ...prev,
                                        checkOut: date,
                                    }));
                                    setForm((prev) => ({
                                        ...prev,
                                        errorCheckOut: "",
                                    }));
                                }}
                                selectsEnd
                                startDate={form.checkIn}
                                endDate={form.checkOut}
                                minDate={form.checkIn}
                                className={styles.inputPic}
                                placeholderText='Дата виїзду'
                                onBlur={() =>
                                    setForm((prev) => ({
                                        ...prev,
                                        dirtyCheckOut: true,
                                    }))
                                }
                                includeDateIntervals={[
                                    {
                                        start: subDays(new Date(), 2),
                                        end: addDays(new Date(), 20),
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </div>
                <button disabled={!form.validForm}>Submit</button>
            </form>
        </>
    );
};

export default FormUp;
