import { useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { YupNovaPoshtaSchema } from "../../schemas/yupNovaPoshtaShema";
import { DevTool } from "@hookform/devtools";
import { getNovaPoshtaData } from "../../services/novaPoshta";
import { setNovaPostBodyValues } from "../../helpers/setNovaPoshtaBodyValues";

const NovaPoshtaFindForm = ({
    setNovaPostaData,
    pageNumber,
    setPageNumber,
    city,
    setCity,
    setDepartmentNumber,
}) => {
    const form = useForm({
        defaultValues: {
            city: "",
            departmentNumber: "",
        },
        resolver: yupResolver(YupNovaPoshtaSchema),
    });

    const { register, handleSubmit, formState, control, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    // useEffect(() => {
    //     if (data.city !== city) {
    //         setPageNumber("1");
    //     }
    // }, [city, setPageNumber]);

    const onSubmit = async (data) => {
        setCity(data.city);
        setDepartmentNumber(data.departmentNumber);
        let intermediateValue;

        if (data.city !== city) {
            setPageNumber("1");
            intermediateValue = "1";
        } else {
            intermediateValue = pageNumber;
        }

        const body = setNovaPostBodyValues(
            data.city,
            intermediateValue,
            data.departmentNumber
        );

        const result = await getNovaPoshtaData(body);
        setNovaPostaData(result);
    };

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
