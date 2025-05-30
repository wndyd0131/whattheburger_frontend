import { useContext } from "react";
import { OptionContext } from "./OrderModal/contexts/OptionContext";
import { ACTIONS } from "../../reducers/Menu/actions";

const CountableModifier = () => {
  const {
    customRuleIdx,
    option,
    dispatchOption
  } = useContext(OptionContext);

  const handleClickPlusButton = (customRuleIdx, option) => {
    const modifyType = "PLUS";
    dispatchOption({
      type: ACTIONS.MODIFY_QUANTITY,
      payload: {
        customRuleIdx: customRuleIdx,
        optionId: option.optionId,
        modifyType: modifyType
      }
    });
  }

  const handleClickMinusButton = (customRuleIdx, option) => {
    const modifyType = "MINUS";
    dispatchOption({
      type: ACTIONS.MODIFY_QUANTITY,
      payload: {
        customRuleIdx: customRuleIdx,
        optionId: option.optionId,
        modifyType: modifyType
      }
    });
  }

  return (
    <div className="flex justify-between w-[160px] h-[40px]">
      <button
        className={`flex justify-center border-1 rounded-[5px] h-[30px] w-[50px] ${option.isSelected ? "border-[#FE7800] text-[#FE7800] cursor-pointer" : "bg-gray-100 text-gray-300"}`}
        onClick={() => handleClickMinusButton(customRuleIdx, option)}
        disabled={option.isSelected === false}
      >
        <strong>-</strong>
      </button>
      {option.isSelected &&
        <h3>
          {option.optionQuantity}
        </h3>
      }
      <button
        className={`flex justify-center border-1 rounded-[5px] h-[30px] w-[50px] ${option.isSelected ? "border-[#FE7800] text-[#FE7800] cursor-pointer" : "bg-gray-100 text-gray-300"}`}
        onClick={() => handleClickPlusButton(customRuleIdx, option)}
        disabled={option.isSelected === false}
      >
        <strong>+</strong>
      </button>
    </div>
  );
}

export default CountableModifier;