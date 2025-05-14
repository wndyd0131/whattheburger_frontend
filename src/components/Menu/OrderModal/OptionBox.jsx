import { useContext } from "react";
import { OptionContext } from "./contexts/OptionContext";
import OptionCard from "./OptionCard";
import { MenuContext } from "../../../contexts/MenuContext";

const OptionBox = ({customRule, customRuleIdx, option, optionIdx}) => {

  const {
    orderState,
    dispatchOrder
  } = useContext(MenuContext);
  
  const handleClickToggleButton = (rowIdx, optionIdx, optionTraitIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    const optionTrait = updatedObject.ingredients[rowIdx].productOptions[optionIdx]?.optionTraitResponses[optionTraitIdx];
    if (optionTrait) {
      optionTrait.currentSelection = optionTrait.currentSelection == 0 ? 1 : 0;
      setCurrentIngredients(updatedObject);
    }
  }

  const handleClickPlusButton = (rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx] && 
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity < updatedObject.ingredients[rowIdx].productOptions[optionIdx].maxQuantity) {
      let extraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice;
      let calories = updatedObject.ingredients[rowIdx].productOptions[optionIdx].calories;
      let currentQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
      let defaultQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].defaultQuantity;
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity++;
      if (currentQuantity >= defaultQuantity) {
        updatedObject.totalExtraPrice += extraPrice;
      }
      updatedObject.totalCalories += calories;
      setCurrentIngredients(updatedObject);
    }
  }

  const handleClickMinusButton = (rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    let minQuantity = 1;
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx] &&
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity > minQuantity) {
      let extraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice;
      let calories = updatedObject.ingredients[rowIdx].productOptions[optionIdx].calories;
      let currentQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
      let defaultQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].defaultQuantity;
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity--;
      if (currentQuantity > defaultQuantity) {
        updatedObject.totalExtraPrice -= extraPrice;
      }
      updatedObject.totalCalories -= calories;
      setCurrentIngredients(updatedObject);
    }
  }

  const handleClickSlider = (e, rowIdx, optionIdx, optionTraitIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionTraitResponses[optionTraitIdx].currentSelection = e.target.value;
    setCurrentIngredients(updatedObject);
  }

  const renderByCustomRuleType = (customRule, customRuleIdx, option, optionIdx) => {
    const customRuleType = customRule.customRuleType;
    if (customRuleType === "UNIQUE") {
      return (
        <label>
          <input
            className="option-select-button"
            type="radio"
            name={option.name}
            value={option.name}
            checked={option.isSelected}
            onChange={() => handleUniqueType(customRuleIdx, customRuleType, option, optionIdx)}
          />
        </label>
      );
    }
    else {
      let optionIdx = option.orderIndex;
      return (
        <label>
          <input
            className="option-select-button"
            type="checkbox"
            name={option.name}
            value={option.name}
            checked = {option.isSelected}
            onChange={customRuleType == "LIMIT" ?
              () => handleLimitType(option, rowIdx, optionIdx) :
              () => handleFreeType(option, rowIdx, optionIdx)}
          />
        </label>
      );
    }
  }

  return (
    <OptionContext.Provider value={{
      customRule: customRule,
      customRuleIdx: customRuleIdx,
      option: option,
      optionIdx: optionIdx,
      orderState: orderState,
      dispatchOrder: dispatchOrder
    }}
    >
    <div key={optionIdx} className="flex justify-center p-5">
      <div className="flex flex-col">
        <OptionCard/>
        <div className="flex h-[60px]">
        {option.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
          console.log(optionTrait.name);
          switch(optionTrait.name) {
            case "TBS":
              const currentIngredientOptionTrait = option.ingredients[rowIdx].productOptions[optionIdx]?.optionTraitResponses[optionTraitIdx];
              const currentSelection = currentIngredientOptionTrait ? currentIngredientOptionTrait.currentSelection : optionTrait.defaultSelection;
              return (
                <div key={optionTraitIdx} className="toggle-container">
                  <p>Toast Both Sides</p>
                  <div className={`toggle-button ${currentSelection == 1 ? "on" : ""}`} onClick={() => handleClickToggleButton(rowIdx, optionIdx, optionTraitIdx)}>
                    <div className={`toggle-knob ${currentSelection == 1 ? "on" : ""}`}></div>
                  </div>
                </div>
              );
            case "CNT":
              return (
                <div key={optionTraitIdx} className="count-container">
                  <div className="count-button" onClick={() => handleClickMinusButton(rowIdx, optionIdx)}>
                    -
                  </div>
                    <h3>{currentIngredients.ingredients[rowIdx].productOptions[optionIdx] ? 
                      currentIngredients.ingredients[rowIdx].productOptions[optionIdx].optionQuantity
                      :
                      0
                    }</h3>
                  <div className="count-button" onClick={() => handleClickPlusButton(rowIdx, optionIdx)}>
                    +
                  </div>
                </div>
              );
            case "UCNT":
              return (
                <div key={optionTraitIdx} className="slider-container">
                  <input
                    className="slider"
                    type="range"
                    min="1"
                    max="3"
                    step="1"
                    disabled={currentIngredients.ingredients[rowIdx].productOptions[optionIdx] ? false : true}
                    value={currentIngredients.ingredients[rowIdx].productOptions[optionIdx]?.optionTraitResponses[optionTraitIdx].currentSelection }
                    onChange={(e) => handleClickSlider(e, rowIdx, optionIdx, optionTraitIdx)}
                  />
                </div>
              )
          }
        })}
      </div>
      { renderByCustomRuleType(customRule, customRuleIdx, option, optionIdx) }
      </div>
    </div>
    </OptionContext.Provider>
  );
}

export default OptionBox;