import { useState, useContext } from 'react';
import styles from '/src/styles/CustomizationDetailInput.module.css';
import { MenuCreateContext } from '/src/components/Admin/MenuCreate';
import { ACTIONS } from '/src/reducers/MenuCreate/actions';

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
      <div className="flex flex-col gap-[20px]">
        <h2>Custom Rule</h2>
        <button className={
          `flex w-[60px] h-[35px] text-lg bg-white text-[#FE7800] rounded-md font-['Whatthefont'] justify-center items-center border border-[#FE7800]
          ${addButtonClicked ? "text-gray-200 border-gray-200" : "cursor-pointer hover:bg-gray-100"}
          `}
          disabled={addButtonClicked}
          onClick={() => handleClickAddButton()}
          >Add</button>
        <div className={`grid auto-rows-[0fr] h-[350px] w-full border border-gray-200 rounded-md ${customRuleState.length > 0 || addButtonClicked ? "" : "flex justify-center auto-rows-[1fr] items-center h-[350px] border-gray-200"}`}>
          {addButtonClicked || customRuleState.length > 0 ? 
          <div className="flex flex-col">
            <div className="grid grid-cols-4 h-[45px] w-[800px] text-white font-bold bg-gradient-to-r from-amber-500 to-orange-500">
            <div className="flex justify-center items-center">
              Custom Rule Name
            </div>
            <div className="flex justify-center items-center">
              Custom Rule Type
            </div>
            <div className="flex justify-center items-center">
              Minimum Selection
            </div>
            <div className="flex justify-center items-center">
              Maximum Selection
            </div>
            </div>
            <div className="overflow-y-auto">
            {
              customRuleState.map((customRule, customRuleIdx) => {
                return (
                <div key={customRuleIdx} className={`flex h-[70px] ${customRuleIdx === customRuleState.length - 1 ? "" : "border-b border-gray-200"}`}>
                  <div className="grid grid-cols-4 w-[800px] font-bold">
                    <div className="flex justify-center items-center">
                      {customRule.customRuleName}
                    </div>
                    <div className="flex justify-center items-center">
                      {customRule.customRuleType}
                    </div>
                    <div className="flex justify-center items-center">
                      {customRule.minSelection}
                    </div>
                    <div className="flex justify-center items-center">
                      {customRule.maxSelection}
                    </div>
                  </div>
                  <div className="flex justify-between gap-5 p-5">
                    <button className="flex w-[80px] h-[40px] text-sm bg-white text-[#FE7800] rounded-full font-['Whatthefont'] justify-center self-center items-center cursor-pointer border border-[#FE7800] hover:bg-gray-100" onClick={() => handleClickAddOptionButton(customRuleIdx)}>Add Options</button>
                    <button className="flex w-[80px] h-[40px] text-sm bg-white text-[#FE7800] rounded-full font-['Whatthefont'] justify-center self-center items-center cursor-pointer border border-[#FE7800] hover:bg-gray-100">Modify</button>
                    <button className="flex w-[80px] h-[40px] text-sm bg-white text-[#FE7800] rounded-full font-['Whatthefont'] justify-center self-center items-center cursor-pointer border border-[#FE7800] hover:bg-gray-100" onClick={() => handleClickDeleteGridButton(customRuleIdx)}>Delete</button>
                  </div>
                </div>
                );
              })
            }
            </div>
          
          </div> : <h3 className={styles.emptyOptionPrompt}>Add custom rule options</h3>
          }

          {addButtonClicked && 
            <div className="flex h-[90px] border-b border-gray-200">
              <div className="grid grid-cols-4 w-[800px]">
                <label className="flex flex-col justify-center items-center p-2">
                  <input className="flex justify-center border border-gray-300 rounded-sm h-[30px] w-full focus:outline-none p-2" name="customRuleName" value={customRuleName} placeholder="1-20 words" onChange={(e) => setCustomRuleName(e.target.value)}/>
                </label>
                <label className="flex flex-col justify-center items-center p-2">
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
                <label className="flex flex-col justify-center items-center p-2">
                  <input 
                    className="flex justify-center border border-gray-300 rounded-sm h-[30px] w-full focus:outline-none p-2"
                    name="minSelection"
                    type="number"
                    min={0}
                    value={minSelection}
                    disabled={customRuleType === "UNIQUE" || customRuleType === "FREE"}
                    onChange={(e) => setMinSelection(e.target.value)}
                  />
                </label>
                <label className="flex flex-col justify-center items-center p-2">
                  <input
                    className="flex justify-center border border-gray-300 rounded-sm h-[30px] w-full focus:outline-none p-2"
                    name="maxSelection"
                    type="number"
                    min={0}
                    value={maxSelection}
                    disabled={customRuleType === "UNIQUE" || customRuleType === "FREE"}
                    onChange={(e) => setMaxSelection(e.target.value)}
                  />
                </label>
              </div>
              
              <div className="flex flex-grow justify-center items-center gap-5">
                <button className="flex w-[80px] h-[40px] text-sm bg-white text-[#FE7800] rounded-full font-['Whatthefont'] justify-center self-center items-center cursor-pointer border border-[#FE7800] hover:bg-gray-100" onClick={() => handleClickSaveButton()}>Save</button>
                <button className="flex w-[80px] h-[40px] text-sm bg-white text-[#FE7800] rounded-full font-['Whatthefont'] justify-center self-center items-center cursor-pointer border border-[#FE7800] hover:bg-gray-100" onClick={() => handleClickCancelButton()}>Cancel</button>
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}

export default CustomizationDetailInput;