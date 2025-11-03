import { useContext } from "react";
import { MenuCreateContext } from "/src/components/Admin/MenuCreate";
import { ACTIONS } from "/src/reducers/MenuCreate/actions";

const Footer = () => {

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
    <div className="flex justify-center items-center h-[100px] bg-gradient-to-r from-amber-500 to-orange-500 pr-[30px] py-[30px] gap-[20px]">
      <button className="flex w-[100px] h-[50px] text-lg bg-white text-[#FE7800] border border-gray-200 rounded-md font-['Whatthefont'] justify-center self-center items-center cursor-pointer hover:bg-gray-100" onClick={() => handleClickSaveButton()}>Save</button>
      <button className="flex w-[100px] h-[50px] text-lg bg-white text-[#FE7800] border border-gray-200 rounded-md font-['Whatthefont'] justify-center self-center items-center cursor-pointer hover:bg-gray-100" onClick={() => handleClickCancelButton()}>Cancel</button>
    </div>
  );
}

export default Footer;