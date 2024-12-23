"use client";

import { useEffect, useState } from "react";

import { useForm, Controller, useController } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import ReactDatePicker from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import { YupCustomFormSchema } from "../../schemas/yupCustomFormShema";
import CustomSelect from "../CustomComponents/CustomSelect";
import { getLocaleCalendar } from "../../helpers/getLocaleCalendar";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./ControlForm.module.scss";

const ControlForm = () => {
    const initialValues = {
        defaultValues: {
            name: "",
            datepicker: "",
            datepickerLanguage: "",
            region: "",
        },
        resolver: yupResolver(YupCustomFormSchema),
        mode: "onChange",
    };

    const form = useForm(initialValues);
    const { handleSubmit, formState, register, reset, control, setValue } =
        form;
    const { errors, isSubmitSuccessful, isValid, isSubmitting, isSubmitted } =
        formState;

    const { field } = useController({
        control,
        name: "region",
    });

    const [regionValue, setRegionValue] = useState(field.value);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [language, setLanguage] = useState("");

    const locale = getLocaleCalendar(language);

    function onChangeLanguageValue(e) {
        setLanguage(e.target.value);
        setValue("datepickerLanguage", e.target.value);
        // console.log(event.target.value);
    }

    useEffect(() => {
        setValue("region", regionValue, { shouldValidate: true });
    }, [regionValue, setValue]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setValue("region", "");
            setValue("datepickerLanguage", "");
            setRegionValue("");
        }
    }, [isSubmitSuccessful, reset, setValue]);

    const onSubmit = (data) => {
        console.log("ControlFormData:", data);
    };

    return (
        <>
            <h4>
                Custom SelectComponent and ReactDatePicker inside
                react-hook-form
            </h4>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formBlock}
                noValidate
            >
                <div className={styles.wrapper}>
                    <div onChange={onChangeLanguageValue}>
                        Calendar language:
                        <input
                            type='radio'
                            value='en'
                            name='datepickerLanguage'
                        />
                        English
                        <input
                            type='radio'
                            value='ua'
                            name='datepickerLanguage'
                        />
                        Ukr
                        <input
                            type='radio'
                            value='ru'
                            name='datepickerLanguage'
                        />
                        rus
                    </div>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>{errors.name?.message}</p>
                        <input
                            type='text'
                            {...register("name")}
                            placeholder='Name'
                            maxLength='30'
                            autoComplete='off'
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>
                            {errors.datepicker?.message}
                        </p>
                        <Controller
                            control={control}
                            name='datepicker'
                            render={({
                                field: { onChange, onBlur, value, ref },
                            }) => (
                                <ReactDatePicker
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    selected={value}
                                    locale={locale}
                                    className={styles.dataPicker}
                                    placeholderText='Виберіть дату'
                                    dateFormat='dd.MM.yyyy'
                                />
                            )}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>
                            {isSubmitted && errors.region?.message}
                        </p>
                        <CustomSelect
                            value={regionValue}
                            setValue={setRegionValue}
                            isDropdownOpen={isDropdownOpen}
                            setDropdownOpen={setDropdownOpen}
                        />
                    </div>
                </div>
                {!isDropdownOpen && (
                    <button
                        type='submit'
                        disabled={isSubmitting}
                        className={
                            !isSubmitted || (isValid && isSubmitted)
                                ? `${styles.submitButton} ${styles.activeBtn}`
                                : styles.submitButton
                        }
                    >
                        Відправити
                    </button>
                )}
            </form>
            <DevTool control={control} />
        </>
    );
};

export default ControlForm;
