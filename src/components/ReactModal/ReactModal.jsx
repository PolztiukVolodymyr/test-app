import Modal from "react-modal";
import "./ReactModal.css";

const ReactModal = ({ active, closeModal, children }) => {
    return (
        <Modal
            isOpen={active}
            overlayClassName={"backdrop"}
            className={"modalContent"}
            closeTimeoutMS={700}
            onRequestClose={closeModal}
            ariaHideApp={false}
        >
            {children}
        </Modal>
    );
};

export default ReactModal;
