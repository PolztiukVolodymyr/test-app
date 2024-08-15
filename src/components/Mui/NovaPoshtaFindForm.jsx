import { useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { YupNovaPoshtaSchema } from "../../schemas/yupNovaPoshtaShema";
import { DevTool } from "@hookform/devtools";
import { getNovaPoshtaData } from "../../services/novaPoshta";

const NovaPoshtaFindForm = ({ setNovaPostaData }) => {
    const form = useForm({
        defaultValues: {
            city: "",
            departmentNumber: "",
        },
        resolver: yupResolver(YupNovaPoshtaSchema),
    });

    const onSubmit = async (data) => {
        // console.log("Form submited", data);
        const body = {
            apiKey: "8d677609f6e47ce83929374b3afab572",
            modelName: "AddressGeneral",
            calledMethod: "getWarehouses",
            methodProperties: {
                CityName: data.city,
                Page: "1",
                Limit: "50",
                Language: "UA",
                WarehouseId: data.departmentNumber,
            },
        };
        const result = await getNovaPoshtaData(body);
        setNovaPostaData(result);
        // console.log("result:", result);
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
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} width={400}>
                    <TextField
                        label='Місто'
                        type='text'
                        placeholder='Львів'
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />
                    <TextField
                        label='Номер відділення'
                        type='text'
                        placeholder='10'
                        {...register("departmentNumber")}
                        error={!!errors.departmentNumber}
                        helperText={errors.departmentNumber?.message}
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
