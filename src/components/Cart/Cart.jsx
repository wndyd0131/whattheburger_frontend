import { motion } from "motion/react";
import Header from "./Header";
import OrderList from "./OrderList";
import Footer from "./Footer";
import { useContext, useRef, useState } from "react";
import OrderModal from "../Menu/OrderModal/OrderModal";
import { CartContext } from "./contexts/CartContext";
import PriceSummary from "./PriceSummary";
import { LayoutContext } from "../../contexts/LayoutContext";
const Cart = () => {

  const {
    isMobile
  } = useContext(LayoutContext);

  const ref = useRef();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCartIdx, setSelectedCartIdx] = useState(null);

  return (
    <CartContext.Provider value={{
      selectedProduct,
      setSelectedProduct,
      selectedCartIdx,
      setSelectedCartIdx
    }}>
      <motion.div
        initial={{x: "100vw", opacity: 0}}
        animate={{x: 0, opacity: 1}}
        exit={{x: "100vw", opacity: 0}}
        transition={{type: 'tween'}}
        ref={ref}
        className={`fixed flex flex-col bg-white right-0 bottom-0 rounded-l-4xl border-1 border-gray-200 shadow-2xl z-40
            ${isMobile ? "w-full h-full" : "w-[700px] top-[60px] h-[calc(100vh-60px)]"}
          `}
      >
        <Header/>
        <OrderList/>
        <PriceSummary/>
        <Footer/>
      </motion.div>
      {selectedCartIdx !== null && selectedProduct !== null &&
        <OrderModal mode="cart"/>
      }
    </CartContext.Provider>
  )
}

export default Cart