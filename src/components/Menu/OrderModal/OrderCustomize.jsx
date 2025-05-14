import { useContext } from "react";
import { MenuContext } from "../../../contexts/MenuContext";
import OptionBox from "./OptionBox";

const OrderCustomize = () => {

  const {
    orderState,
  } = useContext(MenuContext);

  return (
    <div className="flex flex-col basis-3/4">
      <div className="start-customize-container"></div>
      <div className="order-customize-container">
        {orderState.currentSelections.items.map((customRule, customRuleIdx) => 
          <div key={customRuleIdx}>
            <h1>{customRule.customRuleName}</h1>
            <div className="grid border-1 xl:grid-cols-3 2xl:grid-cols-5 border-[rgb(225,225,225)] overflow-auto">
              {customRule.optionDetails.map((option, optionIdx) => 
                <OptionBox key={optionIdx} customRule={customRule} customRuleIdx={customRuleIdx} option={option} optionIdx={optionIdx}/>
              )}
            </div>
          </div>
        )}

      </div>
      <div className="finish-customize-container"></div>
    </div>
  );
}

export default OrderCustomize;