import { useContext } from "react";
import CountLabel from "../CountLabel";
import TraitLabel from "../TraitLabel";
import { LayoutContext } from "../../../contexts/LayoutContext";

const OrderSummaryDetail = () => {
  const {
    reducer: {
      rootState: {
        optionState,
      }
    }
  } = useContext(LayoutContext);

  return (
    <div className="flex flex-col basis-3/6 relative p-[30px] overflow-y-auto border-t-1 border-gray-300">
      <h2 className="flex self-center font-['Whatthefont'] text-[30px] text-[rgb(63,63,63)]">[Order Summary]</h2>
      <div className="flex flex-col flex-grow pt-[10px] pl-[30px]">
        <ul>
          {optionState.currentSelections.items.map((customRule, customRuleIdx) => {
            console.log("OrderSummaryDetail", optionState);
            if (customRule.selectedCount > 0) {
              return (
                <div className="flex flex-col gap-[5px] mb-[15px]" key={customRuleIdx}>
                  <h3 className="font-['Whatthefont'] text-[#FE7800] text-[25px] underline">{customRule.customRuleName}</h3>
                  {customRule.optionDetails.map((optionDetail, optionDetailIdx) => 
                    optionDetail.isSelected ? 
                    <li className="flex gap-2 font-['Whatthefont']" key={optionDetailIdx}>
                      {optionDetail.name}
                      <CountLabel customRuleIdx={customRuleIdx} optionDetail={optionDetail} optionDetailIdx={optionDetailIdx}/>
                      {optionDetail.optionTraitResponses.map((optionTrait, optionTraitIdx) => 
                        <TraitLabel key={optionTraitIdx} optionTrait={optionTrait}/>
                      )}
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