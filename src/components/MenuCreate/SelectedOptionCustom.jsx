import {useState, useEffect} from 'react';
import styles from '/src/styles/SelectedOptionCustom.module.css';

const SelectedOptionCustom = (
  {
    selectedOptions,
    selectedOptionIdx,
    optionTraits,
    setSelectedOptions,
    setSelectedOptionIdx
  }) => {

  /* Countable */
  const [isDefault, setIsDefault] = useState(false);
  const [defaultQuantity, setDefaultQuantity] = useState("");
  const [maxQuantity, setMaxQuantity] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [orderIndex, setOrderIndex] = useState("");
  const [measureTypeButton, setMeasureTypeButton] = useState("SINGLE");

  /* Uncountable */
  const [measureType, setMeasureType] = useState("");
  const [measureValue, setMeasureValue] = useState("");

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
          measureValue: measureValue
        } : option
      )
    });
    setSelectedOptions(updatedOptions);
    setSelectedOptionIdx("");
  }

  const handleClickCancelButton = () => {
    setSelectedOptionIdx("");
    setIsDefault(false);
    setDefaultQuantity("");
    setMaxQuantity("");
    setExtraPrice("");
    setOrderIndex("");
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

  return (
    <>
      <div className={styles.selectedOptionModalContentSection}>
        <div className={styles.selectedOptionModalOptionSection}>
          <div className={styles.selectedOptionModalHeader}>
            <div className={styles.selectedOptionCountModifier}>
              <button onClick={() => handleClickSingleButton()} disabled={measureTypeButton === "SINGLE" ? true : false}>Single</button>
              <button onClick={() => handleClickCountableButton()} disabled={measureTypeButton === "COUNTABLE" ? true : false}>Countable</button>
              <button onClick={() => handleClickUncountableButton()} disabled={measureTypeButton === "UNCOUNTABLE" ? true : false}>Uncountable</button>
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
                <input id="defaultQuantityInput" type="number" value={1} disabled/>
                <label htmlFor="maxQuantityInput">max quantity:</label>
                <input id="maxQuantityInput" type="number" value={1} disabled/>
                </>
                :
                <>
                <label htmlFor="defaultQuantityInput">default quantity:</label>
                <input id="defaultQuantityInput" type="number" value={defaultQuantity} onChange={(e) => setDefaultQuantity(e.target.value)}/>
                <label htmlFor="maxQuantityInput">max quantity:</label>
                <input id="maxQuantityInput" type="number" value={maxQuantity} onChange={(e) => setMaxQuantity(e.target.value)}/>
                </>
              }

              <label htmlFor="extraPriceInput">extra price:</label>
              <input id="extraPriceInput" type="number" value={extraPrice} onChange={(e) => setExtraPrice(e.target.value)}/>
              <label htmlFor="orderIndexInput">order index:</label>
              <input id="orderIndexInput" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)}/>
            </div>
          }
          {measureTypeButton === "UNCOUNTABLE" && 
            <div className={styles.selectedOptionFormGrid}>
              <label htmlFor="isDefaultInput">is default:</label>
              <input id="isDefaultInput" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)}/>
              <label htmlFor="measureTypeInput">measure type:</label>
              <select id="measureTypeInput" value={measureType} onChange={(e) => handleChangeMeasureType(e)}>
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
              <select id="defaultMeasureValueInput" value={measureValue} disabled={measureType === "" ? true : false} onChange={(e) => setMeasureValue(e.target.value)}>
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
              <input id="extraPriceInput" type="number" value={extraPrice} onChange={(e) => setExtraPrice(e.target.value)}/>
              <label htmlFor="orderIndexInput">order index:</label>
              <input id="orderIndexInput" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)}/>
            </div>
          }
          </div>
        </div>
        <div className={styles.selectedOptionModalTraitSection}>
          <div className={styles.selectedOptionTraitHeader}>
            
          </div>
          <div className={styles.selectedOptionTraitInput}>
            {optionTraits.map((optionTrait, optionTraitIdx) => {
              return (
                <div key={optionTraitIdx} className={styles.optionTraitBlock}>
                  {optionTrait.name}
                </div>
              );
            })}

          </div>
        </div>
      </div>
      <div className={styles.selectedOptionModalFooter}>
        <button className={styles.optionModalButton} onClick={() => handleClickSaveButton()}>Save</button>
        <button className={styles.optionModalButton} onClick={() => handleClickCancelButton()}>Cancel</button>
      </div>
    </>
  );
}

export default SelectedOptionCustom;