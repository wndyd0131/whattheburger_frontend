import { CustomRuleDetail } from "./customRuleDetail";
import { OptionDetail } from "./optionDetail";
import { ProductDetail } from "./productDetail"

export interface Cart {
  productDetails: ProductDetail[]
  totalPrice: number
};

export const normalizeCart = (response) => {
  response.cartResponses.map(cartResponse => {
    const productResponse = cartResponse.productResponse;
    const customRuleResponses = cartResponse.customRuleResponses;
    const customRuleDetails = customRuleResponses.map(customRuleResponse => {
      const optionResponses = customRuleResponse.optionResponses;
      const optionDetails = optionResponses.map(optionResponse => {
        const optionDetail: OptionDetail = {
          id: optionResponse.productOptionId,
          name: optionResponse.optionQuantity,
          quantity: 0,
          isSelected: false,
          countType: "",
          measureType: "",
          orderIndex: 0,
          traitDetails: [],
          quantityDetail: undefined
        }
        return {

        }
      })
      const customRuleDetail: CustomRuleDetail = {
        id: customRuleResponse.customRuleId,
        name: customRuleResponse.customRuleName,
        orderIndex: customRuleResponse.orderIndex,
        optionDetails: optionDetails
      }
    })

    const productDetail: ProductDetail = {
      id: productResponse.productId,
      name: productResponse.productName,
      productType: productResponse.productType,
      price: productResponse.productPrice,
      imageSource: productResponse.imageSource,
      customRuleDetails: customRuleDetails,
      quantity: cartResponse.quantity
    }
    return {
      productDetail: productDetail
    };
  });
  const cart: Cart = {
    productDetails: [],
    totalPrice: response.totalPrice
  }
}