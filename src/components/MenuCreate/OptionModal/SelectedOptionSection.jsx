import { useContext } from "react";
import { SelectedOptionContext } from "./OptionModal";
import { DndContext } from "@dnd-kit/core";
import { ACTIONS } from "../../../reducers/MenuCreate/actions";
import OptionDetailModal from "../OptionDetailModal/OptionDetailModal";

const SelectedOptionSection = () => {

  const {
    selectedOptionState,
    selectedOptionDispatch,
    selectedOptionIdx,
    setSelectedOptionIdx,
    setSelectedOptionTraitIdx,
    formData,
    setFormData,
  } = useContext(SelectedOptionContext);

  const handleClickCustomButton = (optionIdx) => {
    const optionTraitIdx = selectedOptionState[optionIdx].optionTrait.elementId;

    setSelectedOptionIdx(optionIdx);
    setSelectedOptionTraitIdx(optionTraitIdx);
    setFormData({
      isDefault: selectedOptionState[optionIdx].isDefault,
      defaultQuantity: selectedOptionState[optionIdx].defaultQuantity,
      maxQuantity: selectedOptionState[optionIdx].maxQuantity,
      extraPrice: selectedOptionState[optionIdx].extraPrice,
      orderIndex: selectedOptionState[optionIdx].orderIndex,
      countType: selectedOptionState[optionIdx].countType,
      measureType: selectedOptionState[optionIdx].measureType,
      measureValue: selectedOptionState[optionIdx].measureValue,
      defaultSelection: selectedOptionState[optionIdx].optionTrait.defaultSelection,
      optionTraitExtraPrice: selectedOptionState[optionIdx].optionTrait.extraPrice,
      optionTraitExtraCalories: selectedOptionState[optionIdx].optionTrait.extraCalories,
      quantityDetails: selectedOptionState[optionIdx].quantityDetails
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

  const handleDragEnd = (e) => {
    const {active, over} = e;
    if (!over || active.id === over.id) return;
  }

  return (
    <>
      <div className="flex items-center h-[250px] bg-[rgb(244,244,244)] overflow-x-auto px-[40px] gap-[20px]">
        <DndContext onDragEnd={() => handleDragEnd()}>
          <div className="flex gap-10">
          {selectedOptionState.map((selectedOption, _selectedOptionIdx) => {
            return (
              <div key={_selectedOptionIdx} id={selectedOption.elementId} index={_selectedOptionIdx} className="flex flex-col h-[150px] w-[280px] border-1 border-[rgb(224,224,224)]">
                <div className="flex justify-center items-center flex-grow">
                  <div className="w-[80px]">
                  </div>
                  <div className="flex flex-col items-center flex-grow">
                    <p>{selectedOption.optionName}</p>
                    <p>{selectedOption.optionCalories} Cal</p>
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
        </DndContext>
      </div>
      {selectedOptionIdx !== null && 
        <OptionDetailModal/>
      }
    </>
  );
}

export default SelectedOptionSection;