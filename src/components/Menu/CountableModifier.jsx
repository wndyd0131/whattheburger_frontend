import { useContext } from "react";
import { OrderContext } from "./OrderModal/contexts/OrderContext";
import { OptionContext } from "./OrderModal/contexts/OptionContext";

const CountableModifier = () => {

  const {
    dispatchOrder,
    orderState
  } = useContext(OrderContext);

  const {
    option,
    customRUleIdx
  } = useContext(OptionContext);

  const handleClickPlusButton = (rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx] && 
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity < updatedObject.ingredients[rowIdx].productOptions[optionIdx].maxQuantity) {
      let extraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice;
      let calories = updatedObject.ingredients[rowIdx].productOptions[optionIdx].calories;
      let currentQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
      let defaultQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].defaultQuantity;
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity++;
      if (currentQuantity >= defaultQuantity) {
        updatedObject.totalExtraPrice += extraPrice;
      }
      updatedObject.totalCalories += calories;
      setCurrentIngredients(updatedObject);
    }
  }

  const handleClickMinusButton = (rowIdx, optionIdx) => {
    const updatedObject = structuredClone(currentIngredients);
    let minQuantity = 1;
    if (updatedObject.ingredients[rowIdx].productOptions[optionIdx] &&
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity > minQuantity) {
      let extraPrice = updatedObject.ingredients[rowIdx].productOptions[optionIdx].extraPrice;
      let calories = updatedObject.ingredients[rowIdx].productOptions[optionIdx].calories;
      let currentQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity;
      let defaultQuantity = updatedObject.ingredients[rowIdx].productOptions[optionIdx].defaultQuantity;
      updatedObject.ingredients[rowIdx].productOptions[optionIdx].optionQuantity--;
      if (currentQuantity > defaultQuantity) {
        updatedObject.totalExtraPrice -= extraPrice;
      }
      updatedObject.totalCalories -= calories;
      setCurrentIngredients(updatedObject);
    }
  }

  return (
    <div className="flex justify-between w-[160px] h-[40px]">
      <div className="flex justify-center border-1 border-[#FE7800] rounded-[5px] text-[#FE7800] h-[30px] w-[50px] cursor-pointer" onClick={() => handleClickMinusButton(rowIdx, optionIdx)}>
        <strong>-</strong>
      </div>
        <h3>
          {option.optionQuantity}
        </h3>
      <div className="flex justify-center border-1 border-[#FE7800] rounded-[5px] text-[#FE7800] h-[30px] w-[50px] cursor-pointer" onClick={() => handleClickPlusButton(rowIdx, optionIdx)}>
        <strong>+</strong>
      </div>
    </div>
  );
}

export default CountableModifier;