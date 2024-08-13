import { useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { YupNovaPoshtaSchema } from "../../schemas/yupNovaPoshtaShema";
import { DevTool } from "@hookform/devtools";
import { getNovaPoshtaData } from "../../services/novaPoshta";

const NovaPoshtaFindForm = () => {
    const form = useForm({
        defaultValues: {
            city: "",
            departmentsNumber: "",
        },
        resolver: yupResolver(YupNovaPoshtaSchema),
    });

    const onSubmit = async (data) => {
        // console.log("Form submited", data);
        const body = {
            apiKey: "8d677609f6e47ce83929374b3afab572",
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
                CityName: data.city,
                WarehouseId: data.departmentsNumber,
                Limit: "50",
                Language: "UA",
            },
        };
        const result = await getNovaPoshtaData(body);
        console.log("result:", result);
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
            <h2>Find Nova Poshta departments Mui Form</h2>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={400}>
                    <TextField
                        label='City'
                        type='text'
                        placeholder='Львів'
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />
                    <TextField
                        label='Number of departments'
                        type='text'
                        placeholder='10'
                        {...register("departmentsNumber")}
                        error={!!errors.departmentsNumber}
                        helperText={errors.departmentsNumber?.message}
                    />
                    <Button type='submit' variant='contained' color='primary'>
                        Find
                    </Button>
                </Stack>
            </form>
            <DevTool control={control} />
        </>
    );
};

export default NovaPoshtaFindForm;
