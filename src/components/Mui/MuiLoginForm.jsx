import { useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const MuiLoginForm = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (data) => {
        console.log("Form submited", data);
    };

    const { register, handleSubmit, formState, control, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
            <h2>Mui Login Form</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={400}>
                    <TextField
                        label='Email'
                        type='email'
                        {...register("email", {
                            required: "Email is required",
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        {...register("password", {
                            required: "Password is required",
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Login
                    </Button>
                </Stack>
            </form>
            <DevTool control={control} />
        </>
    );
};

export default MuiLoginForm;
