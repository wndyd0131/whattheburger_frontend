import { useState, useContext } from "react";
import OptionBox from "./OptionBox";
import { OrderContext } from "./contexts/OrderContext";
import { ACTIONS } from "../../../reducers/Option/actions";
import ConfirmModal from "./ConfirmModal";

const OrderCustomize = () => {

  const {
    optionState,
    dispatchRoot
  } = useContext(OrderContext);

  const confirmModalMessage = "Return to default setting?";

  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const handleClickDefaultButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmDefaultButton = () => {
    dispatchRoot({
      type: ACTIONS.LOAD_DEFAULT
    })
    setConfirmModalOpened(false);
  }

  return (
    <>
    {confirmModalOpened && 
    (
      <ConfirmModal setConfirmModalOpened={setConfirmModalOpened} message={confirmModalMessage} handlerFunction={handleConfirmDefaultButton}/>
    )}
    <div className="flex flex-col basis-3/4">
      <div className="start-customize-container"></div>
      <div className="order-customize-container">
        {optionState.currentSelections.items.map((customRule, customRuleIdx) => 
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
      <div className="flex flex-grow justify-around items-center border-t-1 border-t-gray-300">
        <button className="flex justify-center items-center w-[100px] h-[45px] rounded-lg text-[15px] text-white bg-[#FE7800] my-[10px] cursor-pointer" onClick={() => handleClickDefaultButton()}>
          default
        </button>
      </div>
    </div>
    </>
  );
}

export default OrderCustomize;