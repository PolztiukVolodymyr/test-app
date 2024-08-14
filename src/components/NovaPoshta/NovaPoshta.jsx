import { useState } from "react";
import NovaPoshtaFindForm from "../../components/Mui/NovaPoshtaFindForm";
import DepartmentsList from "../../components/Mui/DepartmentsList";

const NovaPoshta = () => {
    // const [page, setPage] = useState("1");
    const [novaPostaData, setNovaPostaData] = useState({});
    console.log("novaPostaData:", novaPostaData);
    return (
        <>
            <h2>Find Nova Poshta departments (Mui components)</h2>
            <NovaPoshtaFindForm setNovaPostaData={setNovaPostaData} />
            <DepartmentsList novaPostaData={novaPostaData} />
        </>
    );
};

export default NovaPoshta;
