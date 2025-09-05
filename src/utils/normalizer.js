export const normalizeProduct = (productResponse) => {
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
    };
}