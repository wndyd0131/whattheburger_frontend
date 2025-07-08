import { useContext } from "react";
import { SelectedOptionContext } from "../OptionModal/OptionModal";

const UncountableOptionSection = () => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const {
    formData,
    setFormData
  } = useContext(SelectedOptionContext);

  const measureValue = formData.measureValue;
  const extraPrice = formData.extraPrice;
  const orderIndex = formData.orderIndex;

  const handleChangeMeasureType = (e) => {
    setFormData(prev => ({...prev, measureValue: ""}));
    setFormData(prev => ({...prev, measureType: e.target.value}));
  }

  return (
    <div className="grid grid-cols-[150px_1fr] gap-y-[20px]">
      <label htmlFor="measureValueInput">default unit:</label>
      <select
        id="defaultMeasureValueInput"
        className="border border-gray-300 rounded px-4 py-2"
        value={measureValue}
        disabled
        onChange={
          (e) => setFormData(prev => ({...prev, measureValue: e.target.value}))
        }
      >
        <option value="">
          {DEFAULT_OPTION_STRING}
        </option>
          <>
            <option value="KIDS">
              Kids
            </option>
            <option value="SMALL">
              Small
            </option>
            <option value="MEDIUM">
              Medium
            </option>
            <option value="Large">
              Large
            </option>
          </>

          <>
            <option value="EASY">
              Easy
            </option>
            <option value="REGULAR">
              Regular
            </option>
            <option value="EXTRA">
              Extra
            </option>
          </>
      </select>
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

export default UncountableOptionSection;