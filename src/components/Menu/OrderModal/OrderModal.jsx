import { useContext, useState } from "react";
import Modal from "../../Modal";
import ConfirmModal from "./ConfirmModal";
import OrderSummary from "./OrderSummary";
import OrderCustomize from "./OrderCustomize";
import { MenuContext, useMenuContext } from "../../../contexts/MenuContext";
import { OPTION_ACTIONS } from "../../../reducers/Option/actions";
import { CloseButton } from "../../../svg/Utils";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { CartContext } from "../../Cart/contexts/CartContext";
import { ModalContext } from "./contexts/ModalContext";

const OrderModal = ({mode}) => {

  const modalStyle = {
    flexDirection: "row",
    position: "relative"
  }

  const menuContext = useContext(MenuContext);
  const cartContext = useContext(CartContext);
  
  const getModalDataByMode = (mode) => {
    switch(mode) {
      case "menu":
        return {
          selectedProduct: menuContext.selectedProduct,
          setSelectedProduct: menuContext.setSelectedProduct
        };
      case "cart":
        return {
          selectedProduct: cartContext.selectedProduct,
          setSelectedProduct: cartContext.setSelectedProduct,
          selectedCartIdx: cartContext.selectedCartIdx,
          setSelectedCartIdx: cartContext.setSelectedCartIdx
        };
      default:
        return {};
    }
  }

  const modalData = getModalDataByMode(mode);

  const {
    selectedProduct,
    setSelectedProduct,
    selectedCartIdx,
    setSelectedCartIdx
  } = modalData;
  
  const {
    reducer: {
      dispatchRoot,
      rootState: {
        optionState,
        orderState
      }
    }
  } = useContext(LayoutContext);

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const confirmModalMessage = mode === "menu" ? "Are you sure you want to cancel order?" : "Are you sure you want to cancel modification?";

  const handleClickCloseButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmCloseButton = () => {
    setConfirmModalOpened(false);
    setSelectedProduct(null);
    console.log("MODE!", mode);
    if (mode === "cart") {
      setSelectedCartIdx(null);
    }
    dispatchRoot({
      type: OPTION_ACTIONS.INIT_SELECTION
    })
  }

  console.log("OPTION_STATE", optionState);
    return (
      <ModalContext.Provider value={{
        modalData: modalData,
        mode: mode
      }}>
      <Modal
        height={modalStyle.height}
        width={modalStyle.width}
        flexDirection={modalStyle.flexDirection}
        position={modalStyle.position}
      >
        <div className="flex absolute justify-center items-center rounded-full top-2 right-2 w-[30px] h-[30px] bg-gray-300 cursor-pointer" onClick={() => handleClickCloseButton()}>
          <CloseButton/>
        </div>
        <OrderSummary/>
        <OrderCustomize/>
      </Modal>
      {confirmModalOpened && (
        <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmCloseButton}/>
      )}
      </ModalContext.Provider>
    );
}

export default OrderModal;