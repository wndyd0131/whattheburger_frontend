import { CART_ACTIONS as ACTIONS } from "./actions";

export const initialCartState = {
  cartList: []
};
export const cartReducer = (state=initialCartState, action) => {
  switch(action.type) {
    case ACTIONS.HYDRATE: {
      const {
        cartData
      } = action.payload;
      const updatedState = structuredClone(state);
      console.log("CARTDATA", cartData);
      const cartList = cartData.map(cart => {
        let customRuleList = cart.customRuleResponses.map(customRule => {
          let optionList = customRule.optionResponses.map(productOption => {
            let optionTraitList = productOption.optionTraitResponses.map(productOptionTrait => {
              return {
                productOptionTraitId: productOptionTrait.productOptionTraitId,
                labelCode: productOptionTrait.labelCode,
                optionTraitName: productOptionTrait.optionTraitName,
                optionTraitType: productOptionTrait.optionTraitType,
                currentValue: productOptionTrait.currentValue
              }
            });

            return {
              productOptionId: productOption.productOptionId,
              optionName: productOption.optionName,
              countType: productOption.countType,
              measureType: productOption.measureType,
              orderIndex: productOption.orderIndex,
              optionQuantity: productOption.optionQuantity,
              isSelected: productOption.isSelected,
              productOptionTraits: optionTraitList,
              quantityDetail: productOption.quantityDetailResponse
            }
          });
          return {
            customRuleId: customRule.customRuleId,
            customRuleName: customRule.customRuleName,
            productOptions: optionList
          }
        });
        return {
          product: {
            productId: cart.productResponse.productId,
            productName: cart.productResponse.productName,
            productPrice: cart.productResponse.productPrice,
            productType: cart.productResponse.productType,
            imageSource: cart.productResponse.imageSource
          },
          quantity: cart.quantity,
          customRules: customRuleList
        }
      });
      updatedState.cartList = cartList;
      return updatedState;
    }
    default:
      return state;
  }
}