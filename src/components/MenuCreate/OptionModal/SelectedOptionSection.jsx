import { useContext } from "react";
import { SelectedOptionContext } from "./OptionModal";
import { ACTIONS } from "../../../pages/MenuCreate";

const SelectedOptionSection = () => {

  const {
    selectedOptionState,
    selectedOptionDispatch,
    setSelectedOptionIdx,
    setSelectedOptionTraitIdx,
    formData,
    setFormData,
  } = useContext(SelectedOptionContext);

  const handleClickCustomButton = (optionIdx) => {
    console.log("SO!", selectedOptionState);
    const optionTraitIdx = selectedOptionState[optionIdx].optionTrait.elementId;
    console.log("OT", optionTraitIdx);

    setSelectedOptionIdx(optionIdx);
    setSelectedOptionTraitIdx(optionTraitIdx);
    setFormData({
      isDefault: selectedOptionState[optionIdx].isDefault,
      defaultQuantity: selectedOptionState[optionIdx].defaultQuantity,
      maxQuantity: selectedOptionState[optionIdx].maxQuantity,
      extraPrice: selectedOptionState[optionIdx].extraPrice,
      orderIndex: selectedOptionState[optionIdx].orderIndex,
      measureTypeButton: selectedOptionState[optionIdx].measureTypeButton,
      measureType: selectedOptionState[optionIdx].measureType,
      measureValue: selectedOptionState[optionIdx].measureValue,
      defaultSelection: selectedOptionState[optionIdx].optionTrait.defaultSelection,
      optionTraitExtraPrice: selectedOptionState[optionIdx].optionTrait.extraPrice,
      optionTraitExtraCalories: selectedOptionState[optionIdx].optionTrait.extraCalories
    });
  }

  const handleClickDeleteButton = (optionIdx) => {
    selectedOptionDispatch({
      type: ACTIONS.DELETE_OPTION,
      payload: {
        optionIdx: optionIdx,
        deleteMethod: "button"
      }
    });
  }

  return (
    <div className="flex items-center h-[250px] bg-[rgb(244,244,244)] overflow-x-auto px-[40px] gap-[20px]">
    {selectedOptionState.map((selectedOption, _selectedOptionIdx) => {
      return (
        <div key={_selectedOptionIdx} className="flex flex-col border-1 border-[rgb(225,225,225)] min-w-[300px] min-h-[150px]">
          <div className="flex justify-center items-center flex-grow">
            <div className="w-[80px]">
            </div>
            <div className="flex flex-col items-center flex-grow">
              <p>{selectedOption.option.optionName}</p>
              <p>{selectedOption.option.optionCalories} Cal</p>
            </div>
          </div>
          <div className="flex justify-center items-center h-[60px] border-t-1 border-[rgb(225,225,225)] gap-[30px]">
            <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickCustomButton(_selectedOptionIdx)}>Custom</button>
            <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickDeleteButton(_selectedOptionIdx)}>Delete</button>
          </div>
        </div>
      );

    })}
  </div>
  );
}

export default SelectedOptionSection;