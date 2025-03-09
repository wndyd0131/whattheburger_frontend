import MenuImageContainer from "./MenuImageContainer";
import { useState } from "react";

const OrderSummary = ({product}) => {
  const [selectedButton, setSelectedButton] = useState("");
  return (
    <div className="order-summary-section">
      <div className="product-detail-container">
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
      <div className="product-ingredient-container">

      </div>
    </div>
  );
}

export default OrderSummary;