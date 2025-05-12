import { useContext } from "react";
import { MenuContext } from "../../../contexts/MenuContext";

const OrderSummaryDetail = ({setConfirmModalOpened}) => {
  const {
    orderState
  } = useContext(MenuContext);

  const handleClickDefaultButton = () => {
    setConfirmModalOpened(true);
  }

  return (
    <div className="flex flex-col relative flex-grow p-[30px] overflow-y-auto border-t-1 border-[rgb(197,197,197)]">
      <div className="flex flex-col absolute top-[20px] right-[0px]">
        <div className="flex justify-center items-center w-[70px] h-[30px] rounded-[20px] text-[15px] text-white bg-[#FE7800] my-[10px] cursor-pointer" onClick={() => handleClickDefaultButton()}>
          default
        </div>
      </div>
      <h2 className="flex self-center font-['Whatafont'] text-[30px] text-[rgb(63,63,63)]">[Order Summary]</h2>
      <div className="flex flex-col flex-grow pt-[10px] pl-[30px]">
        <ul>
          {orderState.selections.items.map((customRule, idx) => {
            if (customRule.totalCount > 0) {
              return (
                <div className="flex flex-col gap-[5px] mb-[15px]" key={idx}>
                  <h3 className="font-['Whatafont'] text-[#FE7800] text-[25px] underline">{customRule.customRuleName}</h3>
                  {customRule.optionDetails.map((option, idx) => 
                    option ? 
                    <li className="font-['Whatafont']" key={idx}>
                      {option.name} {option.optionQuantity > 1 ? `(x${option.optionQuantity})` : ""}
                        {option.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
                          if (optionTrait.name === "UCNT") {
                            if (optionTrait.currentSelection == 1) {
                              return (
                                <div key={optionTraitIdx} className="inline-block justify-center items-center py-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(86,193,220)]">Easy</div>
                              );
                            } else if (optionTrait.currentSelection == 2) {
                              return (
                                <div key={optionTraitIdx} className="inline-block justify-center items-center py-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[#FE7800]">Regular</div>
                              );
                            } else {
                              return (
                                <div key={optionTraitIdx} className="inline-block justify-center items-center py-[10px] max-w-[100px] h-[20px] rounded-[20px] text-[15px] text-white bg-[rgb(255,32,103)]">Extra</div>
                              );
                            }
                          } else if (optionTrait.name === "TBS") {
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