import { CART_ACTIONS as ACTIONS } from "./actions";

export const initialCartState = {
  cartList: [],
  totalPrice: 0
};
export const cartReducer = (state=initialCartState, action) => {
  switch(action.type) {
    case ACTIONS.LOAD_PRODUCT: {
        const {
          cartIdx,
          cartData
        } = action.payload;

        const updatedState = structuredClone(state);

        const customRuleResponses = cartData.customRuleResponses;
        let customRuleList = customRuleResponses.map(customRuleResponse => {
          let optionList = customRuleResponse.optionResponses.map(optionResponse => {
            let optionTraitList = optionResponse.optionTraitResponses.map(traitResponse => {
              return {
                traitId: traitResponse.productOptionTraitId,
                baseCalories: traitResponse.baseCalories,
                basePrice: traitResponse.basePrice,
                labelCode: traitResponse.labelCode,
                defaultSelection: traitResponse.defaultSelection,
                optionTraitName: traitResponse.optionTraitName,
                optionTraitType: traitResponse.optionTraitType,
                currentValue: traitResponse.currentValue,
                calculatedPrice: traitResponse.traitTotalPrice
              }
            });
            const quantityDetailResponse = optionResponse.quantityDetailResponse;
            const quantityDetail = quantityDetailResponse
            ? {
              quantityList: quantityDetailResponse.quantityDetails.map(quantityObj => {
                return {
                  quantityId: quantityObj.quantityId,
                  labelCode: quantityObj.labelCode,
                  extraPrice: quantityObj.extraPrice,
                  extraCalories: quantityObj.extraCalories,
                  isDefault: quantityObj.isDefault,
                  quantityType: quantityObj.quantityType  
                }
              }),
              selectedId: quantityDetailResponse.selectedId
            }
            :
            null;
            
            return {
              optionId: optionResponse.productOptionId,
              baseCalories: optionResponse.baseCalories,
              basePrice: optionResponse.basePrice,
              optionName: optionResponse.optionName,
              countType: optionResponse.countType,
              defaultQuantity: optionResponse.defaultQuantity,
              imageSource: optionResponse.imageSource,
              isDefault: optionResponse.isDefault,
              maxQuantity: optionResponse.maxQuantity,
              measureType: optionResponse.measureType,
              orderIndex: optionResponse.orderIndex,
              optionQuantity: optionResponse.optionQuantity,
              isSelected: optionResponse.isSelected,
              productOptionTraits: optionTraitList,
              quantityDetail: quantityDetail,
              calculatedPrice: optionResponse.optionTotalPrice
            }
          });
          return {
            customRuleId: customRuleResponse.customRuleId,
            customRuleName: customRuleResponse.customRuleName,
            customRuleType: customRuleResponse.customRuleType,
            maxSelection: customRuleResponse.maxSelection,
            minSelection: customRuleResponse.minSelection,
            productOptions: optionList,
            orderIndex: customRuleResponse.orderIndex,
            calculatedPrice: customRuleResponse.customRuleTotalPrice
          }
        });
        const productObject = {
          product: {
            productId: cartData.productId,
            productName: cartData.productName,
            basePrice: cartData.basePrice,
            productType: cartData.productType,
            imageSource: cartData.imageSource,
            briefInfo: cartData.briefInfo,
            baseCalories: cartData.calories,
            quantity: cartData.quantity,
            customRules: customRuleList,
            productTotalPrice: cartData.productTotalPrice,
            productExtraPrice: cartData.productExtraPrice
          }
        };
        updatedState.cartList[cartIdx] = productObject;
        return updatedState;
    }
    case ACTIONS.LOAD_ALL_PRODUCTS: {
      const {
        cartData
      } = action.payload;
      const updatedState = structuredClone(state);
      console.log("CARTDATA", cartData);
      const productResponses = cartData.productResponses;
      const totalPrice = cartData.cartTotalPrice;
      const cartList = productResponses.map(productResponse => {
        const customRuleList = productResponse.customRuleResponses.map(customRuleResponse => {
          const optionList = customRuleResponse.optionResponses.map(optionResponse => {
            const optionTraitList = optionResponse.optionTraitResponses.map(traitResponse => {
              return {
                traitId: traitResponse.productOptionTraitId,
                baseCalories: traitResponse.baseCalories,
                basePrice: traitResponse.basePrice,
                labelCode: traitResponse.labelCode,
                defaultSelection: traitResponse.defaultSelection,
                optionTraitName: traitResponse.optionTraitName,
                optionTraitType: traitResponse.optionTraitType,
                currentValue: traitResponse.currentValue,
                calculatedPrice: traitResponse.traitTotalPrice
              }
            });

            const quantityDetailResponse = optionResponse.quantityDetailResponse;
            const quantityDetail = quantityDetailResponse
            ? {
              quantityList: quantityDetailResponse.quantityDetails.map(quantityObj => {
                return {
                  quantityId: quantityObj.quantityId,
                  labelCode: quantityObj.labelCode,
                  extraPrice: quantityObj.extraPrice,
                  extraCalories: quantityObj.extraCalories,
                  isDefault: quantityObj.isDefault,
                  quantityType: quantityObj.quantityType  
                }
              }),
              selectedId: quantityDetailResponse.selectedId
            }
            :
            null;
            
            return {
              optionId: optionResponse.productOptionId,
              baseCalories: optionResponse.baseCalories,
              basePrice: optionResponse.basePrice,
              optionName: optionResponse.optionName,
              countType: optionResponse.countType,
              defaultQuantity: optionResponse.defaultQuantity,
              imageSource: optionResponse.imageSource,
              isDefault: optionResponse.isDefault,
              maxQuantity: optionResponse.maxQuantity,
              measureType: optionResponse.measureType,
              orderIndex: optionResponse.orderIndex,
              optionQuantity: optionResponse.optionQuantity,
              isSelected: optionResponse.isSelected,
              productOptionTraits: optionTraitList,
              quantityDetail: quantityDetail,
              calculatedPrice: optionResponse.optionTotalPrice
            }
          });
          return {
            customRuleId: customRuleResponse.customRuleId,
            customRuleName: customRuleResponse.customRuleName,
            customRuleType: customRuleResponse.customRuleType,
            maxSelection: customRuleResponse.maxSelection,
            minSelection: customRuleResponse.minSelection,
            productOptions: optionList,
            orderIndex: customRuleResponse.orderIndex,
            calculatedPrice: customRuleResponse.customRuleTotalPrice
          }
        });
        return {
          product: {
            productId: productResponse.productId,
            productName: productResponse.productName,
            basePrice: productResponse.basePrice,
            productType: productResponse.productType,
            imageSource: productResponse.imageSource,
            briefInfo: productResponse.briefInfo,
            baseCalories: productResponse.calories,
            customRules: customRuleList,
            quantity: productResponse.quantity,
            productTotalPrice: productResponse.productTotalPrice,
            productExtraPrice: productResponse.productExtraPrice
          }
        }
      });
      updatedState.cartList = cartList;
      updatedState.totalPrice = totalPrice;
      return updatedState;
    }
    case ACTIONS.UPDATE: {
      
    }
    default:
      return state;
  }
}