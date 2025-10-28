import { useContext, useState } from "react";
import { MenuContext } from "../../../contexts/MenuContext";
import { OPTION_ACTIONS } from "../../../reducers/Option/actions";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { CartContext } from "../../Cart/contexts/CartContext";

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
    if (mode === "cart") {
      setSelectedCartIdx(null);
    }
    dispatchRoot({
      type: OPTION_ACTIONS.INIT_SELECTION
    })
  }

    return (
      <ModalContext.Provider value={{
        modalData: modalData,
        mode: mode
      }}>
      <Modal
        flexDirection={modalStyle.flexDirection}
        position={modalStyle.position}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex absolute justify-center items-center rounded-full top-4 right-4 w-10 h-10 bg-white shadow-lg hover:shadow-xl cursor-pointer z-10 border border-gray-200 hover:bg-gray-50 transition-all duration-200"
          onClick={() => handleClickCloseButton()}
        >
          <CloseButton/>
        </motion.button>
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