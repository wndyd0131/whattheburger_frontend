import { useContext } from "react";
import CountLabel from "../CountLabel";
import TraitLabel from "../TraitLabel";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { motion } from "framer-motion";

const OrderSummaryDetail = () => {
  const {
    reducer: {
      rootState: {
        optionState,
      }
    }
  } = useContext(LayoutContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex flex-col flex-1 p-6 overflow-y-auto border-t border-gray-200 bg-white"
    >
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700 font-['Whatthefont'] bg-gradient-to-r from-[#FE7800] to-orange-500 bg-clip-text text-transparent">
          Order Summary
        </h2>
      </div>
      
      <div className="flex flex-col flex-1 space-y-4">
        <ul className="space-y-4">
          {optionState.currentSelections.items.map((customRule, customRuleIdx) => {
            console.log("OrderSummaryDetail", optionState);
            if (customRule.selectedCount > 0) {
              return (
                <motion.div 
                  key={customRuleIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: customRuleIdx * 0.1 }}
                  className="flex flex-col space-y-2 p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <h3 className="font-bold text-[#FE7800] text-lg font-['Whatthefont'] border-b border-orange-200 pb-2">
                    {customRule.customRuleName}
                  </h3>
                  <div className="space-y-2">
                    {customRule.optionDetails.map((optionDetail, optionDetailIdx) => 
                      optionDetail.isSelected ? 
                      <motion.li 
                        key={optionDetailIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 font-medium text-gray-700 font-['Whatthefont'] p-2 bg-white rounded-lg shadow-sm"
                      >
                        <span className="flex-1">{optionDetail.name}</span>
                        <CountLabel customRuleIdx={customRuleIdx} optionDetail={optionDetail} optionDetailIdx={optionDetailIdx}/>
                        <div className="flex gap-1">
                          {optionDetail.optionTraitResponses.map((optionTrait, optionTraitIdx) => 
                            <TraitLabel key={optionTraitIdx} optionTrait={optionTrait}/>
                          )}
                        </div>
                      </motion.li> : ""
                    )}
                  </div>
                </motion.div>
              );
            }
          })}
        </ul>
      </div>
    </motion.div>
  );
}

export default OrderSummaryDetail;