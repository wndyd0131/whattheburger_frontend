// export const fromProductResponseToOptionDto = (data) => {
//   const optionResponses = data.optionResponses;
//   const customRuleList = [];
//   optionResponses.forEach(optionResponse => {
//     const customRuleIdx = optionResponse.customRuleResponse.orderIndex;
//     const quantityList = optionResponse.quantityDetailResponses.map(quantityResponse => ({
//       quantityId: quantityResponse.id,
//       extraPrice: quantityResponse.extraPrice,
//       extraCalories: quantityResponse.extraCalories,
//       isDefault: quantityResponse.isDefault,
//       labelCode: quantityResponse.labelCode,
//       quantityType: quantityResponse.quantityType
//     }));

//     const selectedIdx = optionResponse.quantityDetailResponses.findIndex(quantityDetail => quantityDetail.isDefault === true);
//     const quantityDetail = {
//       quantityList: quantityList,
//       selectedIdx: selectedIdx !== -1 ? selectedIdx : null
//     }
//     const traitList = optionResponse.optionTraitResponses.map(optionTraitResponse => ({
//       traitId: optionTraitResponse.productOptionTraitId,
//       currentSelection: optionTraitResponse.defaultSelection,
//       defaultSelection: optionTraitResponse.defaultSelection,
//       extraCalories: optionTraitResponse.extraCalories,
//       extraPrice: optionTraitResponse.extraPrice,
//       labelCode: optionTraitResponse.labelCode,
//       traitName: optionTraitResponse.name,
//       traitType: optionTraitResponse.optionTraitType,
//       calculatedPrice: 0
//     }));

//     const optionObject = {
//       optionId: optionResponse.productOptionId,
//       orderIndex: optionResponse.orderIndex,
//       optionName: optionResponse.name,
//       extraCalories: optionResponse.calories,
//       extraPrice: optionResponse.extraPrice,
//       imageSource: optionResponse.imageSource,
//       isDefault: optionResponse.isDefault,
//       maxQuantity: optionResponse.maxQuantity,
//       measureType: optionResponse.measureType,
//       countType: optionResponse.countType,
//       defaultQuantity: optionResponse.defaultQuantity,
//       optionQuantity: optionResponse.defaultQuantity,
//       isSelected: optionResponse.isDefault,
//       traitList: traitList,
//       quantityDetail: quantityDetail,
//       calculatedPrice: 0
//     };

//     if (optionResponse.isDefault)
//       selectedCount++;

//     if (!customRuleList[customRuleIdx]) {
//       const customRuleId = option.customRuleResponse.customRuleId;
//       const customRuleName = option.customRuleResponse.name;
//       const customRuleType = option.customRuleResponse.customRuleType;
//       const maxSelection = option.customRuleResponse.maxSelection;
//       const minSelection = option.customRuleResponse.minSelection;
//       const orderIndex = option.customRuleResponse.orderIndex;
//       customRuleList[customRuleIdx] = {
//         customRuleId: customRuleId,
//         customRuleName: customRuleName,
//         customRuleType: customRuleType,
//         optionList: [],
//         maxSelection: maxSelection,
//         minSelection: minSelection,
//         selectedCount: 0,
//         orderIndex: orderIndex,
//         calculatedPrice: 0
//       };
//     }
//     customRuleList[customRuleIdx].optionList.push(optionObject);
//     if (optionResponse.isDefault)
//       customRuleList[customRuleIdx].selectedCount++;
//   })
//   return {
//     customRuleList: customRuleList
//   };
// }

// export const fromCartResponseToOptionDto = (data) => {

//       const cartIdx = action.payload.cartIdx;
//       const cartItem = cartState.cartList[cartIdx]

//       const totalExtraPrice = cartItem.product.productExtraPrice;
//       const customRules = cartItem.product.customRules.map(customRule => {
//         let selectedCount = 0;
//         const optionList = customRule.productOptions.map(option => {
//           const traitList = option.productOptionTraits.map(trait => {
//             return {
//               productOptionTraitId: trait.productOptionTraitId,
//               currentSelection: trait.currentValue,
//               defaultSelection: trait.defaultSelection,
//               extraCalories: trait.baseCalories,
//               extraPrice: trait.basePrice,
//               labelCode: trait.labelCode,
//               name: trait.optionTraitName,
//               optionTraitType: trait.optionTraitType,
//               calculatedPrice: trait.calculatedPrice
//             };
//           });

//           if (option.isSelected)
//             selectedCount++;

//           let quantityDetail;
//           if (option.quantityDetail) {
//             const selectedIdx = option.quantityDetail.quantityList.findIndex(quantity => quantity.quantityId === option.quantityDetail.selectedId);
//             quantityDetail = {
//               quantityList: option.quantityDetail.quantityList,
//               selectedIdx: selectedIdx !== -1 ? selectedIdx : null
//             }
//           } else {
//             quantityDetail = {
//               quantityList: [],
//               selectedIdx: null
//             }
//           }

//           return {
//               productOptionId: option.productOptionId,
//               calories: option.baseCalories,
//               extraPrice: option.basePrice,
//               name: option.optionName,
//               countType: option.countType,
//               defaultQuantity: option.defaultQuantity,
//               imageSource: option.imageSource,
//               isDefault: option.isDefault,
//               maxQuantity: option.maxQuantity,
//               measureType: option.measureType,
//               orderIndex: option.orderIndex,
//               optionQuantity: option.optionQuantity,
//               isSelected: option.isSelected,
//               optionTraitResponses: traitList,
//               quantityDetail: quantityDetail,
//               calculatedPrice: option.calculatedPrice
//           }
//         });
//         return {
//           customRuleId: customRule.customRuleId,
//           customRuleName: customRule.customRuleName,
//           customRuleType: customRule.customRuleType,
//           maxSelection: customRule.maxSelection,
//           minSelection: customRule.minSelection,
//           optionDetails: optionList,
//           orderIndex: customRule.orderIndex,
//           selectedCount: selectedCount,
//           calculatedPrice: customRule.calculatedPrice,
//         }
//       })

//       updatedState.currentSelections.items = structuredClone(customRules);
//       updatedState.defaultSelections.items = structuredClone(customRules);
//       updatedState.currentSelections.totalExtraPrice = totalExtraPrice;
//       updatedState.defaultSelections.totalExtraPrice = totalExtraPrice;
//       updatedState.currentSelections.totalCalories = 0;
//       updatedState.defaultSelections.totalCalories = 0;
//       return updatedState;
// }