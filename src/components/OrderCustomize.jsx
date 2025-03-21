const OrderCustomize = ({customRules, currentIngredients, setCurrentIngredients}) => {
  const handleUniqueType = (productOption, rowIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    let oldExtraPrice = updatedObject.ingredients[rowIdx].productOptions[0].extraPrice;
    let newExtraPrice = productOption.extraPrice;
    updatedObject.totalExtraPrice = updatedObject.totalExtraPrice - oldExtraPrice + newExtraPrice;
    updatedObject.ingredients[rowIdx].productOptions[0] = productOption;
    setCurrentIngredients(updatedObject);
  }

  const handleLimitType = (productOption, rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx]) {
      if (updatedObject.ingredients[rowIdx].totalCount > productOption.customRuleResponse.minSelection) { // only remove if selected ingredient number is more than minSelection
        let oldExtraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice * updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
        updatedObject.totalExtraPrice -= oldExtraPrice;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = null;
        updatedObject.ingredients[rowIdx].totalCount--;
      }
    }
    else {
      if (updatedObject.ingredients[rowIdx].totalCount < productOption.customRuleResponse.maxSelection) { // only add if selected ingredient number is less than maxSelection
        let newExtraPrice = productOption.extraPrice;
        updatedObject.totalExtraPrice += newExtraPrice;
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
        updatedObject.totalExtraPrice -= oldExtraPrice;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = null;
        updatedObject.ingredients[rowIdx].totalCount--;
    }
    else {
        let newExtraPrice = productOption.extraPrice;
        updatedObject.totalExtraPrice += newExtraPrice;
        updatedObject.ingredients[rowIdx].productOptions[optionIdx] = productOption;
        updatedObject.ingredients[rowIdx].totalCount++;
    }
    setCurrentIngredients(updatedObject);
  }

  const renderByCustomRuleType = (productOption, rowIdx) => {
    let customRuleType = productOption.customRuleResponse.customRuleType;
    if (customRuleType === "UNIQUE") {
      return (
        <label>
          <input
            className="option-select-button"
            type="radio"
            name={productOption.name}
            value={productOption.name}
            checked={currentIngredients.ingredients[rowIdx].productOptions[0].optionId === productOption["optionId"]}
            onChange={() => handleUniqueType(productOption, rowIdx)}
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
      let currentQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
      let defaultQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].defaultQuantity;
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity++;
      if (currentQuantity >= defaultQuantity) {
        updatedObject.totalExtraPrice += extraPrice;
      }
      setCurrentIngredients(updatedObject);
    }
  }

  const handleClickMinusButton = (rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    let minQuantity = 1;
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx] &&
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity > minQuantity) {
      let extraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice;
      let currentQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
      let defaultQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].defaultQuantity;
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity--;
      if (currentQuantity > defaultQuantity) {
        updatedObject.totalExtraPrice -= extraPrice;
      }
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
              {customRule.productOptions.map((productOption, optionIdx) => 
                <div key={optionIdx} className="order-customize-grid">
                  <div className="option-image-container"></div>
                  <div className="option-detail-container">
                    <div className="option-trait-container">
                      {productOption.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
                        switch(optionTrait.name) {
                          case "TBS":
                            return (
                              <div key={optionTraitIdx} className="toggle-button">

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
                                  value={currentIngredients.ingredients[rowIdx].productOptions[optionIdx]?.optionTraitResponses[optionTraitIdx].currentSelection}
                                  onChange={(e) => handleClickSlider(e, rowIdx, optionIdx, optionTraitIdx)}
                                />
                              </div>
                            )
                        }
                      })}
                    </div>
                    <div className="option-detail">
                      <h3>{productOption.name}</h3>
                      <p>{productOption.extraPrice > 0 ? `$${productOption.extraPrice.toFixed(2)}` : "No Extra Charge"}, {productOption.calories}Cal</p>
                    </div>
                    { renderByCustomRuleType(productOption, rowIdx) }
                  </div>
                </div>
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