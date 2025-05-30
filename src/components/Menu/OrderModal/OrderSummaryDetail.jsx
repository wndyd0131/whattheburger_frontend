import { useContext } from "react";
import { OrderContext } from "./contexts/OrderContext";
import CountLabel from "../CountLabel";

const OrderSummaryDetail = ({setConfirmModalOpened}) => {
  const {
    optionState
  } = useContext(OrderContext);

  const handleClickDefaultButton = () => {
    setConfirmModalOpened(true);
  }

  return (
    <div className="flex flex-col basis-3/6 relative p-[30px] overflow-y-auto border-t-1 border-[rgb(197,197,197)]">
      <div className="flex flex-col absolute top-[20px] right-[0px]">
        <div className="flex justify-center items-center w-[70px] h-[30px] rounded-[20px] text-[15px] text-white bg-[#FE7800] my-[10px] cursor-pointer" onClick={() => handleClickDefaultButton()}>
          default
        </div>
      </div>
      <h2 className="flex self-center font-['Whatthefont'] text-[30px] text-[rgb(63,63,63)]">[Order Summary]</h2>
      <div className="flex flex-col flex-grow pt-[10px] pl-[30px]">
        <ul>
          {optionState.currentSelections.items.map((customRule, customRuleIdx) => {
            {console.log("THAT GAME", customRule)}
            if (customRule.selectedCount > 0) {
              return (
                <div className="flex flex-col gap-[5px] mb-[15px]" key={customRuleIdx}>
                  <h3 className="font-['Whatthefont'] text-[#FE7800] text-[25px] underline">{customRule.customRuleName}</h3>
                  {console.log("THIS GAME", customRule)}
                  {customRule.optionDetails.map((optionDetail, optionDetailIdx) => 
                    optionDetail.isSelected ? 
                    <li className="flex gap-2 font-['Whatthefont']" key={optionDetailIdx}>
                      {optionDetail.name}
                      <CountLabel customRuleIdx={customRuleIdx} optionDetail={optionDetail} optionDetailIdx={optionDetailIdx}/>
                        {optionDetail.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
                          if (optionTrait.name === "TBS") {
                            return (
                              optionTrait.currentSelection == 1 ? 
                              <div key={optionTraitIdx} className="inline-block justify-center items-center py-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(113,47,0)]">TBS</div> : ""
                            );
                          }
                        })}
                      
                    </li> : ""
                  )}
                </div>
              );
            }

          }
          )}
        </ul>
      </div>
    </div>
  );
}

export default OrderSummaryDetail;