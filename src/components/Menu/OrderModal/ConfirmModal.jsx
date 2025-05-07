import { useContext } from "react";
import Modal from "../../Modal";
import { MenuContext } from "../../../contexts/MenuContext";

const ConfirmModal = ({setConfirmModalOpened}) => {

  const {
    setCustomRules,
    setCurrentIngredients,
    setSelectedProductIdx
  } = useContext(MenuContext);

  const modalStyle = {
    height: 130,
    width: 400,
    flexDirection: "column"
  }

  const handleConfirmCloseButton = () => {
    setConfirmModalOpened(false);
    setSelectedProductIdx(null);
    setCustomRules([]);
    setCurrentIngredients({totalExtraPrice: 0, ingredients: []});
  }

  return (
    <Modal
      height={modalStyle.height}
      width={modalStyle.width}
      flexDirection={modalStyle.flexDirection}
      position={modalStyle.position}
    >
      <div className="flex flex-grow justify-center items-center">
        <h3>Are you sure you want to cancel order?</h3>
      </div>
      <div className="flex flex-grow justify-center items-center">
        <button onClick={() => handleConfirmCloseButton()}><strong>Yes</strong></button>
        <button onClick={() => setConfirmModalOpened(false)}><strong>No</strong></button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;