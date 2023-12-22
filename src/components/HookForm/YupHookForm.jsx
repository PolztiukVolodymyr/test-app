import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./HookForm.module.scss";

const schema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Email format is not valid")
        .required("Email is required"),
    comment: yup.string().required("Comment is required"),
});

const YupHookForm = () => {
    const initialValues = {
        defaultValues: {
            username: "",
            email: "",
            comment: "",
        },
        resolver: yupResolver(schema),
    };

    const form = useForm(initialValues);

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <div>
            <h2>Yup Hook Form</h2>

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

export default YupHookForm;
