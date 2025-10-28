import { useContext } from "react";
import { OptionContext } from "./contexts/OptionContext";
import { motion } from "framer-motion";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { OPTION_ACTIONS } from "../../../reducers/Option/actions";
import ImageContainer from "./ImageContainer";
import ContentContainer from "./ContentContainer";
const OptionCard = ({customRule, customRuleIdx, option, optionIdx}) => {

  const {
    reducer: {
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const handleClickOptionCard = () => {
    const customRuleType = customRule.customRuleType;
    dispatchRoot({
      type: OPTION_ACTIONS.MODIFY_SELECTION,
      payload: {
        customRuleIdx: customRuleIdx,
        customRuleType: customRuleType,
        optionId: option.optionId
      }
    });
  }

  return (
    <OptionContext.Provider value={{
      customRule: customRule,
      customRuleIdx: customRuleIdx,
      option: option,
      optionIdx: optionIdx
    }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: optionIdx * 0.05 }}
        whileHover={{ y: -4, scale: 1.02 }}
        className="flex font-[sans-serif] justify-center p-2 min-w-[250px] w-full max-w-[300px]"
      >
        <motion.div
          className={`relative flex flex-col p-2 w-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 ${
            option.isSelected 
              ? "border-[#FE7800]" 
              : "border-gray-100 hover:border-orange-200 hover:bg-gray-50"
          }`}
          whileHover={{ 
            boxShadow: option.isSelected 
              ? "0 25px 50px -12px rgba(251, 146, 60, 0.25)" 
              : "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
          }}
        >
          {option.isSelected && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 z-10 w-6 h-6 bg-gradient-to-r from-[#FE7800] to-orange-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
          
        
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"
          />
          
          <ImageContainer/>
          <ContentContainer/>
          <div className="flex justify-center p-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleClickOptionCard()}
              className="flex justify-center items-center px-5 py-1 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-['Whatthefont'] text-md cursor-pointer">
                Select
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </OptionContext.Provider>
  );
}

export default OptionCard;