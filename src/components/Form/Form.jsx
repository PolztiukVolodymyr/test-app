import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, subDays, formatDate } from "../../helpers/dateHelper";
// import { sendToTelegram } from "../helpers/sendToTelegram";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.scss";

const Form = () => {
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);

    const [dirtyCheckIn, setDirtyCheckIn] = useState(false);
    const [dirtyCheckOut, setDirtyCheckOut] = useState(false);

    const [errorCheckIn, setErrorCheckIn] = useState("Заповніть це поле");
    const [errorCheckOut, setErrorCheckOut] = useState("Заповніть це поле");

    const [validForm, setValidForm] = useState(false);

    useEffect(() => {
        if (errorCheckIn || errorCheckOut) {
            setValidForm(false);
        } else {
            setValidForm(true);
        }
    }, [errorCheckIn, errorCheckOut]);

    const formSubmit = async (evt) => {
        evt.preventDefault();

        const data = {
            check_In: formatDate(checkIn),
            check_Out: formatDate(checkOut),
        };
        // sendToTelegram(data);
        console.log("data:", data);

        // try {
        //     const response = await fetch(TELEGRAM_API, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Access-Control-Allow-Origin": "*",
        //             "Access-Control-Allow-Methods": "POST",
        //         },
        //         body: JSON.stringify({
        //             chat_id: TELEGRAM_CHAT_ID,
        //             text,
        //         }),
        //     });

        //     if (response.ok) {
        //         console.log("To telegram sent:", data);
        //     } else {
        //         throw new Error(response.statusText);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        reset();
    };

    const reset = () => {
        setCheckIn(null);
        setCheckOut(null);
        setDirtyCheckIn(false);
        setErrorCheckIn("Заповніть це поле");
        setDirtyCheckOut(false);
        setErrorCheckOut("Заповніть це поле");
    };

    return (
        <>
            <form className={styles.form} onSubmit={formSubmit}>
                <div className={styles.label}>
                    <svg className={styles.iconSvg}>
                        <use href='/sprite.svg#icon-calendar' />
                    </svg>

                    <div className={styles.wrapError}>
                        {dirtyCheckIn && errorCheckIn && (
                            <div className={styles.error}>{errorCheckIn}</div>
                        )}

                        <DatePicker
                            selected={checkIn}
                            onChange={(date) => {
                                if (date) {
                                    setCheckIn(date);
                                    setErrorCheckIn("");
                                }
                            }}
                            selectsStart
                            startDate={checkIn}
                            endDate={checkOut}
                            className={styles.inputPic}
                            placeholderText='Дата заїзду'
                            onBlur={() => setDirtyCheckIn(true)}
                            // isClearable
                            excludeDateIntervals={[
                                {
                                    start: subDays(new Date(), 100),
                                    end: addDays(new Date(), 0),
                                },
                            ]}
                        />
                    </div>
                    <svg className={styles.iconSvgRight}>
                        <use href='/sprite.svg#icon-chevron-down' />
                    </svg>
                </div>
                <div className={styles.label}>
                    <svg className={styles.iconSvg}>
                        <use href='/sprite.svg#icon-calendar' />
                    </svg>
                    <div className={styles.wrapError}>
                        {dirtyCheckOut && errorCheckOut && (
                            <div className={styles.error}>{errorCheckOut}</div>
                        )}
                        <DatePicker
                            name={checkOut}
                            selected={checkOut}
                            onChange={(date) => {
                                if (date) {
                                    setCheckOut(date);
                                    setErrorCheckOut("");
                                }
                            }}
                            selectsEnd
                            startDate={checkIn}
                            endDate={checkOut}
                            minDate={checkIn}
                            className={styles.inputPic}
                            placeholderText='Дата виїзду'
                            onBlur={() => setDirtyCheckOut(true)}
                            // isClearable
                        />
                    </div>
                    <svg className={styles.iconSvgRight}>
                        <use href='/sprite.svg#icon-chevron-down' />
                    </svg>
                </div>
                <button disabled={!validForm}>Submit</button>
            </form>
        </>
    );
};

export default Form;
