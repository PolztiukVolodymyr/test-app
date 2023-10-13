import "./ModalUlbi.css";

const ModalUlbi = ({ active, setActive }) => {
  return (
    <div
      onClick={() => setActive(false)}
      className={active ? "backdrop active" : "backdrop"}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={active ? "modalContent activeContent" : "modalContent"}
      >
        <h2>This is a modal content</h2>
      </div>
    </div>
  );
};

export default ModalUlbi;
