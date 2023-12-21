import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { emailRegExp } from "../../helpers/regularExp";
import { getDefaultValuesFromApi } from "../../helpers/fetchFakeApi";
import styles from "./HookForm.module.scss";

const HookForm = () => {
    const form = useForm({
        defaultValues: getDefaultValuesFromApi,
    });
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;

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
                <p className={styles.error}>{errors.userName?.message}</p>
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
                <p className={styles.error}>{errors.email?.message}</p>
                <input
                    id='email'
                    type='email'
                    {...register("email", {
                        pattern: {
                            value: emailRegExp,
                            message: "invalid email",
                        },
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
                                    "Only for dogs !"
                                );
                            },
                            notBlackList: (fielValue) => {
                                return (
                                    !fielValue.endsWith("i.ua") ||
                                    "This domen is not supported"
                                );
                            },
                        },
                    })}
                />
                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default HookForm;
