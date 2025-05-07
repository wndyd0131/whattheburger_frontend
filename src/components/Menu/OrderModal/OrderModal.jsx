import { useContext, useState } from "react";
import Modal from "../../Modal";
import ConfirmModal from "./ConfirmModal";
import OrderSummary from "./OrderSummary";
import OrderCustomize from "./OrderCustomize";
import { MenuContext } from "../../../contexts/MenuContext";

const OrderModal = () => {

  const modalStyle = {
    height: 800,
    width: 1400,
    flexDirection: "row",
    position: "relative"
  }

  const [setConfirmModalOpened, confirmModalOpened] = useState(false);

  const handleClickCloseButton = () => {
    setConfirmModalOpened(true);
  }

  return (
    <Modal
      height={modalStyle.height}
      width={modalStyle.width}
      flexDirection={modalStyle.flexDirection}
      position={modalStyle.position}
    >
      {confirmModalOpened && (
        <ConfirmModal setConfirmModalOpened={setConfirmModalOpened}/>
        )}
        <div className="close-order-modal-button" onClick={() => handleClickCloseButton()}>
          X
        </div>
        <OrderSummary product={selectedProductIdx} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients} defaultIngredients={defaultIngredients} isLoading={isLoading}/>
        <OrderCustomize customRules={customRules} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients}/>
    </Modal>
  );
}

export default OrderModal;