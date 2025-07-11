import { useContext } from "react";
import { OptionContext } from "./contexts/OptionContext";
import OptionDetail from "./OptionDetail";
import { motion } from "framer-motion";

const ContentContainer = () => {

  const {
    option,
  } = useContext(OptionContext);

  const extraPrice = option.countType == "COUNTABLE"
    ? option.extraPrice * option.optionQuantity
    : option.extraPrice + option.quantityDetail.quantityList[option.quantityDetail.selectedIdx].extraPrice;
  const calories = option ? option.calories * option.optionQuantity : option.calories;
  const extraPriceText = extraPrice > 0 ? `+$${extraPrice.toFixed(2)}` : "Free";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-col justify-between p-4 space-y-3 bg-white"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800 font-['Whatthefont'] leading-tight">
          {option.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              extraPrice > 0 
                ? "bg-orange-100 text-[#FE7800]" 
                : "bg-green-100 text-green-700"
            }`}>
              {extraPriceText}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {calories} cal
            </span>
          </div>
        </div>
      </div>
      
      <div className="pt-2 border-t border-gray-100">
        <OptionDetail/>
      </div>
    </motion.div>
  );
}

export default ContentContainer;