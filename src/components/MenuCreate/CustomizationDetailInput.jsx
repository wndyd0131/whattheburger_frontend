import { useState, useEffect } from 'react';
import styles from '/src/styles/CustomizationDetailInput.module.css';

const CustomizationDetailInput = ({
  customRules,
  customRuleName,
  customRuleType,
  minSelection,
  maxSelection,
  setCustomRules,
  setCustomRuleName,
  setCustomRuleType,
  setMinSelection,
  setMaxSelection,
  setSelectedCustomRuleIdx,
  setSelectedOptions
}) => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const [addButtonClicked, setAddButtonClicked] = useState(false);

  const isValidInput = (customRuleName, customRuleType, minSelection, maxSelection) => {
    return (
    isValidCustomRuleName(customRuleName) &&
    isValidCustomRuleType(customRuleType) &&
    isValidMinMaxSelection(minSelection, maxSelection)
    );
  }
  const isValidCustomRuleName = (customRuleName) => {
    const nameLen = customRuleName.length;
    return (
      0 < nameLen &&
      nameLen <= 20
    );
  }

  const isValidCustomRuleType = (customRuleType) => {
    return customRuleType !== "";
  }

  const isValidMinMaxSelection = (minSelection, maxSelection) => {
    const min = Number(minSelection);
    const max = Number(maxSelection);

    return (
    0 < min &&
    min <= 10 &&
    0 < max &&
    max <= 20 &&
    max >= min
    );
  }

  const handleClickAddButton = () => {
    setCustomRuleName("");
    setCustomRuleType("");
    setMinSelection(0);
    setMaxSelection(0);
    setAddButtonClicked(true);
  }

  const handleClickAddOptionButton = (customRuleIdx) => {
    const clonedcustomRules = structuredClone(customRules);
    setSelectedCustomRuleIdx(customRuleIdx);
    setSelectedOptions(clonedcustomRules[customRuleIdx].options);
  }

  const handleClickDeleteGridButton = (gridIdx) => {
    setCustomRules((prev) => prev.filter((_, i) => i !== gridIdx));
    setSelectedOptions([]);
  }

  const handleClickSaveButton = () => {
    if (isValidInput(customRuleName, customRuleType, minSelection, maxSelection)) {
      const obj = {
        customRuleName: customRuleName,
        customRuleType: customRuleType,
        minSelection: minSelection,
        maxSelection: maxSelection,
        options: []
      };
      setCustomRules((prev) => [...prev, obj]);
      setAddButtonClicked(false);
    }
  }

  const handleClickCancelButton = () => {
    setAddButtonClicked(false);
  }
  
  return (
    <>
      <div className={styles.inputContainer}>
        <h2>Custom Rule</h2>
        <button className={styles.addButton} onClick={() => handleClickAddButton()}>Add</button>
      
        <div className={`${styles.customizationContainer} ${customRules.length > 0 || addButtonClicked ? "" : styles.empty}`}>
          {addButtonClicked || customRules.length > 0 ? 
          <>          
            <div className={styles.customizationHead}>
            <div className={styles.customizationHeadGrid}>
              Custom Rule Name
            </div>
            <div className={styles.customizationHeadGrid}>
              Custom Rule Type
            </div>
            <div className={styles.customizationHeadGrid}>
              Minimum Selection
            </div>
            <div className={styles.customizationHeadGrid}>
              Maximum Selection
            </div>
          </div>
          {
            customRules.map((customRule, customRuleIdx) => {
              return (
              <div key={customRuleIdx} className={styles.customizationGrid}>
                <div className={styles.customizationInfo}>
                  <div className={styles.customizationInfoGrid}>
                    {customRule.customRuleName}
                  </div>
                  <div className={styles.customizationInfoGrid}>
                    {customRule.customRuleType}
                  </div>
                  <div className={styles.customizationInfoGrid}>
                    {customRule.minSelection}
                  </div>
                  <div className={styles.customizationInfoGrid}>
                    {customRule.maxSelection}
                  </div>
                </div>
                <div className={styles.customizationGridButton2}>
                  <button onClick={() => handleClickAddOptionButton(customRuleIdx)}>Add Options</button>
                  <button>Modify</button>
                  <button onClick={() => handleClickDeleteGridButton(customRuleIdx)}>Delete</button>
                </div>
              </div>
              );
            })
          }
          </> : <h3 className={styles.emptyOptionPrompt}>Add custom rule options</h3>
          }
          {addButtonClicked && 
            <div className={styles.customizationGrid}>
              <div className={styles.customizationInput}>
                <label className={styles.customizationInputGrid}>
                  <input name="customRuleName" value={customRuleName} placeholder="1-20 words" onChange={(e) => setCustomRuleName(e.target.value)}/>
                </label>
                <label className={styles.customizationInputGrid}>
                  <select value={customRuleType} onChange={(e) => setCustomRuleType(e.target.value)}>
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
                  <input name="minSelection" type="number" min={0} value={minSelection} onChange={(e) => setMinSelection(e.target.value)}/>
                </label>
                <label className={styles.customizationInputGrid}>
                  <input name="maxSelection" type="number" min={0} value={maxSelection} onChange={(e) => setMaxSelection(e.target.value)}/>
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