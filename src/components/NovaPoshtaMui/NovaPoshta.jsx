import { useState } from "react";
import NovaPoshtaFindForm from "./NovaPoshtaFindForm";
import DepartmentsList from "./DepartmentsList";
import PaginationComponent from "./PaginationComponent";

const NovaPoshta = () => {
    const [novaPostaData, setNovaPostaData] = useState({});
    const [pageNumber, setPageNumber] = useState("1");
    const [city, setCity] = useState("");
    const [departmentNumber, setDepartmentNumber] = useState("");

    // console.log("novaPostaData:", novaPostaData);
    // console.log("pageNumberMAIN:", pageNumber);

    return (
        <>
            <h2>Find Nova Poshta departments (Mui components)</h2>
            <NovaPoshtaFindForm
                setNovaPostaData={setNovaPostaData}
                city={city}
                setCity={setCity}
                departmentNumber={departmentNumber}
                setDepartmentNumber={setDepartmentNumber}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
            />
            <DepartmentsList novaPostaData={novaPostaData} />
            <PaginationComponent
                novaPostaData={novaPostaData}
                setNovaPostaData={setNovaPostaData}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                city={city}
                departmentNumber={departmentNumber}
            />
        </>
    );
};

export default NovaPoshta;
