import { useState } from "react";
// import ModalUlbi from "../components/ModalUlbi/ModalUlbi";
import ModalTest from "../components/ModalTest/ModalTest";
import SimpleModal from "../components/SimpleModal/SimpleModal";
// import SomeContent from "../components/SomeContent/SomeContent";
import ReactModal from "../components/ReactModal/ReactModal";
import Form from "../components/Form/Form";
import FormUp from "../components/Form/FormUp";
import FormikForm from "../components/FormikForm/FormikForm";
// import HoockForm from "../components/HookForm/HookForm";
import YupHoockForm from "../components/HookForm/YupHookForm";
import styles from "./App.module.scss";

function App() {
    // const [modalActiveUL, setModalActiveUL] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const [isSipleModalOpen, setSipleModalOpen] = useState(false);
    const [isReactModalOpen, setReactModalOpen] = useState(false);
    const [isReactModalOpenH, setReactModalOpenH] = useState(false);

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
                <h3>Test app</h3>
                <div className={styles.formWrap}>{/* <Form /> */}</div>

                {/* <button onClick={() => setModalActiveUL(true)}>ModalUlbi</button> */}
                <button onClick={openModal}>Custom Modal</button>
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
                    R_Modal & FormikForm
                </button>

                <button
                    className='modal-show-button'
                    onClick={() => setReactModalOpenH(true)}
                >
                    R_Modal & HookForm
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
                <h3>ModalTransition & DatePicker</h3>
                <div className={styles.formWrap}>
                    <Form closeModal={() => setSipleModalOpen(false)} />
                </div>
            </SimpleModal>
            <ReactModal
                active={isReactModalOpen}
                closeModal={() => setReactModalOpen(false)}
            >
                <button onClick={() => setReactModalOpen(false)}>+</button>
                <h3>ReactModal & FormikForm</h3>

                <div className={styles.formWrap}>
                    <FormikForm
                        isOpen={isReactModalOpen}
                        closeModal={() => setReactModalOpen(false)}
                    />
                </div>
            </ReactModal>

            <ReactModal
                active={isReactModalOpenH}
                closeModal={() => setReactModalOpenH(false)}
            >
                <button onClick={() => setReactModalOpenH(false)}>+</button>
                <h3>ReactModal & HoockForm</h3>

                <div className={styles.formWrap}>
                    {/* <HoockForm
                        isOpen={isReactModalOpen}
                        closeModal={() => setReactModalOpenH(false)}
                    /> */}
                    <YupHoockForm
                        isOpen={isReactModalOpen}
                        closeModal={() => setReactModalOpenH(false)}
                    />
                </div>
            </ReactModal>

            {/* <ModalUlbi active={modalActiveUL} setActive={setModalActiveUL} /> */}
            {shouldRender && (
                <ModalTest active={modalActive} closeModal={closeModal}>
                    <button onClick={closeModal}>+</button>
                    <h4>Custom Modal & Custom Validation</h4>
                    {/* <SomeContent isOpen={modalActive} /> */}
                    <div className={styles.formWrap}>
                        <FormUp closeModal={closeModal} />
                    </div>
                </ModalTest>
            )}
        </div>
    );
}

export default App;
