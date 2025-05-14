import { useState, useContext } from "react";
import ConfirmModal from "./ConfirmModal";
import { MenuContext } from "../../../contexts/MenuContext";
import ProductInfo from "./ProductInfo";
import OrderSummaryDetail from "./OrderSummaryDetail";
import DecisionFooter from "./DecisionFooter";
import { ACTIONS } from "../../../reducers/Menu/actions";

const OrderSummary = () => {

  const {
    dispatchOrder
  } = useContext(MenuContext);

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const confirmModalMessage = "Return to default setting?";

  const handleConfirmDefaultButton = () => {
    dispatchOrder({
      type: ACTIONS.LOAD_DEFAULT
    })
    setConfirmModalOpened(false);
  }

  return (
    <>
    {confirmModalOpened && 
    (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmDefaultButton}/>
    )}
    <div className="flex flex-col justify-between border-r-1 border-r-[rgb(197,197,197)] basis-1/4 bg-white">
      <ProductInfo/>
      <OrderSummaryDetail setConfirmModalOpened={setConfirmModalOpened}/>
      <DecisionFooter/>
    </div>
    </>
  );
}

export default OrderSummary;