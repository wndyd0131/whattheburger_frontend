import styles from "../styles/common/Modal.module.css";

const Modal = ({height, width, flexDirection, children}) => {
  return (
    <div className={styles.overlay}>
      <div 
        className={styles.modal}
        style={{height, width, flexDirection}}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;