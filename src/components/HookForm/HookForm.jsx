import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { emailRegExp } from "../../helpers/regularExp";
// import { getDefaultUsersEmailFromApi } from "../../helpers/fetchFakeApi";
import { isEmailExist } from "../../helpers/fetchFakeApi";
import styles from "./HookForm.module.scss";

const HookForm = () => {
    // const form = useForm({ defaultValues: getDefaultUsersEmailFromApi });
    const initialValues = {
        defaultValues: {
            userName: "",
            email: "",
            social: {
                twitter: "",
                facebook: "",
            },
        },
        mode: "onChange", // mode also can be onBlur, onTouched, all
    };

    const form = useForm(initialValues);
    const { register, control, handleSubmit, formState, watch, reset } = form;
    const { errors, isSubmitting, isSubmitSuccessful } = formState;

    // let isErrors = Object.keys(errors).length > 0;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    const onSubmit = (data) => {
        console.log("Form submited", data);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className={styles.form}
            >
                <label htmlFor='userName' className={styles.label}>
                    Username
                </label>
                {errors.userName && (
                    <p className={styles.error}>{errors.userName?.message}</p>
                )}
                <input
                    id='userName'
                    type='text'
                    {...register("userName", {
                        required: {
                            value: true,
                            message: "Username is required",
                        },
                    })}
                />
                <label htmlFor='email' className={styles.label}>
                    Email
                </label>

                {errors.email && (
                    <p className={styles.error}>{errors.email?.message}</p>
                )}
                <input
                    id='email'
                    type='email'
                    {...register("email", {
                        pattern: {
                            value: emailRegExp,
                            message: "invalid email",
                        },
                        disabled: watch("userName") === "",
                        validate: {
                            notAdmin: (fielValue) => {
                                return (
                                    fielValue !== "admin@mail.ua" ||
                                    "Enter different email !"
                                );
                            },
                            notCat: (fielValue) => {
                                return (
                                    fielValue !== "cat11@mail.ua" ||
                                    "Not for cats !"
                                );
                            },
                            notBlackList: (fielValue) => {
                                return (
                                    !fielValue.endsWith("i.ua") ||
                                    "This domen is not supported"
                                );
                            },
                            checkFreeEmails: (fielValue) =>
                                isEmailExist(fielValue),
                        },
                    })}
                />
                <label htmlFor='twitter' className={styles.label}>
                    Twitter
                </label>

                <input
                    id='twitter'
                    type='text'
                    {...register("social.twitter")}
                />
                <label htmlFor='facebook' className={styles.label}>
                    Facebook
                </label>

                <input
                    id='facebook'
                    type='text'
                    {...register("social.facebook")}
                />
                <button
                    disabled={
                        // isErrors ||
                        isSubmitting
                    }
                >
                    Submit
                </button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default HookForm;
