"use client";

import { useEffect, useState } from "react";

import { useForm, useController } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import { YupCustomFormSchema } from "../../schemas/yupCustomFormShema";
import CustomSelect from "../CustomComponents/CustomSelect";

import styles from "./ControlForm.module.scss";

const ControlForm = () => {
    const initialValues = {
        defaultValues: {
            region: "",
        },
        resolver: yupResolver(YupCustomFormSchema),
        mode: "onChange",
    };

    const form = useForm(initialValues);
    const {
        register,
        handleSubmit,
        formState,
        reset,
        control,
        getValues,
        setValue,
    } = form;
    const { errors, isSubmitSuccessful, isValid, isSubmitting, isSubmitted } =
        formState;

    const { field } = useController({
        control,
        name: "region",
    });

    console.log("field:", field);
    console.log("field.value:", field.value);

    const [regionValue, setRegionValue] = useState(null);
    console.log("regionValue:", regionValue);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data) => {
        console.log("ControlFormData:", data);
    };
    // console.log("errors", errors);

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formBlock}
                noValidate
            >
                <div className={styles.wrapper}>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>{errors.region?.message}</p>
                        <CustomSelect
                            value={regionValue}
                            setValue={setRegionValue}
                        />
                    </div>
                </div>
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
            </form>
            <DevTool control={control} />
        </>
    );
};

export default ControlForm;
