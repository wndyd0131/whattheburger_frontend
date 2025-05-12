import MenuImageContainer from "../../MenuImageContainer";
import { useState, useContext } from "react";
import ConfirmModal from "./ConfirmModal";
import { MenuContext } from "../../../contexts/MenuContext";
import ProductInfo from "./ProductInfo";
import OrderSummaryDetail from "./OrderSummaryDetail";
import DecisionFooter from "./DecisionFooter";
import { ACTIONS } from "../../../pages/Menu";

const OrderSummary = () => {

  const {
    selectedProduct,
    currentIngredients, // temporary
    setCurrentIngredients, // temporary
    defaultIngredients, //temporary
    isLoading, //temporary
    orderState,
    dispatchOrder
  } = useContext(MenuContext);

  console.log("DEFAULT", defaultIngredients);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);
  const confirmModalMessage = "Return to default setting?";

  const handleConfirmDefaultButton = () => {
    dispatchOrder({
      type: ACTIONS.LOAD_DEFAULT
    })
    setCurrentIngredients(structuredClone(defaultIngredients));
    setConfirmModalOpened(false);
  }

  return (
    <>
    {confirmModalOpened && 
    (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmDefaultButton}/>
    )}
    <div className="flex flex-col justify-between border-r-1 border-r-[rgb(197,197,197)] w-[450px] h-[800px] bg-white">
      <ProductInfo/>
      <OrderSummaryDetail setConfirmModalOpened={setConfirmModalOpened}/>
      <DecisionFooter/>
    </div>
    </>
  );
}

export default OrderSummary;