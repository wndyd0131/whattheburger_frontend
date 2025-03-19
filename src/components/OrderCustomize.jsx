const OrderCustomize = ({customRules, currentIngredients, setCurrentIngredients, setTotalExtraPrice}) => {
  console.log("CR", currentIngredients);
  const handleUniqueType = (productOption, rowIdx) => {
    const updatedArray = [...currentIngredients];
    let oldExtraPrice = updatedArray[rowIdx].productOptions[0].extraPrice;
    let newExtraPrice = productOption.extraPrice;
    setTotalExtraPrice(extraPrice => (extraPrice - oldExtraPrice + newExtraPrice));
    updatedArray[rowIdx].productOptions[0] = productOption;
    setCurrentIngredients(updatedArray);
  }

  const handleLimitType = (productOption, rowIdx, optionIdx) => {
    const updatedArray = [...currentIngredients];
    if (updatedArray[rowIdx].productOptions[optionIdx]) {
      if (updatedArray[rowIdx].totalCount > productOption.customRuleResponse.minSelection) { // only remove if selected ingredient number is more than minSelection
        let oldExtraPrice = updatedArray[rowIdx].productOptions[optionIdx].extraPrice;
        setTotalExtraPrice(extraPrice => (extraPrice - oldExtraPrice));
        updatedArray[rowIdx].productOptions[optionIdx] = null;
        updatedArray[rowIdx].totalCount--;
      }
    }
    else {
      if (updatedArray[rowIdx].totalCount < productOption.customRuleResponse.maxSelection) { // only add if selected ingredient number is less than maxSelection
        let newExtraPrice = productOption.extraPrice;
        setTotalExtraPrice(extraPrice => (extraPrice + newExtraPrice));
        updatedArray[rowIdx].productOptions[optionIdx] = productOption;
        updatedArray[rowIdx].totalCount++;
      }
    }
    setCurrentIngredients(updatedArray);
  }

  const handleFreeType = (productOption, rowIdx, optionIdx) => {
    const updatedArray = [...currentIngredients];
    if (updatedArray[rowIdx].productOptions[optionIdx]) {
        let oldExtraPrice = updatedArray[rowIdx].productOptions[optionIdx].extraPrice;
        setTotalExtraPrice(extraPrice => (extraPrice - oldExtraPrice));
        updatedArray[rowIdx].productOptions[optionIdx] = null;
        updatedArray[rowIdx].totalCount--;
    }
    else {
        let newExtraPrice = productOption.extraPrice;
        setTotalExtraPrice(extraPrice => (extraPrice + newExtraPrice));
        updatedArray[rowIdx].productOptions[optionIdx] = productOption;
        updatedArray[rowIdx].totalCount++;
    }
    setCurrentIngredients(updatedArray);
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
            checked={currentIngredients[rowIdx]["productOptions"][0].optionId === productOption["optionId"]}
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
            checked = {currentIngredients[rowIdx].productOptions[optionIdx]?.orderIndex === productOption.orderIndex}
            onChange={customRuleType == "LIMIT" ?
              () => handleLimitType(productOption, rowIdx, optionIdx) :
              () => handleFreeType(productOption, rowIdx, optionIdx)}
          />
        </label>
      );
    }
  }

  const handleClickPlusButton = (rowIdx, optionIdx) => {
    const updatedArray = [...currentIngredients];
    let maxQuantity = updatedArray[rowIdx].productOptions[optionIdx].maxQuantity;
    if (updatedArray[rowIdx].productOptions[optionIdx] && updatedArray[rowIdx].productOptions[optionIdx].optionQuantity < maxQuantity) {
      updatedArray[rowIdx].productOptions[optionIdx].optionQuantity++;
      setCurrentIngredients(updatedArray);
    }
  }

  const handleClickMinusButton = (rowIdx, optionIdx) => {
    const updatedArray = [...currentIngredients];
    let minQuantity = 0;
    if (updatedArray[rowIdx].productOptions[optionIdx] && updatedArray[rowIdx].productOptions[optionIdx].optionQuantity > minQuantity) {
      updatedArray[rowIdx].productOptions[optionIdx].optionQuantity--;
      setCurrentIngredients(updatedArray);
    }
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
                      {productOption.optionTraitResponses.map((optionTrait, traitIdx) => {
                        switch(optionTrait.name) {
                          case "TBS":
                            return (
                              <div key={traitIdx} className="toggle-button">

                              </div>
                            );
                          case "CNT":
                            return (
                              <div key={traitIdx} className="count-container">
                                <div className="count-button" onClick={() => handleClickMinusButton(rowIdx, optionIdx)}>
                                  -
                                </div>
                                  <h3>{currentIngredients[rowIdx].productOptions[optionIdx] ? 
                                    currentIngredients[rowIdx].productOptions[optionIdx].optionQuantity
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
                              <div key={traitIdx} className="scale-container">

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