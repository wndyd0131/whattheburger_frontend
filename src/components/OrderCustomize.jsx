const OrderCustomize = ({customRules}) => {
  console.log(customRules);
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