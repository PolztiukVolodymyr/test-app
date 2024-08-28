import { useEffect, useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { DevTool } from "@hookform/devtools";
import { YupNovaPoshtaSchema } from "../../schemas/yupNovaPoshtaShema";
import { getNovaPoshtaData } from "../../services/novaPoshta";
import { setNovaPostBodyValues } from "../../helpers/setNovaPoshtaBodyValues";

const NovaPoshtaFindForm = ({
    city,
    pageNumber,
    departmentNumber,
    setPageNumber,
    setNovaPostaData,
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

    // onSubmit with useEffect
    // we also have to use useState (to prevent the first fetch)

    // const [didMount, setDidMount] = useState(false);

    // const onSubmit = (data) => {
    //     setCity(data.city);
    //     setDepartmentNumber(data.departmentNumber);
    //     setDidMount(true);

    //     if (data.city !== city) {
    //         setPageNumber("1");
    //     }
    // };

    // useEffect(() => {
    //     if (didMount) {
    //         async function fetchData() {
    //             const body = setNovaPostBodyValues(
    //                 city,
    //                 Number(pageNumber),
    //                 departmentNumber
    //             );

    //             const result = await getNovaPoshtaData(body);
    //             setNovaPostaData(result);
    //         }
    //         fetchData();
    //     }
    // }, [city, pageNumber, departmentNumber, setNovaPostaData, didMount]);

    // onSubmit without useEffect and useState by using interim value

    const onSubmit = async (data) => {
        setCity(data.city);
        setDepartmentNumber(data.departmentNumber);
        let interimValue;

        if (data.city !== city) {
            setPageNumber("1");
            interimValue = "1";
        } else {
            interimValue = pageNumber;
        }

        const body = setNovaPostBodyValues(
            data.city,
            interimValue,
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
