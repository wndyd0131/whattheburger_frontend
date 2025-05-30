import { useContext, useState } from "react";
import Modal from "../../Modal";
import ConfirmModal from "./ConfirmModal";
import OrderSummary from "./OrderSummary";
import OrderCustomize from "./OrderCustomize";
import { MenuContext } from "../../../contexts/MenuContext";
import { ACTIONS } from "../../../reducers/Menu/actions";
import { OrderContext } from "./contexts/OrderContext";
import { CloseButton } from "../../../svg/Utils";

const OrderModal = () => {

  const modalStyle = {
    flexDirection: "row",
    position: "relative"
  }

  const {
    setSelectedProduct,
    dispatchOption,
    optionState
  } = useContext(MenuContext);

  const [isCustomizeDone, setIsCustomizeDone] = useState(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const confirmModalMessage = "Are you sure you want to cancel order?";

  const handleClickCloseButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmCloseButton = () => {
    setConfirmModalOpened(false);
    setSelectedProduct(null);
    dispatchOption({
      type: ACTIONS.INIT_SELECTION
    })
  }

  return (
    <OrderContext.Provider
      value={{
        setSelectedProduct: setSelectedProduct,
        dispatchOption: dispatchOption,
        optionState: optionState,
        isCustomizeDone: isCustomizeDone,
        setIsCustomizeDone: setIsCustomizeDone
      }}
    >
    <Modal
      height={modalStyle.height}
      width={modalStyle.width}
      flexDirection={modalStyle.flexDirection}
      position={modalStyle.position}
    >
      <div className="flex absolute justify-center items-center rounded-full top-2 right-2 w-[30px] h-[30px] bg-gray-200 cursor-pointer" onClick={() => handleClickCloseButton()}>
        <CloseButton/>
      </div>
      <OrderSummary/>
      {!isCustomizeDone && (
        <OrderCustomize/>
      )}
    </Modal>
    {confirmModalOpened && (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmCloseButton}/>
    )}
    </OrderContext.Provider>
  );
}

export default OrderModal;