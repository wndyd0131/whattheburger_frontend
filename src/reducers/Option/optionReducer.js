import { OPTION_ACTIONS as ACTIONS } from "./actions";

export const initialOptionState = {
      currentSelections: {
        totalExtraPrice: 0,
        totalCalories: 0,
        items: []
      },
      defaultSelections: {
        totalExtraPrice: 0,
        totalCalories: 0,
        items: []
      },
      savedSelections: {
        totalExtraPrice: 0,
        totalCalories: 0,
        items: []
      }
    };
export const optionReducer = (state=initialOptionState, action, cartState) => {
  switch(action.type) {
    case ACTIONS.INIT_SELECTION: {
      const updatedState = {
        currentSelections: {
          totalExtraPrice: 0,
          totalCalories: 0,
          items: []
        },
        defaultSelections: {
          totalExtraPrice: 0,
          totalCalories: 0,
          items: []
        },
        savedSelections: {
          totalExtraPrice: 0,
          totalCalories: 0,
          items: []
        }
      };
      return updatedState;
    }
    case ACTIONS.MODIFY_QUANTITY: {
      const {
        customRuleIdx,
        optionId,
        modifyType
      } = action.payload;
      const updatedState = structuredClone(state);
      switch (modifyType) {
        case 'PLUS': {
          updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail) => {
            if (optionDetail.optionId === optionId && optionDetail.optionQuantity < optionDetail.maxQuantity) {
              let extraPrice = optionDetail.extraPrice;
              let extraCalories = optionDetail.extraCalories;
              let currentQuantity = optionDetail.optionQuantity;
              let defaultQuantity = optionDetail.defaultQuantity;
              optionDetail.optionQuantity++;
              if (currentQuantity >= defaultQuantity) {
                updatedState.currentSelections.totalExtraPrice += extraPrice;
              }
              updatedState.currentSelections.totalCalories += extraCalories;
            }
          });
          return updatedState;
        }
        case 'MINUS': {
          const minQuantity = 1;
          updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail) => {
            if (optionDetail.optionId === optionId && optionDetail.optionQuantity > minQuantity) {
              let extraPrice = optionDetail.extraPrice;
              let extraCalories = optionDetail.extraCalories;
              let currentQuantity = optionDetail.optionQuantity;
              let defaultQuantity = optionDetail.defaultQuantity;
              optionDetail.optionQuantity--;
              if (currentQuantity > defaultQuantity) {
                updatedState.currentSelections.totalExtraPrice -= extraPrice;
              }
              updatedState.currentSelections.totalCalories -= extraCalories;
            }
          });
          return updatedState;
        }
        case 'DISCRETE': {
          const {
            index
          } = action.payload;
          console.log("INDEX", index);
          updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail) => {
            if (optionDetail.optionId === optionId) {
              const quantityList = optionDetail.quantityDetail.quantityList;
              if (index >= 0 && index < quantityList.length) {
                const curIndex = optionDetail.quantityDetail.selectedIdx;
                const oldPrice = quantityList[curIndex].extraPrice;
                optionDetail.quantityDetail.selectedIdx = index;
                const newPrice = quantityList[index].extraPrice;
                updatedState.currentSelections.totalExtraPrice -= oldPrice;
                updatedState.currentSelections.totalExtraPrice += newPrice;
              }
            }
          });
          return updatedState;
        }
        default:
          return state;
      }
    }
    case ACTIONS.MODIFY_SELECTION: {
      const {
        customRuleIdx,
        customRuleType,
        optionId,
      } = action.payload;
      const updatedState = structuredClone(state);
      switch(customRuleType) {
        case "UNIQUE": {
          let oldExtraPrice = 0;
          let oldCalories = 0;
          let newExtraPrice = 0;
          let newCalories = 0;
          console.log("US", updatedState);
          updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail, optionDetailIdx) => {
            if (optionDetail.isSelected) {
              if (optionDetail.optionId === optionId) {
                return updatedState;
              }
              if (optionDetail.countType === "COUNTABLE") {
                oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                oldCalories = optionDetail.extraCalories * optionDetail.optionQuantity;
              } else if (optionDetail.countType === "UNCOUNTABLE") {
                  const quantityList = optionDetail.quantityDetail.quantityList;
                  const curIndex = optionDetail.quantityDetail.selectedIdx;
                  if (curIndex >= 0 && curIndex < quantityList.length) {
                    oldExtraPrice = optionDetail.extraPrice + quantityList[curIndex].extraPrice;
                    oldCalories = optionDetail.extraCalories + quantityList[curIndex].extraCalories;
                  }
                  // else throw exception
              }
            }
            if (optionDetail.optionId === optionId) {
              optionDetail.isSelected = true;
              newExtraPrice = optionDetail.extraPrice;
              newCalories = optionDetail.extraCalories;
            } else { // initialize to default setting
              optionDetail.isSelected = false;
              optionDetail.optionQuantity = optionDetail.defaultQuantity;
              optionDetail.quantityDetail.selectedIdx = updatedState.defaultSelections.items[customRuleIdx].optionList[optionDetailIdx].quantityDetail.selectedIdx;


              if (optionDetail.traitList[0])
                optionDetail.traitList[0].currentSelection = optionDetail.traitList[0].defaultSelection;
            }
          });
          updatedState.currentSelections.totalExtraPrice = updatedState.currentSelections.totalExtraPrice - oldExtraPrice + newExtraPrice;
          updatedState.currentSelections.totalCalories = updatedState.currentSelections.totalCalories - oldCalories + newCalories;
          
          return updatedState;
        }
        case "LIMIT": {
          const updatedState = structuredClone(state);
          const {
            maxSelection,
            minSelection,
            selectedCount
          } = updatedState.currentSelections.items[customRuleIdx];
          let oldExtraPrice = 0;
          let oldCalories = 0;
          let newExtraPrice = 0;
          let newCalories = 0;
          updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail, optionDetailIdx) => {
            if (optionDetail.optionId === optionId) {
              if (optionDetail.isSelected && selectedCount > minSelection) {
                // remove
                if (optionDetail.countType === "COUNTABLE") {
                  oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                  oldCalories = optionDetail.extraCalories * optionDetail.optionQuantity;
                } else if (optionDetail.countType === "UNCOUNTABLE") {
                    const quantityList = optionDetail.quantityDetail.quantityList;
                    const curIndex = optionDetail.quantityDetail.selectedIdx;
                    if (curIndex >= 0 && curIndex < quantityList.length) {
                      oldExtraPrice = optionDetail.extraPrice + quantityList[curIndex].extraPrice;
                      oldCalories = optionDetail.extraCalories + quantityList[curIndex].extraCalories;
                    }
                    // else throw exception
                }
                updatedState.currentSelections.totalExtraPrice -= oldExtraPrice;
                updatedState.currentSelections.totalCalories -= oldCalories;
                updatedState.currentSelections.items[customRuleIdx].selectedCount--;
                // init
                if (optionDetail.traitList[0])
                  optionDetail.traitList[0].currentSelection = optionDetail.traitList[0].defaultSelection;
                optionDetail.optionQuantity = optionDetail.defaultQuantity;
                optionDetail.quantityDetail.selectedIdx = updatedState.defaultSelections.items[customRuleIdx].optionList[optionDetailIdx].quantityDetail.selectedIdx;
                optionDetail.isSelected = false;
              }
              else if (!optionDetail.isSelected && selectedCount < maxSelection){
                // add
                newExtraPrice = optionDetail.extraPrice;
                newCalories = optionDetail.extraCalories;
                updatedState.currentSelections.totalExtraPrice += newExtraPrice;
                updatedState.currentSelections.totalCalories += newCalories;
                updatedState.currentSelections.items[customRuleIdx].selectedCount++;
                optionDetail.isSelected = true;
              }
            }
          })
          return updatedState;
        }
        case "FREE": {
          const updatedState = structuredClone(state);
          if (updatedState)
          updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail, optionDetailIdx) => {
            if (optionDetail.optionId === optionId) {
              if (optionDetail.isSelected) {
                console.log("TRUE");
                // remove
                let oldExtraPrice = 0;
                let oldCalories = 0;
                if (optionDetail.countType === "COUNTABLE") {
                  oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                  oldCalories = optionDetail.extraCalories * optionDetail.optionQuantity;
                } else if (optionDetail.countType === "UNCOUNTABLE") {
                  const quantityList = optionDetail.quantityDetail.quantityList;
                  const curIndex = optionDetail.quantityDetail.selectedIdx;
                  if (curIndex >= 0 && curIndex < quantityList.length) {
                    oldExtraPrice = optionDetail.extraPrice + quantityList[curIndex].extraPrice;
                    oldCalories = optionDetail.extraCalories + quantityList[curIndex].extraCalories;
                  }
                  // else throw exception
                }

                updatedState.currentSelections.totalExtraPrice -= oldExtraPrice;
                updatedState.currentSelections.totalCalories -= oldCalories;
                updatedState.currentSelections.items[customRuleIdx].selectedCount--;
                // init
                if (optionDetail.traitList[0])
                  optionDetail.traitList[0].currentSelection = optionDetail.traitList[0].defaultSelection;
                optionDetail.optionQuantity = optionDetail.defaultQuantity;
                optionDetail.quantityDetail.selectedIdx = updatedState.defaultSelections.items[customRuleIdx].optionList[optionDetailIdx].quantityDetail.selectedIdx;
                optionDetail.isSelected = false;
              }
              else {
                // add
                // manage trait
                // manage quantityDetail
                let newExtraPrice = optionDetail.extraPrice;
                let newCalories = optionDetail.extraCalories;
                updatedState.currentSelections.totalExtraPrice += newExtraPrice;
                updatedState.currentSelections.totalCalories += newCalories;
                updatedState.currentSelections.items[customRuleIdx].selectedCount++;
                optionDetail.isSelected = true;
              }
            }
          });
          return updatedState;
        }
        default:
          return state;
      }
    }
    case ACTIONS.MODIFY_TRAIT: {
      const {
        customRuleIdx,
        optionId,
        optionTrait,
      } = action.payload;
      const updatedState = structuredClone(state);
      const optionTraitType = optionTrait.traitType;
      updatedState.currentSelections.items[customRuleIdx].optionList.forEach((optionDetail) => {
        if (optionDetail.optionId === optionId && optionTraitType === "BINARY") {
          optionDetail.traitList[0].currentSelection = optionDetail.traitList[0].currentSelection === 0 ? 1 : 0;
        }
      })
      return updatedState;
    }
    case ACTIONS.LOAD_OPTIONS: {
      const updatedState = structuredClone(state);
      const optionResponses = action.payload.optionResponse;
      console.log("OPTION_RESPONSE", optionResponses);
      const customRuleList = [];
      let totalCalories = 0;
      
      optionResponses.forEach((optionResponse) => {
        const customRuleIdx = optionResponse.customRuleResponse.orderIndex;
        const quantityList = optionResponse.quantityDetailResponses.map(quantityResponse => ({
          quantityId: quantityResponse.id,
          extraPrice: quantityResponse.extraPrice,
          extraCalories: quantityResponse.extraCalories,
          isDefault: quantityResponse.isDefault,
          labelCode: quantityResponse.labelCode,
          quantityType: quantityResponse.quantityType
        }));
        
        const selectedIdx = optionResponse.quantityDetailResponses.findIndex(quantityDetail => quantityDetail.isDefault === true);
        const quantityDetail = {
          quantityList: quantityList,
          selectedIdx: selectedIdx !== -1 ? selectedIdx : null
        }

        const traitList = optionResponse.optionTraitResponses.map(optionTraitResponse => ({
          traitId: optionTraitResponse.productOptionTraitId,
          currentSelection: optionTraitResponse.defaultSelection,
          defaultSelection: optionTraitResponse.defaultSelection,
          extraCalories: optionTraitResponse.extraCalories,
          extraPrice: optionTraitResponse.extraPrice,
          labelCode: optionTraitResponse.labelCode,
          traitName: optionTraitResponse.name,
          traitType: optionTraitResponse.optionTraitType,
          calculatedPrice: 0
        }));

        const optionObject = {
          optionId: optionResponse.productOptionId,
          orderIndex: optionResponse.orderIndex,
          optionName: optionResponse.name,
          extraCalories: optionResponse.calories,
          extraPrice: optionResponse.extraPrice,
          imageSource: optionResponse.imageSource,
          isDefault: optionResponse.isDefault,
          maxQuantity: optionResponse.maxQuantity,
          measureType: optionResponse.measureType,
          countType: optionResponse.countType,
          defaultQuantity: optionResponse.defaultQuantity,
          optionQuantity: optionResponse.defaultQuantity,
          isSelected: optionResponse.isDefault,
          traitList: traitList,
          quantityDetail: quantityDetail,
          calculatedPrice: 0
        };

        if (optionResponse.isDefault) {
          totalCalories += optionResponse.calories;
        }
        if (!customRuleList[customRuleIdx]) {
          const customRuleId = optionResponse.customRuleResponse.customRuleId;
          const customRuleName = optionResponse.customRuleResponse.name;
          const customRuleType = optionResponse.customRuleResponse.customRuleType;
          const maxSelection = optionResponse.customRuleResponse.maxSelection;
          const minSelection = optionResponse.customRuleResponse.minSelection;
          const orderIndex = optionResponse.customRuleResponse.orderIndex;
          customRuleList[customRuleIdx] = {
            customRuleId: customRuleId,
            customRuleName: customRuleName,
            customRuleType: customRuleType,
            optionList: [],
            maxSelection: maxSelection,
            minSelection: minSelection,
            selectedCount: 0,
            orderIndex: orderIndex,
            calculatedPrice: 0
          };
        }
        
        customRuleList[customRuleIdx].optionList.push(optionObject);
        if (optionResponse.isDefault)
          customRuleList[customRuleIdx].selectedCount++;
      });
      updatedState.currentSelections.items = structuredClone(customRuleList);
      updatedState.defaultSelections.items = structuredClone(customRuleList);
      updatedState.currentSelections.totalCalories = totalCalories;
      updatedState.defaultSelections.totalCalories = totalCalories;
      return updatedState;
    }
    case ACTIONS.LOAD_FROM_CART: {
      const updatedState = structuredClone(state);
      console.log("US", updatedState);

      const cartIdx = action.payload.cartIdx;
      const cartItem = cartState.cartList[cartIdx]

      console.log("CART_ITEM", cartItem);

      const totalExtraPrice = cartItem.product.productExtraPrice;
      const customRules = cartItem.product.customRules.map(customRule => {
        let selectedCount = 0;
        const optionList = customRule.productOptions.map(option => {
          const traitList = option.productOptionTraits.map(trait => {
            return {
              traitId: trait.traitId,
              currentSelection: trait.currentValue,
              defaultSelection: trait.defaultSelection,
              extraCalories: trait.baseCalories,
              extraPrice: trait.basePrice,
              labelCode: trait.labelCode,
              traitName: trait.optionTraitName,
              traitType: trait.optionTraitType,
              calculatedPrice: trait.calculatedPrice
            };
          });

          if (option.isSelected)
            selectedCount++;

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
          }
        });
        return {
          customRuleId: customRule.customRuleId,
          customRuleName: customRule.customRuleName,
          customRuleType: customRule.customRuleType,
          maxSelection: customRule.maxSelection,
          minSelection: customRule.minSelection,
          optionList: optionList,
          orderIndex: customRule.orderIndex,
          selectedCount: selectedCount,
          calculatedPrice: customRule.calculatedPrice,
        }
      });

      updatedState.currentSelections.items = structuredClone(customRules);
      updatedState.savedSelections.items = structuredClone(customRules);
      updatedState.currentSelections.totalExtraPrice = totalExtraPrice;
      updatedState.savedSelections.totalExtraPrice = totalExtraPrice;
      updatedState.currentSelections.totalCalories = 0;
      updatedState.savedSelections.totalCalories = 0;
      return updatedState;
    }
    case ACTIONS.SET_DEFAULT_FROM_CART: {
      const updatedState = structuredClone(state);
      console.log("US", updatedState);

      const cartIdx = action.payload.cartIdx;
      const cartItem = cartState.cartList[cartIdx]

      console.log("CART_ITEM", cartItem);

      const customRules = cartItem.product.customRules.map(customRule => {
        let selectedCount = 0;
        const optionList = customRule.productOptions.map(option => {
          const traitList = option.productOptionTraits.map(trait => {
            return {
              traitId: trait.productOptionTraitId,
              currentSelection: trait.defaultSelection,
              defaultSelection: trait.defaultSelection,
              extraCalories: trait.baseCalories,
              extraPrice: trait.basePrice,
              labelCode: trait.labelCode,
              traitName: trait.optionTraitName,
              traitType: trait.optionTraitType,
              calculatedPrice: 0
            };
          });

          if (option.isDefault)
            selectedCount++;

          let quantityDetail;
          if (option.quantityDetail) {
            const defaultIdx = option.quantityDetail.quantityList.findIndex(quantityObj => quantityObj.isDefault);
            quantityDetail = {
              quantityList: option.quantityDetail.quantityList,
              selectedIdx: defaultIdx !== -1 ? defaultIdx : null
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
              optionQuantity: option.defaultQuantity,
              isSelected: option.isDefault,
              traitList: traitList,
              quantityDetail: quantityDetail,
              calculatedPrice: 0
          }
        });
        return {
          customRuleId: customRule.customRuleId,
          customRuleName: customRule.customRuleName,
          customRuleType: customRule.customRuleType,
          maxSelection: customRule.maxSelection,
          minSelection: customRule.minSelection,
          optionList: optionList,
          orderIndex: customRule.orderIndex,
          selectedCount: selectedCount,
          calculatedPrice: 0
        }
      });

      updatedState.defaultSelections.items = structuredClone(customRules);
      updatedState.defaultSelections.totalCalories = 0;
      return updatedState;
    }
    case ACTIONS.LOAD_DEFAULT: {
      const updatedState = structuredClone(state);
      updatedState.currentSelections = structuredClone(state.defaultSelections);
      return updatedState;
    }
    default:
      return state;
  }
}