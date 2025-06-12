import { motion } from "motion/react";
import { useContext } from "react";
import { OrderContext } from "./contexts/OrderContext";
import { MenuContext } from "../../../contexts/MenuContext";
import { ACTIONS } from "../../../reducers/Option/actions";
import axios from "axios";

const DecisionFooter = () => {
  
  const {
    selectedProduct,
  } = useContext(MenuContext);

  const {
    optionState,
    setIsCustomizeDone
  } = useContext(OrderContext);

  const handleClickAddToBag = () => {

    console.log("SP", selectedProduct);
    console.log("OS", optionState);
    const customRuleRequests = optionState.currentSelections.items.map((customRule) => {
      let customRuleId = customRule.customRuleId;
      let optionRequests = customRule.optionDetails.map((optionDetail) => {
        let optionTraitRequests = optionDetail.optionTraitResponses.map((optionTraitDetail) => (
          {
            productOptionTraitId: optionTraitDetail.productOptionTraitId,
            currentValue: optionTraitDetail.currentSelection
          }
        ));
        
        return {
          productOptionId: optionDetail.productOptionId,
          isSelected: optionDetail.isSelected,
          optionQuantity: optionDetail.optionQuantity,
          optionTraitRequests: optionTraitRequests
        }
      });
      return {
        customRuleId,
        optionRequests
      }
    });

    const cartObject = {
      productId: selectedProduct.productId,
      quantity: 1,
      customRuleRequests: customRuleRequests
    }
    axios.post("http://localhost:8080/api/v1/cart", cartObject, {
      withCredentials: true
    }
    )
    .then(response => console.log("RESPONSE", response));
    console.log(cartObject);
  }

  return (
    <div className="flex basis-1/6 justify-center items-center gap-[20px] border-t-1 border-gray-300">
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
        onClick={() => handleClickAddToBag()}
      >
        Add To Bag
      </motion.div>
    </div>
  );
}

export default DecisionFooter;