import { Transition } from "react-transition-group";
import Portal from "./Portal";
import "./SimpleModal.css";
// import styles from "./SimpleModal.module.scss";

const SimpleModal = ({ isOpen, onClose, children }) => {
    const onBackdropClick = (event) => {
        if (event.target.classList.contains("backdrop")) onClose();
    };
    return (
        <Portal>
            <Transition in={isOpen} timeout={500} unmountOnExit={true}>
                {(state) => (
                    <div
                        onClick={onBackdropClick}
                        className={`backdrop backdrop--${state}`}
                    >
                        <div className='modalContent'>
                            <button className='modalCloseBtn' onClick={onClose}>
                                +
                            </button>
                            {children}
                        </div>
                    </div>
                )}
            </Transition>
        </Portal>
    );
};

export default SimpleModal;
