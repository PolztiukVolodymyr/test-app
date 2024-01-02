import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodShema } from "../../schemas/zodHookFormShema";
import styles from "./HookForm.module.scss";

const ZodHookForm = () => {
    const initialValues = {
        defaultValues: {
            username: "",
            email: "",
            comment: "",
        },
        resolver: zodResolver(zodShema),
    };

    const form = useForm(initialValues);
    const { register, handleSubmit, formState, reset } = form;
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
                    <label htmlFor='comment'>Channel</label>
                    <input type='text' id='comment' {...register("comment")} />
                    <p className={styles.error}>{errors.comment?.message}</p>
                </div>

                <button>Submit</button>
            </form>
        </div>
    );
};

export default ZodHookForm;
