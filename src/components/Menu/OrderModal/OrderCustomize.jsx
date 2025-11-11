import { useState, useContext } from "react";
import OptionCard from "./OptionCard";
import { OPTION_ACTIONS } from "../../../reducers/Option/actions";
import ConfirmModal from "./ConfirmModal";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { motion } from "framer-motion";

const OrderCustomize = () => {

  const {
    reducer: {
      dispatchRoot,
      rootState: {
        optionState
      }
    }
  } = useContext(LayoutContext);

  const confirmModalMessage = "Return to default setting?";

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const handleClickDefaultButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmDefaultButton = () => {
    dispatchRoot({
      type: OPTION_ACTIONS.LOAD_DEFAULT
    })
    setConfirmModalOpened(false);
  }

  return (
    <>
    {confirmModalOpened && 
    (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmDefaultButton}/>
    )}
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-col basis-2/3 bg-white"
    >
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-8">
          {optionState.currentSelections.items.map((customRule, customRuleIdx) => 
            <motion.div 
              key={customRuleIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: customRuleIdx * 0.1 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-800 font-['Whatthefont']">{customRule.customRuleName}</h1>
                <div className="flex-1 h-px bg-gradient-to-r from-[#FE7800] to-transparent"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-gray-50 min-w-[300px] rounded-2xl border border-gray-100">
                {customRule.optionList.map((option, optionIdx) => 
                  <OptionCard key={optionIdx} customRule={customRule} customRuleIdx={customRuleIdx} option={option} optionIdx={optionIdx}/>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex justify-center items-center p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-['Whatthefont']"
          onClick={() => handleClickDefaultButton()}
        >
          Reset to Default
        </motion.button>
      </div>
    </motion.div>
    </>
  );
}

export default OrderCustomize;