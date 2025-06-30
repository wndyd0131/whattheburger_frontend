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
        }
      };
      return updatedState;
    }
    case ACTIONS.MODIFY_QUANTITY: {
      const {
        customRuleIdx,
        productOptionId,
        modifyType
      } = action.payload;
      const updatedState = structuredClone(state);
      switch (modifyType) {
        case 'PLUS': {
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
            if (optionDetail.productOptionId === productOptionId && optionDetail.optionQuantity < optionDetail.maxQuantity) {
              let extraPrice = optionDetail.extraPrice;
              let calories = optionDetail.calories;
              let currentQuantity = optionDetail.optionQuantity;
              let defaultQuantity = optionDetail.defaultQuantity;
              optionDetail.optionQuantity++;
              if (currentQuantity >= defaultQuantity) {
                updatedState.currentSelections.totalExtraPrice += extraPrice;
              }
              updatedState.currentSelections.totalCalories += calories;
            }
          });
          return updatedState;
        }
        case 'MINUS': {
          const minQuantity = 1;
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
            if (optionDetail.productOptionId === productOptionId && optionDetail.optionQuantity > minQuantity) {
              let extraPrice = optionDetail.extraPrice;
              let calories = optionDetail.calories;
              let currentQuantity = optionDetail.optionQuantity;
              let defaultQuantity = optionDetail.defaultQuantity;
              optionDetail.optionQuantity--;
              if (currentQuantity > defaultQuantity) {
                updatedState.currentSelections.totalExtraPrice -= extraPrice;
              }
              updatedState.currentSelections.totalCalories -= calories;
            }
          });
          return updatedState;
        }
        case 'DISCRETE': {
          const {
            index
          } = action.payload;
          console.log("INDEX", index);
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
            if (optionDetail.productOptionId === productOptionId) {
              const quantityList = optionDetail.quantityDetail.quantityList;
              if (index >= 0 && index < quantityList.length) {
                const curIndex = optionDetail.quantityDetail.isSelected;
                const oldPrice = quantityList[curIndex].extraPrice;
                optionDetail.quantityDetail.isSelected = index;
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
        productOptionId,
      } = action.payload;
      const updatedState = structuredClone(state);
      switch(customRuleType) {
        case "UNIQUE": {
          let oldExtraPrice = 0;
          let oldCalories = 0;
          let newExtraPrice = 0;
          let newCalories = 0;
          console.log("US", updatedState);
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail, optionDetailIdx) => {
            if (optionDetail.isSelected) {
              if (optionDetail.countType === "COUNTABLE") {
                oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                oldCalories = optionDetail.calories * optionDetail.optionQuantity;
              } else if (optionDetail.countType === "UNCOUNTABLE") {
                  const quantityList = optionDetail.quantityDetail.quantityList;
                  const curIndex = optionDetail.quantityDetail.isSelected;
                  if (curIndex >= 0 && curIndex < quantityList.length) {
                    oldExtraPrice = optionDetail.extraPrice + quantityList[curIndex].extraPrice;
                    oldCalories = optionDetail.extraCalories + quantityList[curIndex].extraCalories;
                  }
                  // else throw exception
              }
            }
            if (optionDetail.productOptionId === productOptionId) {
              optionDetail.isSelected = true;
              newExtraPrice = optionDetail.extraPrice;
              newCalories = optionDetail.calories;
            } else { // initialize to default setting
              optionDetail.isSelected = false;
              optionDetail.optionQuantity = optionDetail.defaultQuantity;
              optionDetail.quantityDetail.isSelected = updatedState.defaultSelections.items[customRuleIdx].optionDetails[optionDetailIdx].quantityDetail.isSelected;


              if (optionDetail.optionTraitResponses[0])
                optionDetail.optionTraitResponses[0].currentSelection = optionDetail.optionTraitResponses[0].defaultSelection;
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
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail, optionDetailIdx) => {
            if (optionDetail.productOptionId === productOptionId) {
              if (optionDetail.isSelected && selectedCount > minSelection) {
                // remove
                if (optionDetail.countType === "COUNTABLE") {
                  oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                  oldCalories = optionDetail.calories * optionDetail.optionQuantity;
                } else if (optionDetail.countType === "UNCOUNTABLE") {
                    const quantityList = optionDetail.quantityDetail.quantityList;
                    const curIndex = optionDetail.quantityDetail.isSelected;
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
                if (optionDetail.optionTraitResponses[0])
                  optionDetail.optionTraitResponses[0].currentSelection = optionDetail.optionTraitResponses[0].defaultSelection;
                optionDetail.optionQuantity = optionDetail.defaultQuantity;
                optionDetail.quantityDetail.isSelected = updatedState.defaultSelections.items[customRuleIdx].optionDetails[optionDetailIdx].quantityDetail.isSelected;
                optionDetail.isSelected = false;
              }
              else if (!optionDetail.isSelected && selectedCount < maxSelection){
                // add
                let newExtraPrice = optionDetail.extraPrice;
                let newCalories = optionDetail.calories;
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
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail, optionDetailIdx) => {
            if (optionDetail.productOptionId === productOptionId) {
              if (optionDetail.isSelected) {
                // remove
                let oldExtraPrice = 0;
                let oldCalories = 0;
                if (optionDetail.countType === "COUNTABLE") {
                  oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                  oldCalories = optionDetail.calories * optionDetail.optionQuantity;
                } else if (optionDetail.countType === "UNCOUNTABLE") {
                  console.log("UNCOUNTABLE!");
                  const quantityList = optionDetail.quantityDetail.quantityList;
                  const curIndex = optionDetail.quantityDetail.isSelected;
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
                if (optionDetail.optionTraitResponses[0])
                  optionDetail.optionTraitResponses[0].currentSelection = optionDetail.optionTraitResponses[0].defaultSelection;
                optionDetail.optionQuantity = optionDetail.defaultQuantity;
                optionDetail.quantityDetail.isSelected = updatedState.defaultSelections.items[customRuleIdx].optionDetails[optionDetailIdx].quantityDetail.isSelected;
                optionDetail.isSelected = false;
              }
              else {
                // add
                let newExtraPrice = optionDetail.extraPrice;
                let newCalories = optionDetail.calories;
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
        productOptionId,
        optionTrait,
      } = action.payload;
      const updatedState = structuredClone(state);
      const optionTraitType = optionTrait.optionTraitType;
      updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
        if (optionDetail.productOptionId === productOptionId && optionTraitType === "BINARY") {
          optionDetail.optionTraitResponses[0].currentSelection = optionDetail.optionTraitResponses[0].currentSelection === 0 ? 1 : 0;
        }
      })
      return updatedState;
    }
    case ACTIONS.LOAD_OPTIONS: {
      const updatedState = structuredClone(state);
      const optionResponse = action.payload.optionResponse;
      console.log("OPTION_RESPONSE", optionResponse);
      const customRules = [];
      let totalCalories = 0;
      
      optionResponse.forEach((option) => {
        const customRuleIdx = option.customRuleResponse.orderIndex;
        const selectedIdx = option.quantityDetailResponses.findIndex(quantityDetail => quantityDetail.isDefault === true);
        const quantityDetail = {
          quantityList: option.quantityDetailResponses,
          isSelected: selectedIdx !== -1 ? selectedIdx : null
        }

        const optionDetailObject = {
          ...option,
          optionQuantity: option.defaultQuantity,
          quantityDetail: quantityDetail,
          isSelected: false
        };
        if (!customRules[customRuleIdx]) {
          const customRuleId = option.customRuleResponse.customRuleId;
          const customRuleName = option.customRuleResponse.name;
          const customRuleType = option.customRuleResponse.customRuleType;
          const maxSelection = option.customRuleResponse.maxSelection;
          const minSelection = option.customRuleResponse.minSelection;
          customRules[customRuleIdx] = {
            customRuleId: customRuleId,
            customRuleName: customRuleName,
            customRuleType: customRuleType,
            optionDetails: [],
            maxSelection: maxSelection,
            minSelection: minSelection,
            selectedCount: 0
          };
        }
        optionDetailObject.optionTraitResponses.forEach((optionTraitResponse) => {
          optionTraitResponse.currentSelection = optionTraitResponse.defaultSelection;
        });
        
        if (optionDetailObject.isDefault) {
          optionDetailObject.isSelected = true;
          customRules[customRuleIdx].selectedCount++;
          totalCalories += optionDetailObject.calories;
        }
        customRules[customRuleIdx].optionDetails.push(optionDetailObject);
      });
      updatedState.currentSelections.items = structuredClone(customRules);
      updatedState.defaultSelections.items = structuredClone(customRules);
      updatedState.currentSelections.totalCalories = totalCalories;
      updatedState.defaultSelections.totalCalories = totalCalories;
      console.log("UUSS", updatedState);
      return updatedState;
    }
    case ACTIONS.LOAD_FROM_CART: {
      const updatedState = structuredClone(state);
      
      // make productOptionMap from option {productOptionId: customRuleIdx, productOptionIdx, isSelected, optionQuantity}
      // make productOptionTraitMap from option {productOptionTraitId: customRuleIdx, productOptionIdx, productOptionTraitIdx, currentValue}
      // loop through cart and update option
        // if option does not exist -> exception
        // if option exists -> update
      const productOptionMap = {};
      const productOptionTraitMap = {};

      const cartIdx = action.payload.cartIdx;
      const cartItem = cartState.cartList[cartIdx]
      
      updatedState.currentSelections.items.forEach((customRule, customRuleIdx) => {
        customRule.selectedCount = 0;
        customRule.optionDetails.forEach((option, optionIdx) => {
          const productOptionId = option.productOptionId;
          productOptionMap[productOptionId] = {
            customRuleIdx: customRuleIdx,
            optionIdx: optionIdx,
          }
          option.optionTraitResponses.forEach((optionTrait, optionTraitIdx) => {
            const productOptionTraitId = optionTrait.productOptionTraitId;
            productOptionTraitMap[productOptionTraitId] = {
              customRuleIdx: customRuleIdx,
              optionIdx: optionIdx,
              optionTraitIdx: optionTraitIdx,
            }
          });
        });
      })

      cartItem.customRules.forEach((customRule) => {
        customRule.productOptions.forEach(option => {
          const productOptionId = option.productOptionId;
          if (productOptionMap[productOptionId]) {
            const {
              customRuleIdx,
              optionIdx
            } = productOptionMap[productOptionId];
            const isSelected = option.isSelected;
            const optionQuantity = option.optionQuantity;
            updatedState.currentSelections.items[customRuleIdx].optionDetails[optionIdx].isSelected = isSelected;
            updatedState.currentSelections.items[customRuleIdx].optionDetails[optionIdx].optionQuantity = optionQuantity;
            if (isSelected)
              updatedState.currentSelections.items[customRuleIdx].selectedCount++;
          } else {
            console.error("ProductOption does not exist");
          }
          option.productOptionTraits.forEach(optionTrait => {
            const productOptionTraitId = optionTrait.productOptionTraitId;
            if (productOptionTraitMap[productOptionTraitId]) {
              const {
                customRuleIdx,
                optionIdx,
                optionTraitIdx
              } = productOptionTraitMap[productOptionTraitId];
              const currentValue = optionTrait.currentValue;
              updatedState.currentSelections.items[customRuleIdx].optionDetails[optionIdx].optionTraitResponses[optionTraitIdx].currentSelection = currentValue;
            } else {
              console.error("OptionTrait does not exist")
            }
          });
        });
      });
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