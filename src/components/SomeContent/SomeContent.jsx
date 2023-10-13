import { useEffect } from "react";

const SomeContent = ({ isOpen }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <div>
            <h2>SomeContent</h2>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
                dolorum dolore vero eligendi cum iusto ea quam perspiciatis
                veritatis rem cupiditate a in, aliquam pariatur.
            </p>
        </div>
    );
};

export default SomeContent;
