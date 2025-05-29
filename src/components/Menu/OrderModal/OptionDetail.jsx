import { useContext } from "react";
import TraitModifier from "../TraitModifier";
import CountModifier from "../CountModifier";
import { OrderContext } from "./contexts/OrderContext";
import { OptionContext } from "./contexts/OptionContext";

const OptionDetail = () => {

  const {
    option,
    dispatchOrder
  } = useContext(OptionContext);

  return (
  <div className="flex flex-col gap-y-2 items-center min-h-[70px] pt-5">
    <CountModifier/>
    {option.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
      return (
        <TraitModifier key={optionTraitIdx} optionTrait={optionTrait} optionTraitIdx={optionTraitIdx}/>
      );
    })}
  </div>
  );
}

export default OptionDetail;