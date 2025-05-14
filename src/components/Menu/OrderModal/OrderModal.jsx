import { useContext, useState } from "react";
import Modal from "../../Modal";
import ConfirmModal from "./ConfirmModal";
import OrderSummary from "./OrderSummary";
import OrderCustomize from "./OrderCustomize";
import { MenuContext } from "../../../contexts/MenuContext";
import { ACTIONS } from "../../../reducers/Menu/actions";

const OrderModal = () => {

  const modalStyle = {
    flexDirection: "row",
    position: "relative"
  }

  const {
    setSelectedProduct,
    setCustomRules,
    dispatchOrder
  } = useContext(MenuContext);

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const confirmModalMessage = "Are you sure you want to cancel order?";

  const handleClickCloseButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmCloseButton = () => {
    setConfirmModalOpened(false);
    setSelectedProduct(null);
    dispatchOrder({
      type: ACTIONS.INIT_SELECTION
    })
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
      <OrderSummary/>
      <OrderCustomize/>
    </Modal>
    {confirmModalOpened && (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmCloseButton}/>
    )}
    </>
  );
}

export default OrderModal;