import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { emailRegExp } from "../../helpers/regularExp";
import styles from "./HookForm.module.scss";

const HookForm = () => {
    const form = useForm();
    const { register, control, handleSubmit } = form;

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
                <input
                    id='userName'
                    type='text'
                    {...register("userName", {
                        required: "Username is required",
                    })}
                />
                <label htmlFor='email' className={styles.label}>
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    {...register("email", {
                        pattern: {
                            value: emailRegExp,
                            message: "invalid email",
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
