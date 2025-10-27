import { ORDER_ACTIONS as ACTIONS } from "./actions";

export const initialOrderState = {
  orderId: null,
  orderNumber: null,
  orderStatus: null,
  orderType: null,
  paymentStatus: null,
  paymentMethod: null,
  orderNote: null,
  discountType: null,
  taxPrice: null,
  contactInfo: {
    email: null,
    firstName: null,
    lastName: null,
    phoneNum: null
  },
  addressInfo: {
    cityState: null,
    streetAddr: null,
    streetAddrDetail: null,
    zipCode: null
  },
  cardInfo: {
    brand: null,
    last4: null,
    expireMonth: null,
    expireYear: null
  },
  productList: [],
  totalPrice: 0
};
export const orderReducer = (state=initialOrderState, action, cartState) => {
  switch(action.type) {
    case ACTIONS.LOAD_ORDER: {
      const updatedState = structuredClone(state);
      const {
        orderResponse
      } = action.payload;
      const productList = orderResponse.productResponses.map(productResponse => {
        const customRuleList = productResponse.customRuleResponses.map(customRuleResponse => {
          const optionList = customRuleResponse.optionResponses.map(optionResponse => {
            const traitList = optionResponse.traitResponses.map(traitResponse => {
              return {
                traitId: traitResponse.id,
                originalTraitId: traitResponse.productOptionTraitId,
                calculatedCalories: traitResponse.calculatedCalories,
                calculatedPrice: traitResponse.calculatedPrice,
                labelCode: traitResponse.labelCode,
                traitName: traitResponse.name,
                traitType: traitResponse.optionTraitType,
                selectedValue: traitResponse.selectedValue
                // basePrice
                // baseCalories
              }
            });
            const quantityDetail = optionResponse.quantityDetail
            ? {
              quantityId: optionResponse.quantityDetail.productOptionOptionQuantityId,
              calculatedPrice: optionResponse.quantityDetail.calculatedPrice,
              calculatedCalories: optionResponse.quantityDetail.extraCalories,
              quantityType: optionResponse.quantityDetail.quantityType
            }
            : null;

            return {
                optionId: optionResponse.id,
                originalOptionId: optionResponse.productOptionId,
                calculatedPrice: optionResponse.calculatedPrice,
                calculatedCalories: optionResponse.calculatedCalories,
                optionName: optionResponse.name,
                countType: optionResponse.countType,
                quantity: optionResponse.quantity,
                traitList: traitList,
                quantityDetail: quantityDetail,
            }});
            return {
              customRuleId: customRuleResponse.id,
              originalCustomRuleId: customRuleResponse.customRuleId,
              customRuleName: customRuleResponse.name,
              optionList: optionList,
              calculatedPrice: customRuleResponse.calculatedPrice,
            }
          });
          return {
            productId: productResponse.id,
            originalProductId: productResponse.productId,
            productName: productResponse.name,
            productType: productResponse.productType,
            imageSource: productResponse.imageSource,
            calculatedCalories: productResponse.calculatedCalories,
            quantity: productResponse.quantity,
            customRuleList: customRuleList,
            calculatedPrice: productResponse.totalPrice,
            extraPrice: productResponse.extraPrice,
            basePrice: productResponse.basePrice
          }
      });
  
      updatedState.orderId = orderResponse.id;
      updatedState.storeId = orderResponse.storeId;
      updatedState.orderNumber = orderResponse.orderNumber,
      updatedState.orderType = orderResponse.orderType;
      updatedState.productList = productList;
      updatedState.totalPrice = orderResponse.totalPrice;
      updatedState.paymentMethod = orderResponse.paymentMethod;
      updatedState.paymentStatus = orderResponse.paymentStatus;
      updatedState.contactInfo = {
        email: orderResponse.contactInfo.email,
        firstName: orderResponse.contactInfo.firstName,
        lastName: orderResponse.contactInfo.lastName,
        phoneNum: orderResponse.contactInfo.phoneNum
      };
      updatedState.addressInfo = {
        cityState: orderResponse.addressInfo.cityState,
        streetAddr: orderResponse.addressInfo.streetAddr,
        streetAddrDetail: orderResponse.addressInfo.streetAddrDetail,
        zipCode: orderResponse.addressInfo.zipCode
      };
      updatedState.cardInfo = {
        brand: orderResponse.cardInfo.cardBrand,
        last4: orderResponse.cardInfo.cardLast4,
        expireMonth: orderResponse.cardInfo.cardExpireMonth,
        expireYear: orderResponse.cardInfo.cardExpireYear
      };
      updatedState.orderNote = orderResponse.orderNote;
      return updatedState;
    }
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
            customRuleList: customRuleList,
            productTotalPrice: cartItem.product.productTotalPrice,
            productExtraPrice: cartItem.product.productExtraPrice
          }
      });
      updatedState.productList = productList;
      updatedState.totalPrice = cartState.totalPrice;
      return updatedState;
    }
    default:
      return state;
  }
}