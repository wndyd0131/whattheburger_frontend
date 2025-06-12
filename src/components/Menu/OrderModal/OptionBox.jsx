import { useContext } from "react";
import { OptionContext } from "./contexts/OptionContext";
import OptionCard from "./OptionCard";
import OptionDetail from "./OptionDetail";
import { OrderContext } from "./contexts/OrderContext";

const OptionBox = ({customRule, customRuleIdx, option, optionIdx}) => {

  const {
    optionState,
    dispatchRoot
  } = useContext(OrderContext);

  return (
    <OptionContext.Provider value={{
      customRule: customRule,
      customRuleIdx: customRuleIdx,
      option: option,
      optionIdx: optionIdx,
      optionState: optionState,
      dispatchRoot: dispatchRoot
    }}
    >
      <div className="flex justify-center p-5">
        <div className="flex flex-col">
          <OptionCard/>
          <OptionDetail/>
        </div>
      </div>
    </OptionContext.Provider>
  );
}

export default OptionBox;