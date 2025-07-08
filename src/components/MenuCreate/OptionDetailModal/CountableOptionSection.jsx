import { useContext } from "react";
import { SelectedOptionContext } from "../OptionModal/OptionModal";

const CountableOptionSection = () => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const {
    formData,
    setFormData
  } = useContext(SelectedOptionContext);

  const defaultQuantity = formData.defaultQuantity;
  const maxQuantity = formData.maxQuantity;
  const extraPrice = formData.extraPrice;
  const orderIndex = formData.orderIndex;

  return (
    <div className="grid grid-cols-[150px_1fr] gap-y-[20px]">
      <label htmlFor="defaultQuantityInput">default quantity:</label>
      <input
        id="defaultQuantityInput"
        className="border border-gray-300 rounded px-4 py-2"
        type="number"
        value={defaultQuantity}
        onChange={
          (e) => setFormData(prev => ({...prev, defaultQuantity: e.target.value}))
        }
      />
      <label htmlFor="maxQuantityInput">max quantity:</label>
      <input
        id="maxQuantityInput"
        className="border border-gray-300 rounded px-4 py-2"
        type="number"
        value={maxQuantity}
        onChange={
          (e) => setFormData(prev => ({...prev, maxQuantity: e.target.value}))
        }
      />
      <label htmlFor="extraPriceInput">extra price:</label>
      <input
        id="extraPriceInput"
        className="border border-gray-300 rounded px-4 py-2"
        type="number"
        value={extraPrice}
        onChange={
          (e) => setFormData(prev => ({...prev, extraPrice: e.target.value}))
        }
      />
      <label htmlFor="orderIndexInput">order index:</label>
      <input
        id="orderIndexInput"
        className="border border-gray-300 rounded px-4 py-2"
        type="number"
        value={orderIndex}
        onChange={
          (e) => setFormData(prev => ({...prev, orderIndex: e.target.value}))
        }
      />
    </div>
  );
}

export default CountableOptionSection;