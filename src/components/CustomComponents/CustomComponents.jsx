import { NavLink } from "react-router-dom";
import ControlForm from "../HookForm/ControlForm";

const CustomComponents = () => {
    // const [selectedItem, setSelectedItem] = useState(null);

    return (
        <>
            <NavLink to='/'>Home</NavLink>

            <ControlForm />
        </>
    );
};

export default CustomComponents;
