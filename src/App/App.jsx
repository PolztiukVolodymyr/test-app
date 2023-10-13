import { useState } from "react";
// import ModalUlbi from "../components/ModalUlbi/ModalUlbi";
import ModalTest from "../components/ModalTest/ModalTest";
import SimpleModal from "../components/SimpleModal/SimpleModal";
import SomeContent from "../components/SomeContent/SomeContent";
import ReactModal from "../components/ReactModal/ReactModal";
// import Form from "../Form/Form";
// import FormUp from "../components/Form/FormUp";
import FormikForm from "../components/FormikForm/FormikForm";
import styles from "./App.module.scss";

function App() {
    // const [modalActiveUL, setModalActiveUL] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const [isSipleModalOpen, setSipleModalOpen] = useState(false);
    const [isReactModalOpen, setReactModalOpen] = useState(false);

    function openModal() {
        setShouldRender(true);
        setTimeout(function () {
            setModalActive(true);
        }, 0);
    }

    function closeModal() {
        setModalActive(false);
        setTimeout(function () {
            setShouldRender(false);
        }, 1000);
    }

    return (
        <div className={styles.app}>
            <main>
                <h2>App</h2>
                <div className={styles.formWrap}>{/* <Form /> */}</div>
                {/* <div className={styles.formWrap}>
                    <FormUp />
                </div> */}
                {/* <div className={styles.formWrap}>
                    <Form />
                </div> */}
                <div className={styles.formWrap}>
                    <FormikForm />
                </div>

                {/* <button onClick={() => setModalActiveUL(true)}>ModalUlbi</button> */}
                <button onClick={openModal}>ModalTest</button>

                <button
                    className='modal-show-button'
                    onClick={() => setSipleModalOpen(true)}
                >
                    Modal Transition
                </button>
                <button
                    className='modal-show-button'
                    onClick={() => setReactModalOpen(true)}
                >
                    React Modal
                </button>

                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quam fugit illum minima. Architecto voluptatum debitis,
                    natus dolores ullam non, ut voluptatem repellat minima
                    quisquam deleniti commodi quos! Sapiente, esse quo?
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quam fugit illum minima. Architecto voluptatum debitis,
                    natus dolores ullam non, ut voluptatem repellat minima
                    quisquam deleniti commodi quos! Sapiente, esse quo?
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quam fugit illum minima. Architecto voluptatum debitis,
                    natus dolores ullam non, ut voluptatem repellat minima
                    quisquam deleniti commodi quos! Sapiente, esse quo?
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quo, dolorum dolore vero eligendi cum iusto ea quam
                    perspiciatis veritatis rem cupiditate a in, aliquam
                    pariatur.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quo, dolorum dolore vero eligendi cum iusto ea quam
                    perspiciatis veritatis rem cupiditate a in, aliquam
                    pariatur.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quo, dolorum dolore vero eligendi cum iusto ea quam
                    perspiciatis veritatis rem cupiditate a in, aliquam
                    pariatur.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quo, dolorum dolore vero eligendi cum iusto ea quam
                    perspiciatis veritatis rem cupiditate a in, aliquam
                    pariatur.
                </p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quo, dolorum dolore vero eligendi cum iusto ea quam
                    perspiciatis veritatis rem cupiditate a in, aliquam
                    pariatur.
                </p>
            </main>
            <SimpleModal
                isOpen={isSipleModalOpen}
                onClose={() => setSipleModalOpen(false)}
            >
                <h2>Modal SimpleModalTransition</h2>
                <SomeContent isOpen={isSipleModalOpen} />
            </SimpleModal>
            <ReactModal
                active={isReactModalOpen}
                closeModal={() => setReactModalOpen(false)}
            >
                <h2>This is a modal content ReactModal</h2>
                <SomeContent isOpen={isReactModalOpen} />
                <button onClick={() => setReactModalOpen(false)}>+</button>
            </ReactModal>

            {/* <ModalUlbi active={modalActiveUL} setActive={setModalActiveUL} /> */}
            {shouldRender && (
                <ModalTest active={modalActive} closeModal={closeModal}>
                    <h2>This is a modal content</h2>
                    <SomeContent isOpen={modalActive} />
                    <button onClick={closeModal}>+</button>
                </ModalTest>
            )}
        </div>
    );
}

export default App;
