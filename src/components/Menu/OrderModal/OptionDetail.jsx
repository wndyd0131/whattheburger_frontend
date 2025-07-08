import { useContext } from "react";
import TraitModifier from "../TraitModifier";
import CountModifier from "../CountModifier";
import { OptionContext } from "./contexts/OptionContext";
import { motion, AnimatePresence } from "framer-motion";

const OptionDetail = () => {

  const {
    option,
  } = useContext(OptionContext);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex flex-col space-y-3 items-center min-h-[70px]"
    >
      <CountModifier/>
      
      <AnimatePresence>
        {option.isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-2"
          >
            {option.optionTraitResponses.map((optionTrait, optionTraitIdx) => (
              <motion.div
                key={optionTraitIdx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: optionTraitIdx * 0.1 }}
              >
                <TraitModifier optionTrait={optionTrait} optionTraitIdx={optionTraitIdx}/>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default OptionDetail;