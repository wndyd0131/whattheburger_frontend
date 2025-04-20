import {useState, useEffect, useContext} from 'react';
import styles from '/src/styles/SelectedOptionInput.module.css';
import { MenuContext } from '../../../pages/MenuCreate';
import ToggleSwitch from '../../ToggleSwitch';
import { ACTIONS } from '../../../pages/MenuCreate';
import { SelectedOptionContext } from '../OptionModal/OptionModal';

const SelectedOptionInput = () => {


  const DEFAULT_OPTION_STRING = "----Select----";

  const {
    customRuleState,
    customRuleDispatch,
    selectedOptions,
    optionTraits,
    setSelectedOptions,
  } = useContext(MenuContext);

  const {
    selectedOptionState,
    selectedOptionDispatch,
    selectedOptionIdx,
    setSelectedOptionIdx,
    selectedOptionTraitIdx,
    setSelectedOptionTraitIdx,
    formData,
    setFormData
  } = useContext(SelectedOptionContext);

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

  const [defaultBinarySelection, setDefaultBinarySelection] = useState(0);
  const [optionTraitExtraPrice, setOptionTraitExtraPrice] = useState(0);
  const [optionTraitExtraCalories, setOptionTraitExtraCalories] = useState(0);


  const handleClickSaveButton = () => {
    console.log(optionTraits);
    console.log(selectedOptionTraitIdx);

    const optionTraitDetail = {
      elementId: selectedOptionTraitIdx,
      defaultSelection: formData.defaultSelection,
      extraPrice: formData.optionTraitExtraPrice,
      extraCalories: formData.optionTraitExtraCalories
    }

    const optionDetail = {
      isDefault: formData.isDefault,
      defaultQuantity: formData.defaultQuantity,
      maxQuantity: formData.maxQuantity,
      extraPrice: formData.extraPrice,
      orderIndex: formData.orderIndex,
      measureTypeButton: formData.measureTypeButton,
      measureType: formData.measureType,
      measureValue: formData.measureValue,
    }

    selectedOptionDispatch({
      type: ACTIONS.SAVE_OPTION,
      payload: {
        selectedOptionIdx: selectedOptionIdx,
        optionDetail: optionDetail,
        optionTraitDetail: optionTraitDetail
      }
    });

    setFormData(null);
    setSelectedOptionIdx(null);
  }

  const handleClickCancelButton = () => {
    
    setFormData(null);
    setSelectedOptionIdx(null);
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
    if (optionTraitIdx === selectedOptionTraitIdx) {
      setSelectedOptionTraitIdx(null);
      setFormData({...formData, defaultSelection: null});
    }
    else {
      setSelectedOptionTraitIdx(optionTraitIdx);
      const elementId = selectedOptionState[selectedOptionIdx]?.optionTrait.elementId;
      if (elementId === optionTraitIdx) {
        const selection = selectedOptionState[selectedOptionIdx]?.optionTrait.defaultSelection;
        setFormData({...formData, defaultSelection: selection});
      }
      else {
        setFormData({...formData, defaultSelection: 0});
      }
    }
  }

  const handleClickToggleSwitch = (value) => {
    value === 0
    ? setFormData({...formData, defaultSelection: 1})
    : setFormData({...formData, defaultSelection: 0});
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
                <input id="defaultQuantityInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={1} disabled onChange={() => setDefaultQuantity(1)}/>
                <label htmlFor="maxQuantityInput">max quantity:</label>
                <input id="maxQuantityInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={1} disabled onChange={() => setMaxQuantity(1)}/>
                </>
                :
                <>
                <label htmlFor="defaultQuantityInput">default quantity:</label>
                <input id="defaultQuantityInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={defaultQuantity} onChange={(e) => setDefaultQuantity(e.target.value)}/>
                <label htmlFor="maxQuantityInput">max quantity:</label>
                <input id="maxQuantityInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={maxQuantity} onChange={(e) => setMaxQuantity(e.target.value)}/>
                </>
              }

              <label htmlFor="extraPriceInput">extra price:</label>
              <input id="extraPriceInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={extraPrice} onChange={(e) => setExtraPrice(e.target.value)}/>
              <label htmlFor="orderIndexInput">order index:</label>
              <input id="orderIndexInput" className="border border-gray-300 rounded px-4 py-2" type="number" value={orderIndex} onChange={(e) => setOrderIndex(e.target.value)}/>
            </div>
          }
          {measureTypeButton === "UNCOUNTABLE" && 
            <div className={styles.selectedOptionFormGrid}>
              <label htmlFor="isDefaultInput">is default:</label>
              <input id="isDefaultInput" type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)}/>
              <label htmlFor="measureTypeInput">measure type:</label>
              <select id="measureTypeInput" className="border border-gray-300 rounded px-4 py-2" value={measureType} onChange={(e) => handleChangeMeasureType(e)}>
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
              <select id="defaultMeasureValueInput" className="border border-gray-300 rounded px-4 py-2" value={measureValue} disabled={measureType === "" ? true : false} onChange={(e) => setMeasureValue(e.target.value)}>
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
          
          {
            selectedOptionTraitIdx !== null && optionTraits[selectedOptionTraitIdx]?.optionTraitType === 'BINARY' ?
            <div className="h-3/6 w-full flex-col justify-items-center content-center">
              <ToggleSwitch value={formData.defaultSelection} setter={handleClickToggleSwitch}/>
              <p>Default: {formData.defaultSelection === 0 ? "false" : "true"}</p>
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

export default SelectedOptionInput;