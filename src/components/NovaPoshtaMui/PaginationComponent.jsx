import { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { getNovaPoshtaData } from "../../services/novaPoshta";
import { setNovaPostBodyValues } from "../../helpers/setNovaPoshtaBodyValues";

const PaginationComponent = ({
    novaPostaData,
    setNovaPostaData,
    pageNumber,
    setPageNumber,
    city,
    departmentNumber,
}) => {
    const { info } = novaPostaData;
    // console.log("novaPostaDataPagination:", data);
    // console.log("pageNumberPagination:", pageNumber);
    const [numberOfPages, setNumberOfPages] = useState(0);

    // console.log("numberOfPages:", numberOfPages);

    useEffect(() => {
        if (info) {
            const { totalCount } = info;
            setNumberOfPages(Math.ceil(totalCount / 50));
        }
    }, [info]);

    const handlePageChange = async (event, value) => {
        // console.log("value:", value);
        setPageNumber(value);

        const body = setNovaPostBodyValues(city, value, departmentNumber);
        const result = await getNovaPoshtaData(body);

        await setNovaPostaData(result);
    };

    if (numberOfPages < 2) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
            }}
            mb={2}
        >
            <Pagination
                count={numberOfPages}
                page={Number(pageNumber)}
                onChange={handlePageChange}
                shape='rounded'
                variant='outlined'
            />
        </Box>
    );
};

export default PaginationComponent;
