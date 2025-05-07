import MenuImageContainer from "../../MenuImageContainer";
import { useState, useEffect } from "react";

const OrderSummary = (
  {
    product,
    currentIngredients,
    setCurrentIngredients,
    defaultIngredients,
    isLoading
  }) => {
  console.log("DEFAULT", defaultIngredients);
  const [selectedButton, setSelectedButton] = useState("");
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const handleClickDefaultButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmDefaultButton = () => {
    setCurrentIngredients(structuredClone(defaultIngredients));
    setConfirmModalOpened(false);
  }
  
  const handleClickOnlyButton = () => {
    const updatedArray = structuredClone(currentIngredients);
    updatedArray.ingredients
  }

  return (
    <>
    {confirmModalOpened && 
    (
      <div className="overlay">
        <div className="confirm-modal">
          <div className="confirm-modal-text-container">
            <h3>Return to default setting?</h3>
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
        <MenuImageContainer width="100%" height="180px" imgSrc="/src/assets/private/menu/Whataburger31.png"/>
        <div className="product-detail">
          <h1>{product.productName}</h1>
          <div className="product-type">
            <button className={selectedButton === "ONLY" ? "active" : ""} onClick={() => setSelectedButton("ONLY")} disabled={selectedButton === "ONLY"}>ONLY</button>
            <button className={selectedButton === "MEAL" ? "active" : ""} onClick={() => setSelectedButton("MEAL")} disabled={selectedButton === "MEAL"}>MEAL</button>
          </div>
          <h2>${(product.productPrice + currentIngredients.totalExtraPrice).toFixed(2)} | {currentIngredients.totalCalories}Cal</h2>
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
        <h2>[Order Summary]</h2>
        <div className="current-ingredient-container">
          <ul>
            {currentIngredients.ingredients?.map((customRule, idx) => {
              if (customRule.totalCount > 0) {
                return (
                  <div className="ingredient-list" key={idx}>
                    <h3>{customRule.customRuleName}</h3>
                    {customRule.productOptions.map((option, idx) => 
                      option ? 
                      <li key={idx}>
                        {option.name} {option.optionQuantity > 1 ? `(x${option.optionQuantity})` : ""}
                          {option.optionTraitResponses.map((optionTrait, optionTraitIdx) => {
                            if (optionTrait.name === "UCNT") {
                              if (optionTrait.currentSelection == 1) {
                                return (
                                  <div key={optionTraitIdx} className="trait-label" style={{"backgroundColor": "rgb(86, 193, 220)"}}>Easy</div>
                                );
                              } else if (optionTrait.currentSelection == 2) {
                                return (
                                  <div key={optionTraitIdx} className="trait-label">Regular</div>
                                );
                              } else {
                                return (
                                  <div key={optionTraitIdx} className="trait-label" style={{"backgroundColor": "rgb(255, 32, 103)"}}>Extra</div>
                                );
                              }
                            } else if (optionTrait.name === "TBS") {
                              return (
                                optionTrait.currentSelection == 1 ? 
                                <div key={optionTraitIdx} className="trait-label" style={{"backgroundColor": "rgb(113, 47, 0)"}}>TBS</div> : ""
                              );
                            }
                          })}
                        
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
      <div className="order-decision-container">
        <div className="order-decision-button">Order</div>
        <div className="order-decision-button">Add To Bag</div>
      </div>
    </div>
    </>
  );
}

export default OrderSummary;