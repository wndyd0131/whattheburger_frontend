import { motion } from "motion/react";
import { useContext } from "react";
import { OrderContext } from "./contexts/OrderContext";

const DecisionFooter = () => {
  
  const {
    setIsCustomizeDone
  } = useContext(OrderContext);

  return (
    <div className="flex basis-1/6 justify-center items-center gap-[20px] border-t-1 border-[gray]">
      <motion.div
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        onClick={() => setIsCustomizeDone(true)}
        className="flex justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] font-['Whatthefont'] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white"
      >
        Order
      </motion.div>
      <motion.div
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        className="flex justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] font-['Whatthefont'] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white"
      >
        Add To Bag
      </motion.div>
    </div>
  );
}

export default DecisionFooter;