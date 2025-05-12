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

  const {
    selectedProduct,
    setSelectedProduct,
    setCustomRules,
    currentIngredients, // temporary
    setCurrentIngredients, // temporary
    defaultIngredients, //temporary
    isLoading, //temporary
    customRules,
  } = useContext(MenuContext);

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const confirmModalMessage = "Are you sure you want to cancel order?";

  const handleClickCloseButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmCloseButton = () => {
    setConfirmModalOpened(false);
    setSelectedProduct(null);
    setCustomRules([]);
    setCurrentIngredients({totalExtraPrice: 0, ingredients: []});
  }

  return (
    <>
    <Modal
      height={modalStyle.height}
      width={modalStyle.width}
      flexDirection={modalStyle.flexDirection}
      position={modalStyle.position}
    >
      <div className="close-order-modal-button" onClick={() => handleClickCloseButton()}>
        X
      </div>
      <OrderSummary product={selectedProduct} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients} defaultIngredients={defaultIngredients} isLoading={isLoading}/>
      <OrderCustomize customRules={customRules} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients}/>
    </Modal>
    {confirmModalOpened && (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmCloseButton}/>
    )}
    </>
  );
}

export default OrderModal;