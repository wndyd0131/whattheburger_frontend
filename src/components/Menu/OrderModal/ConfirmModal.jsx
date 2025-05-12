import { useContext } from "react";
import Modal from "../../Modal";
import { MenuContext } from "../../../contexts/MenuContext";

const ConfirmModal = ({setConfirmModalOpened, message, handlerFunction}) => {

  const modalStyle = {
    height: 130,
    width: 400,
    flexDirection: "column"
  }

  return (
    <Modal
      height={modalStyle.height}
      width={modalStyle.width}
      flexDirection={modalStyle.flexDirection}
      position={modalStyle.position}
    >
      <div className="flex flex-grow justify-center items-center">
        <h3>{message}</h3>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <button onClick={() => handlerFunction()}><strong>Yes</strong></button>
        <button onClick={() => setConfirmModalOpened(false)}><strong>No</strong></button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;