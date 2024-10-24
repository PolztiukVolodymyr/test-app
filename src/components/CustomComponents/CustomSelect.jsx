import { useState, useEffect, useRef } from "react";
import { getRegionsArray } from "../../helpers/getRegionsNovapost";

import styles from "./CustomSelect.module.scss";

// const optionsSecond = ["four", "five", "six", "seven"];

const CustomSelect = ({ value, setValue, isDropdownOpen, setDropdownOpen }) => {
    // const [options, setOptions] = useState(["one", "two", "three"]);

    const [regions, setRegions] = useState([]);

    const wrapRef = useRef(); // Reference to the custom select element
    const itemRef = useRef();

    const toggling = () => setDropdownOpen(!isDropdownOpen);

    const onOptionClick = (value) => {
        setValue(value.target.innerText);
        setDropdownOpen(false);
        //
        // console.log("text:", wrapRef.current.innerText);
    };

    // const addOptions = () => {
    //     setRegions([...regions, ...optionsSecond]);
    // };

    // console.log("regions:", regions);

    useEffect(() => {
        async function fetchData() {
            const arr = await getRegionsArray();
            setRegions(arr);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });

    return (
        <>
            <div className={styles.wrapper} ref={wrapRef}>
                <div onClick={toggling} className={styles.titleBox}>
                    {value || "Select option"}
                </div>
                {isDropdownOpen && (
                    <ul className={styles.optionsList}>
                        {regions?.map((option, index) => (
                            <li
                                key={index}
                                ref={itemRef}
                                className={styles.optionItem}
                                onClick={onOptionClick}
                            >
                                {option.description}
                            </li>
                        ))}
                        {/* {regions.length > 24 && (
                            <button
                                onClick={addOptions}
                                className={styles.buttonMore}
                            >
                                Добавити
                            </button>
                        )} */}
                    </ul>
                )}
            </div>
        </>
    );
};

export default CustomSelect;
