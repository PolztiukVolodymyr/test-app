import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NovaPostBlock from "../components/NovaPoshta/NovaPostBlock";
import CustomComponents from "../components/CustomComponents/CustomComponents";

const HomePage = lazy(() => import("../components/HomePage/HomePage"));
const NovaPoshtaFinder = lazy(() =>
    import("../components/NovaPoshta/NovaPoshtaFinder")
);

function App() {
    return (
        <Suspense fallback={"loading!"}>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/novapost' element={<NovaPoshtaFinder />} />
                <Route path='/novapostBlock' element={<NovaPostBlock />} />
                <Route path='/custom' element={<CustomComponents />} />
            </Routes>
        </Suspense>
    );
}

export default App;
