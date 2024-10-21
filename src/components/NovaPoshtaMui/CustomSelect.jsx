import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import styles from "./CustomSelect.module.scss";

const optionsSecond = ["four", "five", "six", "seven"];

const CustomSelect = () => {
    const [isOpen, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState(["one", "two", "three"]);

    const wrapRef = useRef(); // Reference to the custom select element

    const toggling = () => setOpen(!isOpen);

    const onOptionClick = (value) => {
        setSelectedOption(value.target.innerText);
        setOpen(false);
        console.log("wrapRef:", wrapRef);
    };

    const addOptions = () => {
        setOptions([...options, ...optionsSecond]);
    };

    console.log("options:", options);

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    return (
        <>
            <NavLink to='/'>Home</NavLink>
            <div className={styles.wrapper} ref={wrapRef}>
                <div onClick={toggling} className={styles.titleBox}>
                    {selectedOption || "Select option"}
                </div>
                {isOpen && (
                    <div className={styles.optionsBox}>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={styles.option}
                                onClick={onOptionClick}
                            >
                                {option}
                            </div>
                        ))}
                        <button onClick={addOptions}>Добавити</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CustomSelect;
