import { useContext } from "react";
import { OptionContext } from "./OrderModal/contexts/OptionContext";
import { ACTIONS } from "../../reducers/Menu/actions";

const TraitModifier = ({optionTrait, optionTraitIdx}) => {

  const {
    customRule,
    option,
    dispatchOption
  } = useContext(OptionContext);

  const handleClickToggleButton = (customRule, option, optionTrait) => {
    dispatchOption({
      type: ACTIONS.MODIFY_TRAIT,
      payload: {
        customRule,
        option,
        optionTrait
      }
    })
  }
  
  switch(optionTrait.labelCode) {
    case "TBS":
      const currentSelection = optionTrait.currentSelection;
      return (
        <div className="flex items-center">
          <p>Toast Both Sides</p>
          <div className={`min-w-[35px] h-[20px] border-[1px] border-gray-300 rounded-[30px] cursor-pointer ml-[10px] transition-colors duration-500 ease-in] overflow-hidden ${currentSelection == 1 ? "bg-[#FE7800]" : ""}`} onClick={() => handleClickToggleButton(customRule, option, optionTrait)}>
            <div className={`rounded-full w-[19px] h-[19px] bg-gray-200 transform duration-200 ease-in ${currentSelection === 1 ? "translate-x-[14.7px]" : ""}`}></div>
          </div>
        </div>
      );
    default:
      return <></>
  }
}

export default TraitModifier;