import { useContext } from "react";
import { MenuContext } from "../../../pages/MenuCreate";
import { ACTIONS } from "../../../pages/MenuCreate";
import { SelectedOptionContext } from "./OptionModal";

const DecisionFooter = () => {

  const {
    customRuleDispatch,
    customRules, // temporary
    selectedOptions,
    selectedCustomRuleIdx,
    setCustomRules,
    setSelectedOptions,
    setSelectedCustomRuleIdx
  } = useContext(MenuContext);

  const {
    selectedOptionState
  } = useContext(SelectedOptionContext);

  const handleClickSaveButton = () => {
    console.log("HI", ACTIONS.SAVE_CUSTOMRULE);
    customRuleDispatch({
      type: ACTIONS.SAVE_CUSTOMRULE,
      payload: {
        selectedCustomRuleIdx: selectedCustomRuleIdx,
        selectedOptionState: selectedOptionState
      }
    });
    console.log(customRules);
    console.log(selectedCustomRuleIdx);
    const updatedcustomRules = structuredClone(customRules);
    updatedcustomRules[selectedCustomRuleIdx].options = selectedOptions;
    setCustomRules(updatedcustomRules);
    closeOptionModal();
    // successfully saved notification
  }

  const handleClickCancelButton = () => {
    closeOptionModal();
  }
  
  const closeOptionModal = () => {
    setSelectedOptions([]);
    setSelectedCustomRuleIdx("");
  }

  return (
    <div className="flex justify-end items-center h-[100px] bg-[#FE7800] py-[30px] gap-[20px]">
      <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickSaveButton()}>Save</button>
      <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickCancelButton()}>Cancel</button>
    </div>
  );
}

export default DecisionFooter;