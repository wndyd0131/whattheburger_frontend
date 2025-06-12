import { useState, useContext } from "react";
import MenuImageContainer from "../../MenuImageContainer";
import { MenuContext } from "../../../contexts/MenuContext";
import { OrderContext } from "./contexts/OrderContext";

const ProductInfo = () => {

  const {
    selectedProduct
  } = useContext(MenuContext);

  const {
    optionState
  } = useContext(OrderContext);
  const [selectedButton, setSelectedButton] = useState("");

  return (
    <div className="flex basis-2/6 flex-col items-center">
      <MenuImageContainer width="200px" height="180px" imgSrc="/src/assets/private/menu/whattheburger.png"/>
      <div className="flex flex-col gap-[10px]">
        <h1>{selectedProduct.productName}</h1>
        <div className="flex justify-center items-center gap-[40px]">
          <button className={selectedButton === "ONLY" ? "active" : ""} onClick={() => setSelectedButton("ONLY")} disabled={selectedButton === "ONLY"}>ONLY</button>
          <button className={selectedButton === "MEAL" ? "active" : ""} onClick={() => setSelectedButton("MEAL")} disabled={selectedButton === "MEAL"}>MEAL</button>
        </div>
        <h2>${(selectedProduct.productPrice + optionState.currentSelections.totalExtraPrice).toFixed(2)} | {optionState.currentSelections.totalCalories}Cal</h2>
        <div className="flex justify-center items-center text-[#FE7800]">
          <strong className="cursor-pointer">Show Nutrition</strong>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;