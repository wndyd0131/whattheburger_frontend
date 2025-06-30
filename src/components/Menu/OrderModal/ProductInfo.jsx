import { useState, useContext } from "react";
import MenuImageContainer from "../../MenuImageContainer";
import { LayoutContext } from "../../../contexts/LayoutContext";
import { ModalContext } from "./contexts/ModalContext";

const ProductInfo = () => {

  const {
    reducer: {
      rootState: {
        optionState,
      }
    }
  } = useContext(LayoutContext);
  
  const {
    modalData: {
      selectedProduct
    },
    mode
  } = useContext(ModalContext);

  const [selectedButton, setSelectedButton] = useState("ONLY");

  return (
    <div className="flex basis-2/6 flex-col items-center">
      <MenuImageContainer width="200px" height="180px" imgSrc="/src/assets/private/menu/whattheburger.png"/>
      <div className="flex flex-col gap-[10px]">
        <h1 className="font-['Whatthefont']">{selectedProduct.productName}</h1>
        <div className="flex justify-center items-center gap-[40px]">
          <button className={`flex justify-center items-center border-1 border-gray-200 font-['Whatthefont'] text-[#FE7800] shadow-xs rounded-md h-[25px] p-4 cursor-pointer ${selectedButton === "ONLY" ? "bg-[#FE7800] text-white" : ""}`} onClick={() => {setSelectedButton("ONLY")}} disabled={selectedButton === "ONLY"}>ONLY</button>
          <button className={`flex justify-center items-center border-1 border-gray-200 font-['Whatthefont'] text-[#FE7800] shadow-xs rounded-md h-[25px] p-4 cursor-pointer ${selectedButton === "MEAL" ? "bg-[#FE7800] text-white" : ""}`} onClick={() => {setSelectedButton("MEAL")}} disabled={selectedButton === "MEAL"}>MEAL</button>
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