import { ORDER_SESSION_ACTIONS as ACTIONS } from "./action";

export const initialOrderSessionState = {
  orderStatus: null,
  orderType: null,
  paymentStatus: null,
  paymentMethod: null,
  orderNote: null,
  discountType: null,
  taxPrice: null,
  name: null,
  sessionId: null,
  storeId: null,
  email: null,
  phoneNum: null,
  productList: [],
  totalPrice: 0
};

export const orderSessionReducer = (state=initialOrderSessionState, action) => {
  switch(action.type) {
    case ACTIONS.LOAD_SESSION: {
      const updatedState = structuredClone(state);
      const {
        orderSessionResponse
      } = action.payload;
      const productList = orderSessionResponse.productResponses.map(productResponse => {
        const customRuleList = productResponse.customRuleResponses.map(customRuleResponse => {
          const optionList = customRuleResponse.optionResponses.map(optionResponse => {
            const traitList = optionResponse.traitResponses.map(traitResponse => {
              return {
                traitId: traitResponse.productOptionTraitId,
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
                optionId: optionResponse.productOptionId,
                calculatedPrice: optionResponse.calculatedPrice,
                calculatedCalories: optionResponse.calculatedCalories,
                optionName: optionResponse.name,
                countType: optionResponse.countType,
                quantity: optionResponse.quantity,
                traitList: traitList,
                quantityDetail: quantityDetail,
            }});
            return {
              customRuleId: customRuleResponse.customRuleId,
              customRuleName: customRuleResponse.name,
              optionList: optionList,
              calculatedPrice: customRuleResponse.calculatedPrice,
            }
          });
          return {
            productId: productResponse.productId,
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
      updatedState.orderType = orderSessionResponse.orderType;
      updatedState.productList = productList;
      updatedState.paymentStatus = orderSessionResponse.paymentStatus;
      updatedState.sessionId = orderSessionResponse.sessionId;
      updatedState.storeId = orderSessionResponse.storeId;
      updatedState.totalPrice = orderSessionResponse.totalPrice;
      return updatedState;
    }
    case ACTIONS.UPDATE_PAYMENT_STATUS: {
      const {
        orderSessionResponse
      } = action.payload;
      return {
        ...state,
        paymentStatus: orderSessionResponse.paymentStatus
      }
    }
    default:
      return state;
  }
}