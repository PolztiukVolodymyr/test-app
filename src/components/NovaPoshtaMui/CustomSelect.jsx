import { useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CustomSelect.module.scss";

// const options = ["one", "two", "three", "four"];

const CustomSelect = () => {
    const [isOpen, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggling = () => setOpen(!isOpen);
    const onOptionClick = (value) => {
        setSelectedOption(value.target.innerText);
        setOpen(false);
        // console.log("value:", value.target.innerText);
    };

    return (
        <>
            <NavLink to='/'>Home</NavLink>
            <div className={styles.wrapper}>
                <div onClick={toggling} className={styles.titleBox}>
                    {selectedOption || "Select option"}
                </div>
                {isOpen && (
                    <div className={styles.optionsBox}>
                        <div className={styles.option} onClick={onOptionClick}>
                            one
                        </div>
                        <div className={styles.option} onClick={onOptionClick}>
                            two
                        </div>
                        <div className={styles.option} onClick={onOptionClick}>
                            three
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomSelect;
