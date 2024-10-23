"use client";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
// import { regionData } from "../../data/regionData";
import {
    getRegionsArray,
    getSettlementById,
} from "../../helpers/getRegionsNovapost";
import { YupNovapostBlockSchema } from "../../schemas/yupNovapostBlockSchema";
import ReactDatePicker from "react-datepicker";

import styles from "./Novapost.module.scss";
import "react-datepicker/dist/react-datepicker.css";

const NovaPostBlock = () => {
    const initialValues = {
        defaultValues: {
            name: "",
            email: "",
            region: "",
            settlement: "",
            datepicker: "",
        },
        resolver: yupResolver(YupNovapostBlockSchema),
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

    const [regions, setRegions] = useState([]);
    const [settlements, setSettlements] = useState([]);

    // console.log("errors: ", errors);
    // console.log("currentRegion: ", getValues("region"));

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

    const onRegionChange = async (event) => {
        setSettlements([]);
        // console.log("event.target.value:", event.target.value);
        let currentRegionId = regions.find(
            (el) => el.description === event.target.value
        ).id;
        setValue("region", event.target.value, { shouldValidate: true });
        // console.log("currentRegionId:", currentRegionId);
        const response = await getSettlementById(currentRegionId);
        setSettlements(response);

        // console.log("responseSettles:", response);
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
                            onChange={onRegionChange}
                            className={
                                getValues("region")
                                    ? styles.input
                                    : `${styles.input} ${styles.selectNottouched}`
                            }
                        >
                            <option value='' disabled defaultValue hidden>
                                Область
                            </option>
                            {regions?.map((el, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={el.description}
                                        className={styles.input}
                                    >
                                        {el.description}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>
                            {errors.settlement?.message}
                        </p>
                        <select
                            {...register("settlement")}
                            // onChange={onRegionChange}
                            className={
                                getValues("settlement")
                                    ? styles.input
                                    : `${styles.input} ${styles.selectNottouched}`
                            }
                        >
                            <option value='' disabled defaultValue>
                                Населений пункт
                            </option>

                            {settlements?.map((el, index) => {
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
                                    className={styles.dataPicker}
                                    placeholderText='Виберіть дату'
                                    dateFormat='dd.MM.yyyy'
                                />
                            )}
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

export default NovaPostBlock;
