import { ORDER_ACTIONS as ACTIONS } from "./actions";

export const initialOrderState = {
  products: [],
  totalPrice: 0
};
export const orderReducer = (state=initialOrderState, action, cartState) => {
  switch(action.type) {
    case ACTIONS.TRANSFER_FROM_CART: {
      const updatedState = structuredClone(state);
      const productList = cartState.cartList.map(cartItem => {
        const customRuleList = cartItem.product.customRules.map(customRule => {
          const optionList = customRule.productOptions.map(option => {
            const traitList = option.productOptionTraits.map(trait => {
              return {
                traitId: trait.traitId,
                baseCalories: trait.baseCalories,
                basePrice: trait.basePrice,
                labelCode: trait.labelCode,
                defaultSelection: trait.defaultSelection,
                optionTraitName: trait.optionTraitName,
                optionTraitType: trait.optionTraitType,
                currentValue: trait.currentValue,
                calculatedPrice: trait.calculatedPrice
              }
            });
            let quantityDetail;
            console.log("QUANTITY DETAIL", option.quantityDetail)
            if (option.quantityDetail) {
              const selectedIdx = option.quantityDetail.quantityList.findIndex(quantity => quantity.quantityId === option.quantityDetail.selectedId);
              quantityDetail = {
                quantityList: option.quantityDetail.quantityList,
                selectedIdx: selectedIdx !== -1 ? selectedIdx : null
              }
            } else {
              quantityDetail = {
                quantityList: [],
                selectedIdx: null
              }
            }
            return {
                optionId: option.optionId,
                extraCalories: option.baseCalories,
                extraPrice: option.basePrice,
                optionName: option.optionName,
                countType: option.countType,
                defaultQuantity: option.defaultQuantity,
                imageSource: option.imageSource,
                isDefault: option.isDefault,
                maxQuantity: option.maxQuantity,
                measureType: option.measureType,
                orderIndex: option.orderIndex,
                optionQuantity: option.optionQuantity,
                isSelected: option.isSelected,
                traitList: traitList,
                quantityDetail: quantityDetail,
                calculatedPrice: option.calculatedPrice
            }});
            return {
              customRuleId: customRule.customRuleId,
              customRuleName: customRule.customRuleName,
              customRuleType: customRule.customRuleType,
              maxSelection: customRule.maxSelection,
              minSelection: customRule.minSelection,
              optionList: optionList,
              orderIndex: customRule.orderIndex,
              calculatedPrice: customRule.calculatedPrice,
            }
          });
          return {
            productId: cartItem.product.productId,
            productName: cartItem.product.productName,
            basePrice: cartItem.product.basePrice,
            productType: cartItem.product.productType,
            imageSource: cartItem.product.imageSource,
            briefInfo: cartItem.product.briefInfo,
            baseCalories: cartItem.product.baseCalories,
            quantity: cartItem.product.quantity,
            customRules: customRuleList,
            productTotalPrice: cartItem.product.productTotalPrice,
            productExtraPrice: cartItem.product.productExtraPrice
          }
      });
      updatedState.products = productList;
      updatedState.totalPrice = cartState.totalPrice;
      console.log("ORDER STATE", updatedState);
      return updatedState;
    }
    default:
      return state;
  }
}