import { useState, useEffect } from 'react';
import styles from '/src/styles/CustomizationDetailInput.module.css';

const CustomizationDetailInput = ({
  customizations,
  customizationName,
  customizationType,
  minSelection,
  maxSelection,
  setCustomizations,
  setCustomizationName,
  setCustomizationType,
  setMinSelection,
  setMaxSelection,
  setSelectedCustomizationIdx,
  setSelectedOptions
}) => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const [addButtonClicked, setAddButtonClicked] = useState(false);

  const isValidCustomizationName = () => {
    return customizationName.length > 0;
  }

  const handleClickAddButton = () => {
    setAddButtonClicked(true);
  }

  const handleClickAddOptionButton = (customizationIdx) => {
    const clonedCustomizations = structuredClone(customizations);
    setSelectedCustomizationIdx(customizationIdx);
    setSelectedOptions(clonedCustomizations[customizationIdx].options);
  }

  const handleClickDeleteGridButton = (gridIdx) => {
    setCustomizations((prev) => prev.filter((_, i) => i !== gridIdx));
  }

  const handleClickSaveButton = () => {
    if (isValidCustomizationName) {
      const obj = {
        customizationName: customizationName,
        customizationType: customizationType,
        minSelection: minSelection,
        maxSelection: maxSelection,
        options: []
      };
      setCustomizations((prev) => [...prev, obj]);
      setAddButtonClicked(false);
    }
  }

  const handleClickCancelButton = () => {
    setAddButtonClicked(false);
  }
  
  return (
    <>
      <div className={styles.inputContainer}>
        <h2>Customization</h2>
        <button className={styles.addButton} onClick={() => handleClickAddButton()}>Add</button>
      
        <div className={styles.customizationContainer}>
            <div className={styles.customizationHead}>
              <div className={styles.customizationHeadGrid}>
                Customization Name
              </div>
              <div className={styles.customizationHeadGrid}>
                Customization Rule Type
              </div>
              <div className={styles.customizationHeadGrid}>
                Minimum Selection
              </div>
              <div className={styles.customizationHeadGrid}>
                Maximum Selection
              </div>
            </div>
          {customizations.length == 0 ? 
            addButtonClicked ? "" : <h3 className={styles.emptyOptionPrompt}>Add customization options</h3>
            :
            
            customizations.map((customization, customizationIdx) => {
              return (
              <div key={customizationIdx} className={styles.customizationGrid}>
                <div className={styles.customizationInfo}>
                  <div className={styles.customizationInfoGrid}>
                    {customization.customizationName}
                  </div>
                  <div className={styles.customizationInfoGrid}>
                    {customization.customizationType}
                  </div>
                  <div className={styles.customizationInfoGrid}>
                    {customization.minSelection}
                  </div>
                  <div className={styles.customizationInfoGrid}>
                    {customization.maxSelection}
                  </div>
                </div>
                <div className={styles.customizationGridButton2}>
                  <button onClick={() => handleClickAddOptionButton(customizationIdx)}>Add Options</button>
                  <button>Modify</button>
                  <button onClick={() => handleClickDeleteGridButton(customizationIdx)}>Delete</button>
                </div>
              </div>
              );
            })
          }
          {addButtonClicked && 
            <div className={styles.customizationGrid}>
              <div className={styles.customizationInput}>
                <label className={styles.customizationInputGrid}>
                  <input name="customizationName" value={customizationName} placeholder="" onChange={(e) => setCustomizationName(e.target.value)}/>
                </label>
                <label className={styles.customizationInputGrid}>
                  <select value={customizationType} onChange={(e) => setCustomizationType(e.target.value)}>
                    <option value="">
                      {DEFAULT_OPTION_STRING}
                    </option>
                    <option value="UNIQUE">
                      Unique
                    </option>
                    <option value="LIMIT">
                      Limit
                    </option>
                    <option value="FREE">
                      Free
                    </option>
                  </select>
                </label>
                <label className={styles.customizationInputGrid}>
                  <input name="minSelection" type="number" value={minSelection} onChange={(e) => setMinSelection(e.target.value)}/>
                </label>
                <label className={styles.customizationInputGrid}>
                  <input name="maxSelection" type="number" value={maxSelection} onChange={(e) => setMaxSelection(e.target.value)}/>
                </label>
              </div>
              
              <div className={styles.customizationGridButton1}>
                <button onClick={() => handleClickSaveButton()}>Save</button>
                <button onClick={() => handleClickCancelButton()}>Cancel</button>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default CustomizationDetailInput;