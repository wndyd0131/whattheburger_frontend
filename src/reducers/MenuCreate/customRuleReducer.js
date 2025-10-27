import { ACTIONS } from "./actions";

export const customRuleReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.ADD_CUSTOMRULE:
      return [
        ...state,
        {
          customRuleName: action.payload.customRuleName,
          customRuleType: action.payload.customRuleType,
          minSelection: action.payload.minSelection,
          maxSelection: action.payload.maxSelection,
          options: []
        }
      ];
    case ACTIONS.DELETE_CUSTOMRULE:
      return state.filter((_, idx) => idx !== action.payload.customRuleIdx);
      
    case ACTIONS.SAVE_CUSTOMRULE:
      return state.map((customRule, customRuleIdx) => 
        customRuleIdx === action.payload.selectedCustomRuleIdx
          ? {...customRule, options: action.payload.selectedOptionState} : customRule
      );
    default:
      return state;
  }
}