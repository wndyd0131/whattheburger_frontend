import { useContext } from "react";
import { MenuCreateContext } from "../../../pages/MenuCreate";
import { ACTIONS } from "../../../reducers/MenuCreate/actions";

const DecisionFooter = () => {

  const {
    selectedOptionState,
    selectedOptionDispatch,
    customRuleDispatch,
    selectedCustomRuleIdx,
    setSelectedCustomRuleIdx
  } = useContext(MenuCreateContext);

  const handleClickSaveButton = () => {
    customRuleDispatch({
      type: ACTIONS.SAVE_CUSTOMRULE,
      payload: {
        selectedCustomRuleIdx: selectedCustomRuleIdx,
        selectedOptionState: selectedOptionState
      }
    });

    closeOptionModal();
    // successfully saved notification
  }

  const handleClickCancelButton = () => {
    selectedOptionDispatch({
      type: ACTIONS.INIT_SELECTED_OPTIONS
    });
    closeOptionModal();
  }
  
  const closeOptionModal = () => {
    selectedOptionDispatch
    setSelectedCustomRuleIdx(null);
  }

  return (
    <div className="flex justify-end items-center h-[100px] bg-[#FE7800] py-[30px] gap-[20px]">
      <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickSaveButton()}>Save</button>
      <button className="flex justify-center items-center h-[35px] w-[60px] border-1 border-[rgb(225,225,225)] rounded-[4px] bg-white cursor-pointer" onClick={() => handleClickCancelButton()}>Cancel</button>
    </div>
  );
}

export default DecisionFooter;