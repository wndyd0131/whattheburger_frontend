import { useState, useContext } from "react";
import ConfirmModal from "./ConfirmModal";
import ProductInfo from "./ProductInfo";
import OrderSummaryDetail from "./OrderSummaryDetail";
import DecisionFooter from "./DecisionFooter";
import { ACTIONS } from "../../../reducers/Option/actions";
import { OrderContext } from "./contexts/OrderContext";

const OrderSummary = () => {
  return (
    <div className="flex flex-col justify-between border-r-1 border-gray-300 basis-1/4 bg-white">
      <ProductInfo/>
      <OrderSummaryDetail/>
      <DecisionFooter/>
    </div>
  );
}

export default OrderSummary;