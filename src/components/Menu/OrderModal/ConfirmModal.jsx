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
      <div className="flex flex-grow justify-center items-center text-lg">
        <p>{message}</p>
      </div>
      <div className="flex flex-grow justify-center items-center gap-10">
        <button className="flex border-1 justify-center items-center border-[#FE7800] rounded-sm h-[35px] w-[50px] cursor-pointer" onClick={() => handlerFunction()}><strong>Yes</strong></button>
        <button className="flex border-1 justify-center items-center border-[#FE7800] rounded-sm h-[35px] w-[50px] cursor-pointer" onClick={() => setConfirmModalOpened(false)}><strong>No</strong></button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;