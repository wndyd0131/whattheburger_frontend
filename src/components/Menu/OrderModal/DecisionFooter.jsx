import { motion } from "motion/react";
import { useContext } from "react";
import { MenuContext } from "../../../contexts/MenuContext";
import axios from "axios";
import { toast } from "react-toastify";
import { LayoutContext } from "../../../contexts/LayoutContext";
import api from "../../../utils/api";
import { CART_ACTIONS } from "../../../reducers/Cart/actions";
import { ModalContext } from "./contexts/ModalContext";

const DecisionFooter = () => {
  
  const {
    modalData: {
      selectedProduct,
      setSelectedProduct,
      selectedCartIdx,
    },
    mode,
  } = useContext(ModalContext);

  const {
    reducer: {
      dispatchRoot,
      rootState: {
        optionState
      }
    }
  } = useContext(LayoutContext);

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
    
    console.log(cartObject);

    api.post("/cart", cartObject)
    .then(response => {
      console.log("RESPONSE", response);
      const cartData = response.data;
      setSelectedProduct(null);
      dispatchRoot({
        type: CART_ACTIONS.HYDRATE,
        payload: {
          cartData: cartData
        }
      });
      toast.success('Added to bag');
    })
    .catch(err => {
      toast.error('Failed to add to bag');
      console.error(err);
    });
  }

  const handleClickSaveButton = (cartIdx) => {

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
      customRuleRequests: customRuleRequests
    }
    
    console.log(cartObject);

    api.patch(`/cart/${cartIdx}`, cartObject)
    .then(response => {
      console.log("RESPONSE", response);
      const cartData = response.data;
      setSelectedProduct(null);
      dispatchRoot({
        type: CART_ACTIONS.HYDRATE,
        payload: {
          cartData: cartData
        }
      });
      toast.success('Order successfully changed');
    })
    .catch(err => {
      toast.error('Failed to save the modification');
      console.error(err);
    });
  }

  switch(mode) {
    case "menu": {
      return (
      <div className="flex basis-1/6 justify-center items-center gap-[20px] border-t-1 border-gray-300">
        <motion.div
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          className="flex justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] shadow-sm font-['Whatthefont'] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white"
          onClick={() => handleClickAddToBag()}
        >
          Add To Bag
        </motion.div>
      </div>
      );
    }
    case "cart": {
      return (
        <div className="flex basis-1/6 justify-center items-center gap-[20px] border-t-1 border-gray-300">
          <motion.div
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className="flex justify-center items-center border-1 bg-white text-[#FE7800] border-[#FE7800] shadow-sm font-['Whatthefont'] rounded-[5px] w-[170px] h-[50px] text-[21px] whitespace-nowrap cursor-pointer hover:bg-[#FE7800] hover:text-white hover:border-white"
            onClick={() => handleClickSaveButton(selectedCartIdx)}
          >
            SAVE
          </motion.div>
        </div>
      );
    }
    default:
      return null;
  }
}

export default DecisionFooter;