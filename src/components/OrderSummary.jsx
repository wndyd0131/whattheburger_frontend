import MenuImageContainer from "./MenuImageContainer";
import { useState } from "react";

const OrderSummary = ({product, currentIngredients, defaultIngredients}) => {
  const [selectedButton, setSelectedButton] = useState("");
  return (
    <div className="order-summary-section">
      <div className="product-detail-section">
        <MenuImageContainer width="100%" height="180px" imgSrc="/src/assets/menu/Whataburger31.png"/>
        <div className="product-detail">
          <h1>{product.productName}</h1>
          <div className="product-type">
            <button className={selectedButton === "ONLY" ? "active" : ""} onClick={() => setSelectedButton("ONLY")} disabled={selectedButton === "ONLY"}>ONLY</button>
            <button className={selectedButton === "MEAL" ? "active" : ""} onClick={() => setSelectedButton("MEAL")} disabled={selectedButton === "MEAL"}>MEAL</button>
          </div>
          <h2>${product.productPrice} | 700Cal</h2>
          <div className="show-nutrition-button">
            <strong>Show Nutrition</strong>
          </div>
        </div>
      </div>
      <div className="product-ingredient-section">
        <div className="current-ingredient-container">
          <ul>
            {currentIngredients.map((customRule, idx) => {
              if (customRule.totalCount > 0) {
                return (
                  <div key={idx}>
                    <h3>{customRule.customRuleName}</h3>
                    {customRule.productOptions.map((option, idx) => 
                      option ? 
                      <li key={idx}>
                        <p>{option.name}</p>
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
    </div>
  );
}

export default OrderSummary;