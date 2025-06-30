import { ACTIONS } from "./actions";

export const selectedOptionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_OPTION:
      const elementId = action.payload.elementId;
      const option = action.payload.option;
      const quantityDetails = option.quantityDetails.map(quantity => {
        return {
          id: quantity.id,
          quantityType: quantity.quantityType,
          isSelected: false,
          isDefault: false,
          extraPrice: 0
        }
      });
      console.log("QD", quantityDetails);
      const nextIdx = state.length;
      const emptyOptionTrait = {
        elementId: null,
        optionTraitId: null,
        defaultSelection: null,
        extraPrice: null,
        extraCalories: null
      };
      const newOption = {
        elementId: elementId,
        optionId: option.optionId,
        optionName: option.optionName,
        optionCalories: option.optionCalories,
        imageSource: option.imageSource,
        quantityDetails: quantityDetails,
        isDefault: false,
        defaultQuantity: 1,
        maxQuantity: 1,
        extraPrice: 0,
        orderIndex: nextIdx,
        countType: "SINGLE",
        optionTrait: emptyOptionTrait
      };
      return [...state, newOption];
      
    case ACTIONS.SAVE_OPTION: {
      const optionDetail = action.payload.optionDetail;
      const optionTraitDetail = action.payload.optionTraitDetail;
      return state.map(((selectedOption, _selectedOptionIdx) => {
        return _selectedOptionIdx === action.payload.selectedOptionIdx 
          ? {
            ...selectedOption,
            isDefault: optionDetail.isDefault,
            defaultQuantity: optionDetail.defaultQuantity,
            maxQuantity: optionDetail.maxQuantity,
            extraPrice: optionDetail.extraPrice,
            orderIndex: optionDetail.orderIndex,
            countType: optionDetail.countType,
            measureType: optionDetail.measureType,
            measureValue: optionDetail.measureValue,
            quantityDetails: optionDetail.quantityDetails,
            optionTrait: {
              elementId: optionTraitDetail.elementId,
              optionTraitId: optionTraitDetail.optionTraitId,
              defaultSelection: optionTraitDetail.defaultSelection,
              optionTraitExtraPrice: optionTraitDetail.extraPrice,
              extraCalories: optionTraitDetail.extraCalories
            }
          }
          : selectedOption
        }
      ));
    } 
    case ACTIONS.DELETE_OPTION:
      var optionIdx = action.payload.optionIdx;
      switch (action.payload.deleteMethod) {
        case "grid":
          return state.filter((selectedOption, _) => selectedOption.elementId !== optionIdx); // filter by elementId
        case "button":
          return state.filter((_, idx) => idx !== optionIdx); // filter by index of array
        default:
          return state;
      }
    case ACTIONS.LOAD_OPTION:
    case ACTIONS.INIT_SELECTED_OPTIONS:
      return [];
    case ACTIONS.LOAD_SELECTED_OPTIONS:
      const selectedOptions = action.payload.selectedOptions;
      return selectedOptions;
    default:
      return state;
  }
}