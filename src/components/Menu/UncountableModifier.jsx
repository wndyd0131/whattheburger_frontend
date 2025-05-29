import { useContext } from "react";
import { OptionContext } from "./OrderModal/contexts/OptionContext";

const UncountableModifier = () => {
  
  const {
    option
  } = useContext(OptionContext);

  const handleClickSlider = (e, rowIdx, optionIdx, optionTraitIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionTraitResponses[optionTraitIdx].currentSelection = e.target.value;
    setCurrentIngredients(updatedObject);
  }

  return (
    <div className="flex justify-center items-center w-[160px] h-[40px] border-1 border-[rgb(225,225,225)]">
      <input
        className="slider"
        type="range"
        min="0"
        max="2"
        step="1"
        disabled={option.isSelected ? false : true}
        value={option.optionQuantity}
        onChange={(e) => handleClickSlider(e, rowIdx, optionIdx, optionTraitIdx)}
      />
    </div>
  )
}

export default UncountableModifier;