import MenuImageContainer from "./MenuImageContainer";
import { useState, useEffect } from "react";

const OrderSummary = (
  {
    product,
    currentIngredients,
    setCurrentIngredients,
    defaultIngredients,
    totalExtraPrice
  }) => {
  console.log("DEFAULT", defaultIngredients);
  const [selectedButton, setSelectedButton] = useState("");
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const handleClickDefaultButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmDefaultButton = () => {
    setCurrentIngredients([...defaultIngredients]);
    setConfirmModalOpened(false);
  }
  

  return (
    <>
    {confirmModalOpened && 
    (
      <div className="overlay">
        <div className="confirm-modal">
          <div className="confirm-modal-text-container">
            <h3>Return to default setting</h3>
          </div>
          <div className="confirm-modal-button-container">
            <button onClick={() => handleConfirmDefaultButton()}><strong>Yes</strong></button>
            <button onClick={() => setConfirmModalOpened(false)}><strong>No</strong></button>
          </div>

        </div>
      </div>
    )}
    <div className="order-summary-section">
      <div className="product-detail-section">
        <MenuImageContainer width="100%" height="180px" imgSrc="/src/assets/menu/Whataburger31.png"/>
        <div className="product-detail">
          <h1>{product.productName}</h1>
          <div className="product-type">
            <button className={selectedButton === "ONLY" ? "active" : ""} onClick={() => setSelectedButton("ONLY")} disabled={selectedButton === "ONLY"}>ONLY</button>
            <button className={selectedButton === "MEAL" ? "active" : ""} onClick={() => setSelectedButton("MEAL")} disabled={selectedButton === "MEAL"}>MEAL</button>
          </div>
          <h2>${(product.productPrice + totalExtraPrice).toFixed(2)} | 700Cal</h2>
          <div className="show-nutrition-button">
            <strong>Show Nutrition</strong>
          </div>
        </div>
      </div>
      <div className="product-ingredient-section">
        <div className="ingredient-modifier-container">
          <div className="ingredient-modifier-button" onClick={() => handleClickDefaultButton()}>
            default
          </div>
        </div>
        <h2>Order Summary</h2>
        <div className="current-ingredient-container">
          <ul>
            {currentIngredients.map((customRule, idx) => {
              if (customRule.totalCount > 0) {
                return (
                  <div className="ingredient-list" key={idx}>
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
    </>
  );
}

export default OrderSummary;