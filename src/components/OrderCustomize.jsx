const OrderCustomize = ({customRules, currentIngredients, setCurrentIngredients}) => {
  const handleClickToggleButton = (rowIdx, optionIdx, optionTraitIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    const optionTrait = updatedObject.ingredients[rowIdx].productOptions[optionIdx]?.optionTraitResponses[optionTraitIdx];
    if (optionTrait) {
      optionTrait.currentSelection = optionTrait.currentSelection == 0 ? 1 : 0;
      setCurrentIngredients(updatedObject);
    }
  }
  
  const handleUniqueType = (productOption, rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    const currentOption = updatedObject.ingredients[rowIdx].productOptions[optionIdx];
    let oldExtraPrice = currentOption ? currentOption.extraPrice : 0;
    let oldCalories = currentOption ? currentOption.calories : productOption.calories;
    let newExtraPrice = productOption.extraPrice;
    let newCalories = productOption.calories;
    for (let i = 0; i < updatedObject.ingredients[rowIdx].productOptions.length; i++) {
      updatedObject.ingredients[rowIdx].productOptions[i] = null;
    }
    updatedObject.totalExtraPrice = updatedObject.totalExtraPrice - oldExtraPrice + newExtraPrice;
    updatedObject.totalCalories = updatedObject.totalCalories - oldCalories + newCalories;
    updatedObject.ingredients[rowIdx].productOptions[optionIdx] = productOption;
    setCurrentIngredients(updatedObject);
  }

  const handleLimitType = (productOption, rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx]) {
      if (updatedObject.ingredients[rowIdx].totalCount > productOption.customRuleResponse.minSelection) { // only remove if selected ingredient number is more than minSelection
        let oldExtraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice * updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
        let oldCalories = updatedObject.ingredients[rowIdx].productOptions[optionIdx].calories * updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
        updatedObject.totalExtraPrice -= oldExtraPrice;
        updatedObject.totalCalories -= oldCalories;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = null;
        updatedObject.ingredients[rowIdx].totalCount--;
      }
    }
    else {
      if (updatedObject.ingredients[rowIdx].totalCount < productOption.customRuleResponse.maxSelection) { // only add if selected ingredient number is less than maxSelection
        let newExtraPrice = productOption.extraPrice;
        let newCalories = productOption.calories;
        updatedObject.totalExtraPrice += newExtraPrice;
        updatedObject.totalCalories += newCalories;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = productOption;
        updatedObject.ingredients[rowIdx].totalCount++;
      }
    }
    setCurrentIngredients(updatedObject);
  }

  const handleFreeType = (productOption, rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx]) {
        let oldExtraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice * updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
        let oldCalories = updatedObject.ingredients[rowIdx].productOptions[optionIdx].calories * updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
        updatedObject.totalExtraPrice -= oldExtraPrice;
        updatedObject.totalCalories -= oldCalories;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = null;
        updatedObject.ingredients[rowIdx].totalCount--;
    }
    else {
        let newExtraPrice = productOption.extraPrice;
        let newCalories = productOption.calories;
        updatedObject.totalExtraPrice += newExtraPrice;
        updatedObject.totalCalories += newCalories;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = productOption;
        updatedObject.ingredients[rowIdx].totalCount++;
    }
    setCurrentIngredients(updatedObject);
  }

  const renderByCustomRuleType = (productOption, rowIdx, optionIdx) => {
    let customRuleType = productOption.customRuleResponse.customRuleType;
    if (customRuleType === "UNIQUE") {
      return (
        <label>
          <input
            className="option-select-button"
            type="radio"
            name={productOption.name}
            value={productOption.name}
            checked={currentIngredients.ingredients[rowIdx].productOptions[optionIdx] ? true : false}
            onChange={() => handleUniqueType(productOption, rowIdx, optionIdx)}
          />
        </label>
      );
    }
    else {
      let optionIdx = productOption.orderIndex;
      return (
        <label>
          <input
            className="option-select-button"
            type="checkbox"
            name={productOption.name}
            value={productOption.name}
            checked = {currentIngredients.ingredients[rowIdx].productOptions[optionIdx]?.orderIndex === productOption.orderIndex}
            onChange={customRuleType == "LIMIT" ?
              () => handleLimitType(productOption, rowIdx, optionIdx) :
              () => handleFreeType(productOption, rowIdx, optionIdx)}
          />
        </label>
      );
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


  return (
    <div className="order-customize-section">
      <div className="start-customize-container"></div>
      <div className="order-customize-container">
        {customRules.map((customRule, rowIdx) => 
          <div key={rowIdx}>
            <h1>{customRule.customRuleName}</h1>
            <div className="order-customize-grid-container">
              {customRule.productOptions.map((productOption, optionIdx) => {
                const currentIngredientOption = currentIngredients.ingredients[rowIdx]?.productOptions[optionIdx];
                const extraPrice = currentIngredientOption ? currentIngredientOption.extraPrice * currentIngredientOption.optionQuantity : productOption.extraPrice;
                const calories = currentIngredientOption ? currentIngredientOption.calories * currentIngredientOption.optionQuantity : productOption.calories;
                const extraPriceText = extraPrice > 0 ? `$${extraPrice.toFixed(2)}` : "No Extra Charge";
                return (
                  <div key={optionIdx} className="order-customize-grid">
                    <div className="option-image-container"></div>
                    <div className="option-detail-container">
                      <div className="option-trait-container">
                        {productOption.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
                          switch(optionTrait.name) {
                            case "TBS":
                              const currentIngredientOptionTrait = currentIngredients.ingredients[rowIdx].productOptions[optionIdx]?.optionTraitResponses[optionTraitIdx];
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
                      <div className="option-detail">
                        <h3>{productOption.name}</h3>
                        <p>{extraPriceText}, {calories}Cal</p>
                        {/* <p>{(productOption.extraPrice) > 0 ? `$${productOption.extraPrice.toFixed(2)}` : "No Extra Charge"}, {productOption.calories}Cal</p> */}
                      </div>
                      { renderByCustomRuleType(productOption, rowIdx, optionIdx) }
                    </div>
                  </div>
              );}
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