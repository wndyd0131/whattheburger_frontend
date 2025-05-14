import { useContext } from "react";
import { OptionContext } from "./contexts/OptionContext";
import { ACTIONS } from "../../../reducers/Menu/actions";

const OptionCard = () => {
  
  const {
    customRule,
    customRuleIdx,
    option,
    dispatchOrder
  } = useContext(OptionContext);

  const extraPrice = option ? option.extraPrice * option.optionQuantity : option.extraPrice;
  const calories = option ? option.calories * option.optionQuantity : option.calories;
  const extraPriceText = extraPrice > 0 ? `$${extraPrice.toFixed(2)}` : "No Extra Charge";

  const handleClickOptionCard = () => {
    const customRuleType = customRule.customRuleType;
    dispatchOrder({
      type: ACTIONS.MODIFY_SELECTION,
      payload: {
        customRuleIdx: customRuleIdx,
        customRuleType: customRuleType,
        optionId: option.optionId
      }
    });
  }

  return (
    <div
      className={`border-1 border-[rgb(225,225,225)] w-[200px] h-[270px] rounded-2xl cursor-pointer transition ${option.isSelected ? "bg-amber-400 hover:bg-amber-500" : "hover:bg-gray-100"}`}
      onClick={() => handleClickOptionCard()}  
    >
      <div className="flex min-h-[150px] w-full"></div> {/* image */}
      <div className="flex flex-col flex-grow justify-center p-2">
        <span className="text-[17px]"><strong>{option.name}</strong></span>
        <p>{extraPriceText}</p>
        <p>{calories}Cal</p>
      </div>
    </div>
  );
}

export default OptionCard;