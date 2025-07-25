import { useContext } from "react";
import { SelectedOptionContext } from "../OptionModal/OptionModal";

const SingleOptionSection = () => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const {
    formData,
    setFormData
  } = useContext(SelectedOptionContext);
  
  const isDefault = formData.isDefault;
  const defaultQuantity = 1;
  const maxQuantity = 1;
  const extraPrice = formData.extraPrice;
  const orderIndex = formData.orderIndex;

  return (
    <div className="grid grid-cols-[150px_1fr] gap-y-[20px]">
      <label htmlFor="isDefaultInput">is default:</label>
      <input
        id="isDefaultInput"
        type="checkbox"
        checked={isDefault}
        onChange={
          (e) => setFormData(prev => ({...prev, isDefault: e.target.checked}))
        }
      />
      <label htmlFor="defaultQuantityInput">default quantity:</label>
      <input
        id="defaultQuantityInput"
        className="border border-gray-300 rounded px-4 py-2"
        type="number"
        value={1}
        disabled
        onChange={
          () => setFormData(prev => ({...prev, defaultQuantity: 1}))
        }
      />
      <label htmlFor="maxQuantityInput">max quantity:</label>
      <input
        id="maxQuantityInput"
        className="border border-gray-300 rounded px-4 py-2"
        type="number"
        value={1}
        disabled
        onChange={
          () => setFormData(prev => ({...prev, maxQuantity: 1}))
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

export default SingleOptionSection;