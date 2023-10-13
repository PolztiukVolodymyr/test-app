import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    const rootModal = document.getElementById("modal");
    return createPortal(children, rootModal);
};

export default Portal;
