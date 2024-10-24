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
            name: "",
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

    useEffect(() => {
        setValue("region", regionValue, { shouldValidate: true });
    }, [regionValue, setValue]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            setValue("region", "");
            setRegionValue("");
        }
    }, [isSubmitSuccessful, reset, setValue]);

    const onSubmit = (data) => {
        console.log("ControlFormData:", data);
    };

    return (
        <>
            <h4>Custom SelectComponent inside react-hook-form</h4>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formBlock}
                noValidate
            >
                <div className={styles.wrapper}>
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
