import { useContext } from "react";
import OptionBox from "./OptionBox";
import { OrderContext } from "./contexts/OrderContext";

const OrderCustomize = () => {

  const {
    orderState,
  } = useContext(OrderContext);

  return (
    <div className="flex flex-col basis-3/4">
      <div className="start-customize-container"></div>
      <div className="order-customize-container">
        {orderState.currentSelections.items.map((customRule, customRuleIdx) => 
          <div key={customRuleIdx}>
            <h1>{customRule.customRuleName}</h1>
            <div className="grid border-1 xl:grid-cols-3 2xl:grid-cols-4 border-[rgb(225,225,225)] overflow-auto px-5">
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