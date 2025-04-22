import { useContext } from "react";
import { MenuContext } from "../../../pages/MenuCreate";
import { SelectedOptionContext } from "../OptionModal/OptionModal";
import { ACTIONS } from "../../../pages/MenuCreate";

const OptionDetailFooter = () => {

  const {
    optionTraits
  } = useContext(MenuContext);

  const {
    selectedOptionDispatch,
    formData,
    setFormData,
    selectedOptionIdx,
    setSelectedOptionIdx,
    selectedOptionTraitIdx
  } = useContext(SelectedOptionContext);

  const handleClickSaveButton = () => {
    console.log("SAVE", optionTraits);
    console.log(selectedOptionTraitIdx);

    const optionTraitDetail = {
      elementId: selectedOptionTraitIdx,
      defaultSelection: formData.defaultSelection,
      extraPrice: formData.optionTraitExtraPrice,
      extraCalories: formData.optionTraitExtraCalories
    }

    const optionDetail = {
      isDefault: formData.isDefault,
      defaultQuantity: formData.defaultQuantity,
      maxQuantity: formData.maxQuantity,
      extraPrice: formData.extraPrice,
      orderIndex: formData.orderIndex,
      measureTypeButton: formData.measureTypeButton,
      measureType: formData.measureType,
      measureValue: formData.measureValue,
    }

    selectedOptionDispatch({
      type: ACTIONS.SAVE_OPTION,
      payload: {
        selectedOptionIdx: selectedOptionIdx,
        optionDetail: optionDetail,
        optionTraitDetail: optionTraitDetail
      }
    });

    setFormData(null);
    setSelectedOptionIdx(null);
  }

  const handleClickCancelButton = () => {
    setFormData(null);
    setSelectedOptionIdx(null);
  }

  return (
    <div className="flex justify-center items-center h-[70px] border-t-1 border-[rgb(225,225,225)] gap-[50px]">
      <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickSaveButton()}>Save</button>
      <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickCancelButton()}>Cancel</button>
    </div>
  );
}

export default OptionDetailFooter;