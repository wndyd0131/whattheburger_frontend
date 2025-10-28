import { useContext } from "react";
import { toast } from "react-toastify";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { CART_ACTIONS } from "../../../reducers/Cart/actions";
import { ModalContext } from "./contexts/ModalContext";
import { patchCartItem, postCartItem } from "../../../api/cart";
import { OPTION_ACTIONS } from "../../../reducers/Option/actions";
import Cookie from "js-cookie";

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
        cartState,
        optionState
      }
    }
  } = useContext(LayoutContext);

  const createCartRequestBody = () => {
    const customRuleRequests = optionState.currentSelections.items.map((customRule) => {
      let customRuleId = customRule.customRuleId;
      let optionRequests = customRule.optionList.map((optionDetail) => {
        let optionTraitRequests = optionDetail.traitList.map((optionTraitDetail) => (
          {
            productOptionTraitId: optionTraitDetail.traitId,
            currentValue: optionTraitDetail.currentSelection
          }
        ));
        const quantityList = optionDetail.quantityDetail.quantityList;
        const selectedIdx = optionDetail.quantityDetail.selectedIdx;
        let quantityId = null;
        if (selectedIdx >= 0 && selectedIdx < quantityList.length) {
          quantityId = quantityList[selectedIdx].quantityId;
        } // else throw exception
        
        const quantityDetailRequest = quantityId !== null ? { id: quantityId } : null;

        return {
          productOptionId: optionDetail.optionId,
          isSelected: optionDetail.isSelected,
          optionQuantity: optionDetail.optionQuantity,
          optionTraitRequests: optionTraitRequests,
          quantityDetailRequest: quantityDetailRequest
        }
      });
      return {
        customRuleId,
        optionRequests
      }
    });

    const storeId = Cookie.get("storeId");

    const cartObject = {
      storeId: storeId,
      storeProductId: selectedProduct.storeProductId,
      customRuleRequests: customRuleRequests
    }

    return cartObject;
  }

  const handleClickAddToBag = () => {
    const cartObject = {
      ...createCartRequestBody(),
      quantity: 1
    };
    postCartItem(cartObject)
      .then(data => 
        {
          setSelectedProduct(null);
          dispatchRoot({
            type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
            payload: {
              cartData: data
            }
          });
          dispatchRoot({
            type: OPTION_ACTIONS.INIT_SELECTION
          });
          toast.success('Added to bag');
        })
      .catch(err => {
        toast.error('Failed to add to bag');
        console.error(err);
      });
  }

  const handleClickSaveButton = (cartIdx) => {
    const cartObject = createCartRequestBody();

    patchCartItem(cartIdx, cartObject)
      .then(data => {
        setSelectedProduct(null);
        dispatchRoot({
          type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
          payload: {
            cartData: data
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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center items-center p-6 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-['Whatthefont'] text-lg"
            onClick={() => handleClickAddToBag()}
          >
            Add To Bag
          </motion.button>
        </motion.div>
      );
    }
    case "cart": {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center items-center p-6 border-t border-gray-200 bg-gradient-to-r from-white to-gray-50"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 font-['Whatthefont'] text-lg"
            onClick={() => handleClickSaveButton(selectedCartIdx)}
          >
            Save Changes
          </motion.button>
        </motion.div>
      );
    }
    default:
      return null;
  }
}

export default DecisionFooter;