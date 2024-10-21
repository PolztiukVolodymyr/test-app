import { useState } from "react";
import { NavLink } from "react-router-dom";
import SelectComponent from "../NovaPoshtaMui/SelectComponent";
import { options } from "../../data/options";

const CustomComponents = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    return (
        <div>
            <NavLink to='/'>Home</NavLink>
            <SelectComponent
                placeholder='Select a car'
                selected={selectedItem}
                options={options}
                onChange={(selection) => setSelectedItem(selection)}
            />
        </div>
    );
};

export default CustomComponents;
