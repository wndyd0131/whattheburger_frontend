import styles from "../styles/common/Modal.module.css";

const Modal = ({height, width, flexDirection, position, children}) => {
  return (
    <div className="flex fixed justify-center items-center w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <div 
        className="flex relative w-full h-full max-w-[90%] max-h-[80%] rounded-2xl bg-white overflow-auto"
        style={{height, width, flexDirection, position}}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;