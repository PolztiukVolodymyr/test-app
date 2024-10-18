import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NovaPostBlock from "../components/NovaPoshtaMui/NovaPostBlock";
import CustomSelect from "../components/NovaPoshtaMui/CustomSelect";

const HomePage = lazy(() => import("../components/HomePage/HomePage"));
const NovaPoshtaFinder = lazy(() =>
    import("../components/NovaPoshtaMui/NovaPoshtaFinder")
);

function App() {
    return (
        <Suspense fallback={"loading!"}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/novapost' element={<NovaPoshtaFinder />} />
                <Route path='/novapostBlock' element={<NovaPostBlock />} />
                <Route path='/customSelect' element={<CustomSelect />} />
            </Routes>
        </Suspense>
    );
}

export default App;
