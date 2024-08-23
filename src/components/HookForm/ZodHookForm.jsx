import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { zodShema } from "../../schemas/zodHookFormShema";
import styles from "./HookForm.module.scss";

const petsArr = ["cat", "dog"];

const ZodHookForm = () => {
    const initialValues = {
        defaultValues: {
            username: "",
            email: "",
            channel: "",
        },
        resolver: zodResolver(zodShema(petsArr)),
        // context: contextArr,
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset, control } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmit = (data) => {
        console.log(data);
    };
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);
    return (
        <div>
            <h2>Zod Hook Form</h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.form}
                noValidate
            >
                <div className={styles.wrapInput}>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        {...register("username")}
                    />
                    <p className={styles.error}>{errors.username?.message}</p>
                </div>

                <div className={styles.wrapInput}>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' {...register("email")} />
                    <p className={styles.error}>{errors.email?.message}</p>
                </div>

                <div className={styles.wrapInput}>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel' {...register("channel")} />
                    <p className={styles.error}>{errors.channel?.message}</p>
                </div>

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    );
};

export default ZodHookForm;
