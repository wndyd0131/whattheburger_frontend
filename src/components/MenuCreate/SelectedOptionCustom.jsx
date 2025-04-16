import {useState, useEffect, useContext} from 'react';
import styles from '/src/styles/SelectedOptionCustom.module.css';
import { SelectedOptionsContext } from '../../pages/MenuCreate';
import ToggleSwitch from '../ToggleSwitch';

const SelectedOptionCustom = () => {

  const {
    selectedOptions,
    selectedOptionIdx,
    optionTraits,
    setSelectedOptions,
    setSelectedOptionIdx
  } = useContext(SelectedOptionsContext);

  const DEFAULT_OPTION_STRING = "----Select----";

  /* Countable */
  const [isDefault, setIsDefault] = useState(false);
  const [defaultQuantity, setDefaultQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [extraPrice, setExtraPrice] = useState(0);
  const [orderIndex, setOrderIndex] = useState(0);
  const [measureTypeButton, setMeasureTypeButton] = useState("SINGLE");

  /* Uncountable */
  const [measureType, setMeasureType] = useState("");
  const [measureValue, setMeasureValue] = useState("");

  const [selectedOptionTraitIdx, setSelectedOptionTraitIdx] = useState(null);
  const [checkedBinarySelection, setChecekdBinarySelection] = useState(false);

  useEffect(() => {
    const optionIdx = selectedOptionIdx;
    const currentIsDefault = selectedOptions[optionIdx].isDefault;
    const currentDefaultQuantity = selectedOptions[optionIdx].defaultQuantity;
    const currentMaxQuantity = selectedOptions[optionIdx].maxQuantity;
    const currentExtraPrice = selectedOptions[optionIdx].extraPrice;
    const currentOrderIndex = selectedOptions[optionIdx].orderIndex;
    const currentMeasureTypeButton = selectedOptions[optionIdx].measureTypeButton;
    const currentMeasureType = selectedOptions[optionIdx].measureType;
    const currentMeasureValue = selectedOptions[optionIdx].measureValue;

    setIsDefault(currentIsDefault);
    setDefaultQuantity(currentDefaultQuantity);
    setMaxQuantity(currentMaxQuantity);
    setExtraPrice(currentExtraPrice);
    setOrderIndex(currentOrderIndex);
    setMeasureTypeButton(currentMeasureTypeButton);
    setMeasureType(currentMeasureType);
    setMeasureValue(currentMeasureValue);
  } ,[selectedOptionIdx])

  const handleClickSaveButton = () => {
    const updatedOptions = selectedOptions.map((option, optionIdx) => {

      const optionTraitId = selectedOptionTraitIdx ? 
        optionTraits[selectedOptionTraitIdx].optionTraitId : null;
      const defaultSelection = checkedBinarySelection;
      const optionTrait = {
        optionTraitId: optionTraitId,
        defaultSelection: defaultSelection,
        optionTraitExtraPrice: 0,
        extraCalories: 0
      }
      return (
        selectedOptionIdx === optionIdx ? 
        {...option,
          isDefault: isDefault,
          defaultQuantity: defaultQuantity,
          maxQuantity: maxQuantity,
          extraPrice: extraPrice,
          orderIndex: orderIndex,
          measureTypeButton: measureTypeButton,
          measureType: measureType,
          measureValue: measureValue,
          optioNTrait: optionTrait
        } : option
      )
    });
    setSelectedOptions(updatedOptions);
    setSelectedOptionIdx("");
  }

  const handleClickCancelButton = () => {
    setSelectedOptionIdx("");
    setIsDefault(false);
    setDefaultQuantity(1);
    setMaxQuantity(1);
    setExtraPrice(0);
    setOrderIndex(0);
    setMeasureType("");
    setMeasureValue("");
    setMeasureType("SINGLE");
  }

  const handleClickSingleButton = () => {
    const optionIdx = selectedOptionIdx;

    const currentIsDefault = selectedOptions[optionIdx].isDefault;
    const currentDefaultQuantity = selectedOptions[optionIdx].defaultQuantity;
    const currentMaxQuantity = selectedOptions[optionIdx].maxQuantity;
    const currentExtraPrice = selectedOptions[optionIdx].extraPrice;
    const currentOrderIndex = selectedOptions[optionIdx].orderIndex;

    if (selectedOptions[optionIdx].measureTypeButton !== "SINGLE") {
      setIsDefault(false);
      setDefaultQuantity(1);
      setMaxQuantity(1);
      setExtraPrice(0);
      setOrderIndex("");
      setMeasureType("");
      setMeasureValue("");
      setMeasureTypeButton("SINGLE");
    }
    else {
      setIsDefault(currentIsDefault);
      setDefaultQuantity(currentDefaultQuantity);
      setMaxQuantity(currentMaxQuantity);
      setExtraPrice(currentExtraPrice);
      setOrderIndex(currentOrderIndex);
      setMeasureTypeButton("SINGLE");
    }
  }

  const handleClickCountableButton = () => {
    const optionIdx = selectedOptionIdx;

    const currentIsDefault = selectedOptions[optionIdx].isDefault;
    const currentDefaultQuantity = selectedOptions[optionIdx].defaultQuantity;
    const currentMaxQuantity = selectedOptions[optionIdx].maxQuantity;
    const currentExtraPrice = selectedOptions[optionIdx].extraPrice;
    const currentOrderIndex = selectedOptions[optionIdx].orderIndex;

    if (selectedOptions[optionIdx].measureTypeButton !== "COUNTABLE") {
      setIsDefault(false);
      setDefaultQuantity(1);
      setMaxQuantity(1);
      setExtraPrice(0);
      setOrderIndex("");
      setMeasureType("");
      setMeasureValue("");
      setMeasureTypeButton("COUNTABLE");
    }
    else {
      setIsDefault(currentIsDefault);
      setDefaultQuantity(currentDefaultQuantity);
      setMaxQuantity(currentMaxQuantity);
      setExtraPrice(currentExtraPrice);
      setOrderIndex(currentOrderIndex);
      setMeasureTypeButton("COUNTABLE");
    }
  }
 
  const handleClickUncountableButton = () => {
    const optionIdx = selectedOptionIdx;

    const currentIsDefault = selectedOptions[optionIdx].isDefault;
    const currentMeasureType = selectedOptions[optionIdx].measureType;
    const currentMeasureValue = selectedOptions[optionIdx].measureValue;
    const currentExtraPrice = selectedOptions[optionIdx].extraPrice;
    const currentOrderIndex = selectedOptions[optionIdx].orderIndex;

    if (selectedOptions[optionIdx].measureTypeButton !== "UNCOUNTABLE") {
      setIsDefault(false);
      setDefaultQuantity(1);
      setMaxQuantity(1);
      setExtraPrice(0);
      setOrderIndex("");
      setMeasureType("");
      setMeasureValue("");
      setMeasureTypeButton("UNCOUNTABLE");
    }
    else {
      setIsDefault(currentIsDefault);
      setMeasureType(currentMeasureType);
      setMeasureValue(currentMeasureValue);
      setExtraPrice(currentExtraPrice);
      setOrderIndex(currentOrderIndex);
      setMeasureTypeButton("UNCOUNTABLE");
    }
  }

  const handleChangeMeasureType = (e) => {
    setMeasureValue("");
    setMeasureType(e.target.value)
  }

  const handleClickOptionTraitButton = (optionTraitIdx) => {
    setSelectedOptionTraitIdx(optionTraitIdx);
  }

  const handleClickToggleSwitch = (value) => {
    setChecekdBinarySelection(!value);
  }

  return (
    <>
      <div className={styles.selectedOptionModalContentSection}>
        <div className={styles.selectedOptionModalOptionSection}>
          <div className={styles.selectedOptionModalHeader}>
            <div className="flex h-[50px] w-[300px] border border-[rgb(225,225,225)] rounded divide-x divide-gray-200">
              <button className="w-full hover:bg-gray-100" onClick={() => handleClickSingleButton()} disabled={measureTypeButton === "SINGLE" ? true : false}>Single</button>
              <button className="w-full hover:bg-gray-100" onClick={() => handleClickCountableButton()} disabled={measureTypeButton === "COUNTABLE" ? true : false}>Countable</button>
              <button className="w-full hover:bg-gray-100" onClick={() => handleClickUncountableButton()} disabled={measureTypeButton === "UNCOUNTABLE" ? true : false}>Uncountable</button>
            </div>
          </div>
          <div className={styles.selectedOptionDetailInput}>
          {(measureTypeButton === "SINGLE" || measureTypeButton === "COUNTABLE") && 
            <div className={styles.selectedOptionFormGrid}>
              <label htmlFor="isDefaultInput">is default:</label>
              <input id="isDefaultInput" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)}/>
              {measureTypeButton === "SINGLE" ?
                <>
                <label htmlFor="defaultQuantityInput">default quantity:</label>
                <input id="defaultQuantityInput" class="border border-gray-300 rounded px-4 py-2" type="number" value={1} disabled onChange={() => setDefaultQuantity(1)}/>
                <label htmlFor="maxQuantityInput">max quantity:</label>
                <input id="maxQuantityInput" class="border border-gray-300 rounded px-4 py-2" type="number" value={1} disabled onChange={() => setMaxQuantity(1)}/>
                </>
                :
                <>
                <label htmlFor="defaultQuantityInput">default quantity:</label>
                <input id="defaultQuantityInput" class="border border-gray-300 rounded px-4 py-2" type="number" value={defaultQuantity} onChange={(e) => setDefaultQuantity(e.target.value)}/>
                <label htmlFor="maxQuantityInput">max quantity:</label>
                <input id="maxQuantityInput" class="border border-gray-300 rounded px-4 py-2" type="number" value={maxQuantity} onChange={(e) => setMaxQuantity(e.target.value)}/>
                </>
              }

              <label htmlFor="extraPriceInput">extra price:</label>
              <input id="extraPriceInput" class="border border-gray-300 rounded px-4 py-2" type="number" value={extraPrice} onChange={(e) => setExtraPrice(e.target.value)}/>
              <label htmlFor="orderIndexInput">order index:</label>
              <input id="orderIndexInput" class="border border-gray-300 rounded px-4 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)}/>
            </div>
          }
          {measureTypeButton === "UNCOUNTABLE" && 
            <div className={styles.selectedOptionFormGrid}>
              <label htmlFor="isDefaultInput">is default:</label>
              <input id="isDefaultInput" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)}/>
              <label htmlFor="measureTypeInput">measure type:</label>
              <select id="measureTypeInput" class="border border-gray-300 rounded px-4 py-2" value={measureType} onChange={(e) => handleChangeMeasureType(e)}>
                <option value="">
                  {DEFAULT_OPTION_STRING}
                </option>
                <option value="SIZE">
                  Size
                </option>
                <option value="DEGREE">
                  Degree
                </option>
              </select>
              <label htmlFor="measureTypeInput">default unit:</label>
              <select id="defaultMeasureValueInput" class="border border-gray-300 rounded px-4 py-2" value={measureValue} disabled={measureType === "" ? true : false} onChange={(e) => setMeasureValue(e.target.value)}>
                <option value="">
                  {DEFAULT_OPTION_STRING}
                </option>
                {
                  measureType === "SIZE" &&
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
                }
                {
                  measureType === "DEGREE" &&
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
                }
              </select>
              <label htmlFor="extraPriceInput">extra price:</label>
              <input id="extraPriceInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={extraPrice} onChange={(e) => setExtraPrice(e.target.value)}/>
              <label htmlFor="orderIndexInput">order index:</label>
              <input id="orderIndexInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)}/>
            </div>
          }
          </div>
        </div>
        <div className={styles.selectedOptionModalTraitSection}>
          <div className={styles.selectedOptionTraitHeader}>
            
          </div>
          <div className="flex-col overflow-y-auto divide-y divide-gray-300">
            {optionTraits.map((optionTrait, optionTraitIdx) => {
              const regularClassName = "flex bg-amber-50 justify-center items-center h-[50px] cursor-pointer hover:bg-amber-100";
              const selectedClassName = "flex bg-amber-100 justify-center items-center h-[50px] cursor-pointer hover:bg-amber-200";
              return (
                <div 
                  key={optionTraitIdx}
                  className={optionTraitIdx === selectedOptionTraitIdx ? selectedClassName : regularClassName}
                  onClick={() => handleClickOptionTraitButton(optionTraitIdx)}
                >
                  {optionTrait.name}
                </div>
              );
            })}

          </div>
        </div>
        <div className="flex-col h-full w-[300px]">
          <div className="h-1/6 w-full flex justify-center items-center">
            Trait Information
          </div>
          {console.log("SELECTED", selectedOptionTraitIdx, optionTraits[selectedOptionTraitIdx]?.optionTraitType)}
          {
            selectedOptionTraitIdx !== null && optionTraits[selectedOptionTraitIdx]?.optionTraitType === 'BINARY' ?
            <div className="h-3/6 w-full flex-col justify-items-center content-center">
              <ToggleSwitch value={checkedBinarySelection} setter={handleClickToggleSwitch}/>
              <p>Default: {checkedBinarySelection ? "true" : "false"}</p>
            </div>
            :
            ""
          }
          <div className="h-2/6 w-full flex justify-center items-center">
            <input/>
            <input/>
          </div>
        </div>
      </div>
      <div className={styles.selectedOptionModalFooter}>
        <button className={styles.customRuleButton} onClick={() => handleClickSaveButton()}>Save</button>
        <button className={styles.customRuleButton} onClick={() => handleClickCancelButton()}>Cancel</button>
      </div>
    </>
  );
}

export default SelectedOptionCustom;