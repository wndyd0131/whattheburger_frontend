import { useContext } from "react";
import TraitModifier from "../TraitModifier";
import CountModifier from "../CountModifier";
import { OptionContext } from "./contexts/OptionContext";

const OptionDetail = () => {

  const {
    option,
  } = useContext(OptionContext);

  return (
  <div className="flex flex-col gap-y-2 items-center min-h-[70px] pt-5">
    <CountModifier/>
    {option.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
      if (option.isSelected) {
        return (
          <TraitModifier key={optionTraitIdx} optionTrait={optionTrait} optionTraitIdx={optionTraitIdx}/>
        );
      }
    })}
  </div>
  );
}

export default OptionDetail;