import { useState, useContext } from 'react';
import styles from '/src/styles/CustomizationDetailInput.module.css';
import { MenuCreateContext } from '../../pages/MenuCreate';
import { ACTIONS } from '../../reducers/MenuCreate/actions';

const CustomizationDetailInput = ({
  customRuleName,
  customRuleType,
  minSelection,
  maxSelection,
  setCustomRuleName,
  setCustomRuleType,
  setMinSelection,
  setMaxSelection,
}) => {

  const DEFAULT_OPTION_STRING = "----Select----";

  const {
    customRuleState,
    customRuleDispatch,
    selectedOptionState,
    selectedOptionDispatch,
    setSelectedOptions,
    setSelectedCustomRuleIdx,
  } = useContext(MenuCreateContext);

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
    0 <= min &&
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
    setSelectedCustomRuleIdx(customRuleIdx);
    const selectedOptions = customRuleState[customRuleIdx].options;

    selectedOptionDispatch({
      type: ACTIONS.LOAD_SELECTED_OPTIONS,
      payload: {
        selectedOptions: selectedOptions
      }
    });
  }

  const handleClickDeleteGridButton = (customRuleIdx) => {
    customRuleDispatch(
      {
        type: ACTIONS.DELETE_CUSTOMRULE,
        payload: {
          customRuleIdx: customRuleIdx
        }
      }
    );
    customRuleDispatch(
      {
        type: ACTIONS.INIT_SELECTED_OPTIONS
      }
    )
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
      customRuleDispatch({type: ACTIONS.ADD_CUSTOMRULE, payload: obj})
      setAddButtonClicked(false);
    }
  }

  const handleClickCancelButton = () => {
    setAddButtonClicked(false);
  }

  const handleChangeCustomRuleType = (e) => {
    if (e.target.value === "UNIQUE") {
      setMinSelection(1);
      setMaxSelection(1);
    }
    else if (e.target.value === "FREE") {
      setMinSelection(0);
      setMaxSelection(20);
    }
    else if (e.target.value === "LIMIT") {
      setMinSelection(2);
      setMaxSelection(2);
    }
    else {
      setMinSelection(0);
      setMaxSelection(0);
    }
    setCustomRuleType(e.target.value);
  }
  
  return (
    <>
      <div className={styles.inputContainer}>
        <h2>Custom Rule</h2>
        <button className={`${styles.customRuleButton} ${addButtonClicked ? styles.clicked: ""}`} disabled={addButtonClicked} onClick={() => handleClickAddButton()}>Add</button>
      
        <div className={`${styles.customizationContainer} ${customRuleState.length > 0 || addButtonClicked ? "" : styles.empty}`}>
          {addButtonClicked || customRuleState.length > 0 ? 
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
            customRuleState.map((customRule, customRuleIdx) => {
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
                  <button className={styles.customRuleButton} onClick={() => handleClickAddOptionButton(customRuleIdx)}>Add Options</button>
                  <button className={styles.customRuleButton}>Modify</button>
                  <button className={styles.customRuleButton} onClick={() => handleClickDeleteGridButton(customRuleIdx)}>Delete</button>
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
                  <input className={styles.customRuleInput} name="customRuleName" value={customRuleName} placeholder="1-20 words" onChange={(e) => setCustomRuleName(e.target.value)}/>
                </label>
                <label className={styles.customizationInputGrid}>
                  <select className={styles.customRuleInput} value={customRuleType} onChange={(e) => handleChangeCustomRuleType(e)}>
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
                  <input 
                    className={styles.customRuleInput}
                    name="minSelection"
                    type="number"
                    min={0}
                    value={minSelection}
                    disabled={customRuleType === "UNIQUE" || customRuleType === "FREE"}
                    onChange={(e) => setMinSelection(e.target.value)}
                  />
                </label>
                <label className={styles.customizationInputGrid}>
                  <input
                    className={styles.customRuleInput}
                    name="maxSelection"
                    type="number"
                    min={0}
                    value={maxSelection}
                    disabled={customRuleType === "UNIQUE" || customRuleType === "FREE"}
                    onChange={(e) => setMaxSelection(e.target.value)}
                  />
                </label>
              </div>
              
              <div className={styles.customizationGridButton1}>
                <button className={styles.customRuleButton} onClick={() => handleClickSaveButton()}>Save</button>
                <button className={styles.customRuleButton} onClick={() => handleClickCancelButton()}>Cancel</button>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default CustomizationDetailInput;