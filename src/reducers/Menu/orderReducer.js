import { ACTIONS } from "./actions";

export const orderReducer = (state, action) => {
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
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
            if (optionDetail.isSelected) {
              oldExtraPrice = optionDetail.extraPrice;
              oldCalories = optionDetail.calories;
            }
            if (optionDetail.optionId === optionId) {
              optionDetail.isSelected = true;
              newExtraPrice = optionDetail.extraPrice;
              newCalories = optionDetail.calories;
            } else {
              optionDetail.isSelected = false;
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
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
            if (optionDetail.optionId === optionId) {
              if (optionDetail.isSelected && selectedCount > minSelection) {
                let oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                let oldCalories = optionDetail.calories * optionDetail.optionQuantity;
                updatedState.currentSelections.totalExtraPrice -= oldExtraPrice;
                updatedState.currentSelections.totalCalories -= oldCalories;
                updatedState.currentSelections.items[customRuleIdx].selectedCount--;
                optionDetail.isSelected = false;
              }
              else if (!optionDetail.isSelected && selectedCount < maxSelection){
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
          updatedState.currentSelections.items[customRuleIdx].optionDetails.forEach((optionDetail) => {
            if (optionDetail.optionId === optionId) {
              if (optionDetail.isSelected) {
                let oldExtraPrice = optionDetail.extraPrice * optionDetail.optionQuantity;
                let oldCalories = optionDetail.calories * optionDetail.optionQuantity;
                updatedState.currentSelections.totalExtraPrice -= oldExtraPrice;
                updatedState.currentSelections.totalCalories -= oldCalories;
                updatedState.currentSelections.selectedCount--;
                optionDetail.isSelected = false;
              }
              else {
                let newExtraPrice = optionDetail.extraPrice;
                let newCalories = optionDetail.calories;
                updatedState.currentSelections.totalExtraPrice += newExtraPrice;
                updatedState.currentSelections.totalCalories += newCalories;
                updatedState.currentSelections.selectedCount++;
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
    case ACTIONS.LOAD_OPTIONS: {
      console.log("LOADED: ", state);
      const updatedState = structuredClone(state);
      const optionResponse = action.payload.optionResponse;
      console.log("O_RESPONSE", optionResponse);
      const customRules = [];
      let totalCalories = 0;
      
      optionResponse.forEach((option) => {
        const customRuleIdx = option.customRuleResponse.orderIndex;
        
        const optionDetailObject = {
          ...option,
          optionQuantity: option.defaultQuantity,
          isSelected: false
        };
        if (!customRules[customRuleIdx]) {
          const customRuleName = option.customRuleResponse.name;
          const customRuleType = option.customRuleResponse.customRuleType;
          const maxSelection = option.customRuleResponse.maxSelection;
          const minSelection = option.customRuleResponse.minSelection;
          customRules[customRuleIdx] = {
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
      updatedState.currentSelections.items = customRules;
      updatedState.defaultSelections.items = customRules;
      updatedState.currentSelections.totalCalories = totalCalories;
      updatedState.defaultSelections.totalCalories = totalCalories;
      return updatedState;
    }
    case ACTIONS.LOAD_DEFAULT: {
      const updatedState = structuredClone(state);
      updatedState.currentSelections = updatedState.defaultSelections;
      return updatedState;
    }
    default:
      return state;
  }
}