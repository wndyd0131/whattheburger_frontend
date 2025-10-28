import { useRef, useState } from "react";
const Cart = () => {

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
        className="fixed flex flex-col bg-white w-[700px] right-0 top-[60px] bottom-0 rounded-l-4xl h-[calc(100vh-60px)] border-1 border-gray-200 shadow-2xl z-40"
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