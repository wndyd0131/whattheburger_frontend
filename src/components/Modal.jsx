import styles from "../styles/common/Modal.module.css";

const Modal = ({height, width, flexDirection, position, children}) => {
  return (
    <div className="flex fixed justify-center items-center w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <div 
        className={styles.modal}
        style={{height, width, flexDirection, position}}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;