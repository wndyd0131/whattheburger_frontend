import { useState, useContext } from "react";
import ConfirmModal from "./ConfirmModal";
import ProductInfo from "./ProductInfo";
import OrderSummaryDetail from "./OrderSummaryDetail";
import DecisionFooter from "./DecisionFooter";
import { motion } from "framer-motion";

const OrderSummary = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col justify-between border-r border-gray-200 basis-1/3 bg-gradient-to-b from-white to-gray-50"
    >
      <ProductInfo/>
      <OrderSummaryDetail/>
      <DecisionFooter/>
    </motion.div>
  );
}

export default OrderSummary;