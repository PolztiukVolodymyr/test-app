"use client";

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
// import { regionData } from "../../data/regionData";
import {
    getCityDepartmentsByString,
    getSettlementByString,
} from "../../helpers/getRegionsNovapost";
import { YupNovapostBlockSchema } from "../../schemas/yupNovapostBlockSchema";

import styles from "./Novapost.module.scss";

const NovaPostBlock = () => {
    const initialValues = {
        defaultValues: {
            name: "",
            email: "",
            city: "",
            department: "",
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

    // const [regions, setRegions] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [cities, setCities] = useState([]);

    // console.log("errors: ", errors);
    // console.log("currentRegion: ", getValues("region"));

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    // useEffect(() => {
    //     async function fetchData() {
    //         const arr = await getRegionsArray();
    //         setRegions(arr);
    //     }
    //     fetchData();
    // }, []);

    const onSubmit = (data) => {
        console.log("NovapostBlockFormData:", data);
    };

    const onCityNameChange = async (event) => {
        const response = await getSettlementByString(event.target.value);
        setCities(response);
        setValue("city", event.target.value, { shouldValidate: true });

        // console.log("Response:", response);
    };

    const onDepartsmentChange = async (event) => {
        const currentCity = getValues("city");

        const response = await getCityDepartmentsByString(
            currentCity,
            event.target.value
        );

        setDepartments(response);
        setValue("department", event.target.value, { shouldValidate: true });

        // console.log("ResponseDepartments:", response);
    };

    console.log("departments:", departments);

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
                        <p className={styles.error}>{errors.city?.message}</p>
                        <input
                            list='city'
                            type='text'
                            {...register("city")}
                            onChange={onCityNameChange}
                            placeholder='Виберіть місто'
                            autoComplete='off'
                            className={styles.input}
                        />
                        <datalist id='city'>
                            {cities?.map((el) => {
                                return (
                                    <option
                                        key={el}
                                        value={el}
                                        className={styles.input}
                                    >
                                        {el}
                                    </option>
                                );
                            })}
                        </datalist>
                    </div>
                    <div className={styles.inputWrap}>
                        <p className={styles.error}>
                            {errors.department?.message}
                        </p>
                        <input
                            list='department'
                            type='text'
                            {...register("department")}
                            onChange={onDepartsmentChange}
                            placeholder='Виберіть відділення'
                            autoComplete='off'
                            className={styles.input}
                        />
                        <datalist id='department'>
                            {departments?.map((el) => {
                                return (
                                    <option
                                        key={el}
                                        value={el}
                                        className={styles.input}
                                    >
                                        {el}
                                    </option>
                                );
                            })}
                        </datalist>
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

//   <div className={styles.inputWrap}>
//       <p className={styles.error}>{errors.region?.message}</p>

//       <select
//           {...register("region")}
//           onChange={onRegionChange}
//           className={
//               getValues("region")
//                   ? styles.input
//                   : `${styles.input} ${styles.selectNottouched}`
//           }
//       >
//           <option value='' disabled defaultValue hidden>
//               Область
//           </option>
//           {regions?.map((el, index) => {
//               return (
//                   <option
//                       key={index}
//                       value={el.description}
//                       className={styles.input}
//                   >
//                       {el.description}
//                   </option>
//               );
//           })}
//       </select>
//   </div>;

//   <div className={styles.inputWrap}>
//       <p className={styles.error}>{errors.settlement?.message}</p>
//       <select
//           {...register("settlement")}
//           className={
//               getValues("settlement")
//                   ? styles.input
//                   : `${styles.input} ${styles.selectNottouched}`
//           }
//       >
//           <option value='' disabled defaultValue>
//               Населений пункт
//           </option>

//           {settlements?.map((el, index) => {
//               return (
//                   <option key={index} value={el} className={styles.input}>
//                       {el}
//                   </option>
//               );
//           })}
//       </select>
//   </div>;

//    const onRegionChange = async (event) => {
//        setSettlements([]);
//        // console.log("event.target.value:", event.target.value);
//        let currentRegionId = regions.find(
//            (el) => el.description === event.target.value
//        ).id;
//        setValue("region", event.target.value, { shouldValidate: true });
//        // console.log("currentRegionId:", currentRegionId);
//        const response = await getSettlementById(currentRegionId);
//        setSettlements(response);

//        // console.log("responseSettles:", response);
//    };