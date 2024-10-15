"use client";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { regionData } from "../../data/regionData";
import { getRegionsArray } from "../../helpers/getRegionsNovapost";
import { YupNovapostBlockSchema } from "../../schemas/yupNovapostBlockSchema";

import styles from "./Novapost.module.scss";

const NovaPostBlock = () => {
    const initialValues = {
        defaultValues: {
            name: "",
            email: "",
            region: "",
        },
        resolver: yupResolver(YupNovapostBlockSchema),
        mode: "onChange",
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful, isValid, isSubmitting, isSubmitted } =
        formState;

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    useEffect(() => {
        async function fetchData() {
            const arr = await getRegionsArray();
            setRegions(arr);
        }
        fetchData();
    }, []);

    const onSubmit = (data) => {
        console.log("NovapostBlockFormData:", data);
    };

    return (
        <>
            <NavLink to='/'>Home</NavLink>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.formBlock}
                noValidate
            >
                <h3 className={styles.formTitle}>Дані для відправки</h3>
                <div className={styles.wrapper}>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>{errors.name?.message}</p>
                        <input
                            type='text'
                            {...register("name")}
                            placeholder='Ім’я'
                            maxLength='30'
                            autoComplete='off'
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputWrap}>
                        <p className={styles.error}>{errors.email?.message}</p>

                        <input
                            type='text'
                            {...register("email")}
                            placeholder='Email'
                            autoComplete='off'
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>{errors.region?.message}</p>
                        <select
                            {...register("region")}
                            className={`${styles.input} ${styles.selectTitle}`}
                        >
                            <option value='' disabled defaultValue>
                                Область
                            </option>
                            {regions?.map((el, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={el}
                                        className={styles.input}
                                    >
                                        {el}
                                    </option>
                                );
                            })}
                        </select>
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
        </>
    );
};

export default NovaPostBlock;
