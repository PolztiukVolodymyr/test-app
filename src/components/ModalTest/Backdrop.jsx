import Portal from "./Portal";
import styles from "./ModalTest.module.scss";

const Backdrop = ({ active, closeModal, children }) => {
  return (
    <Portal>
      <div
        className={
          active ? styles.backdrop + " " + styles.active : styles.backdrop
        }
        onClick={closeModal}
      >
        {children}
      </div>
    </Portal>
  );
};

export default Backdrop;
