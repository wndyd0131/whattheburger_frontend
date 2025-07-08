import { useState, useContext } from "react";
import MenuImageContainer from "../../MenuImageContainer";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { ModalContext } from "./contexts/ModalContext";
import { motion } from "framer-motion";

const ProductInfo = () => {

  const {
    reducer: {
      rootState: {
        optionState,
      }
    }
  } = useContext(LayoutContext);
  
  const {
    modalData: {
      selectedProduct
    },
    mode
  } = useContext(ModalContext);

  const [selectedButton, setSelectedButton] = useState("ONLY");

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col items-center p-8 space-y-6"
    >
      <div className="relative">
        <MenuImageContainer width="220px" height="200px" imgSrc={selectedProduct.imageSource}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl"></div>
      </div>
      
      <div className="flex flex-col items-center space-y-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 font-['Whatthefont']">{selectedProduct.name}</h1>
        
        <div className="flex justify-center items-center gap-3">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-['Whatthefont'] text-sm font-medium transition-all duration-200 ${
              selectedButton === "ONLY" 
                ? "bg-gradient-to-r from-[#FE7800] to-orange-500 text-white shadow-lg" 
                : "bg-white text-[#FE7800] border-2 border-[#FE7800] hover:bg-orange-50"
            }`} 
            onClick={() => {setSelectedButton("ONLY")}} 
            disabled={selectedButton === "ONLY"}
          >
            ONLY
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 rounded-full font-['Whatthefont'] text-sm font-medium transition-all duration-200 ${
              selectedButton === "MEAL" 
                ? "bg-gradient-to-r from-[#FE7800] to-orange-500 text-white shadow-lg" 
                : "bg-white text-[#FE7800] border-2 border-[#FE7800] hover:bg-orange-50"
            }`} 
            onClick={() => {setSelectedButton("MEAL")}} 
            disabled={selectedButton === "MEAL"}
          >
            MEAL
          </motion.button>
        </div>
        
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-xl font-bold text-[#FE7800] font-['Whatthefont']">
            ${(selectedProduct.price + optionState.currentSelections.totalExtraPrice).toFixed(2)}
          </h2>
          <span className="text-sm text-gray-600">{optionState.currentSelections.totalCalories} Calories</span>
        </div>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-[#FE7800] font-medium hover:text-orange-600 transition-colors duration-200 cursor-pointer underline decoration-dotted"
        >
          Show Nutrition
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ProductInfo;