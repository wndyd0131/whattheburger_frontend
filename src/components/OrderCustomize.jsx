const OrderCustomize = ({customRules, setCurrentIngredients}) => {

  // const handleUniqueType = (productOption, optionIdx) => {
  //   setCurrentIngredients((prev) => 
  //     prev.map((element, idx) => {
  //       idx === optionIdx ? element.map((col, cIdx) => (
  //         cIdx === 0 ? productOption : col
  //       )) : element
  //     })
  //   );
  // }

  const renderByCustomRuleType = (productOption, optionIdx) => {
    let customRuleType = productOption["customRuleRequest"].customRuleType;
    if (customRuleType === "UNIQUE") {
      return (
        <label>
          <input
            type="radio"
            value={productOption.name}
            onChange={() => handleUniqueType(productOption, optionIdx)}
          />
        </label>
      );
    }
    else {
      return (
        <button className="option-select-button">Select</button>
      );
    }
  }

  return (
    <div className="order-customize-section">
      <div className="start-customize-container"></div>
      <div className="order-customize-container">
        {customRules.map((customRule, ruleIdx) => 
          <div key={ruleIdx}>
            <h1>{customRule["customRuleName"]}</h1>
            <div className="order-customize-grid-container">
              {customRule["productOptions"].map((productOption, optionIdx) => 
                <div key={optionIdx} className="order-customize-grid">
                  <div className="option-image-container"></div>
                  <div className="option-detail-container">
                    <div className="option-trait-container"></div>
                    <div className="option-detail">
                      <h3>{productOption["name"]}</h3>
                      <p>{productOption["extraPrice"] > 0 ? `$${productOption["extraPrice"]}` : "No Extra Charge"}, {productOption["calories"]}Cal</p>
                    </div>
                    { renderByCustomRuleType(productOption, optionIdx) }
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