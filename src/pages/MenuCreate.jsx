import {useState, useEffect} from "react";
import styles from "../styles/MenuCreate.module.css";
import Modal from "../components/Modal.jsx";
import axios from "axios";

const MenuCreate = () => {
  
  const defaultOptionString = "----Select----";

  const optionModalStyle = {
    height: 850,
    width: 1400,
    flexDirection: "column"
  }
  const selectedOptionModalStyle = {
    height: 350,
    width: 500,
    flexDirection: "column"
  };

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCalories, setProductCalories] = useState(0);
  const [productType, setProductType] = useState("");
  const [briefInfo, setBriefInfo] = useState("");
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customizationName, setCustomizationName] = useState("");
  const [customizationType, setCustomizationType] = useState("");
  const [minSelection, setMinSelection] = useState(0);
  const [maxSelection, setMaxSelection] = useState(0);
  const [customizations, setCustomizations] = useState([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [addOptionButtonClicked, setAddOptionButtonClicked] = useState(false);
  const [selectedCustomizationIdx, setSelectedCustomizationIdx] = useState("");

  const [selectedOptionIdx, setSelectedOptionIdx] = useState("");
  const [selectedOptionIsDefault, setSelectedOptionIsDefault] = useState(false);
  const [selectedOptionDefaultQuantity, setSelectedOptionDefaultQuantity] = useState("");
  const [selectedOptionMaxQuantity, setSelectedOptionMaxQuantity] = useState("");
  const [selectedOptionExtraPrice, setSelectedOptionExtraPrice] = useState("");
  const [selectedOptionOrderIndex, setSelectedOptionOrderIndex] = useState("");
  const [singleButtonClickedOptions, setSingleButtonClickedOptions] = useState({});
  const [countableButtonClickedOptions, setCountableButtonClickedOptions] = useState({});
  const [uncountableButtonClickedOptions, setUncountableButtonClickedOptions] = useState({});

  const [selectedOptionMeasureTypeButton, setSelectedOptionMeasureTypeButton] = useState("SINGLE");
  const [selectedOptionMeasureType, setSelectedOptionMeasureType] = useState("");
  const [selectedOptionMeasureValue, setSelectedOptionMeasureValue] = useState("");

  const isValidCustomizationName = () => {
    return customizationName.length > 0;
  }

  const handleClickAddButton = () => {
    setAddButtonClicked(true);
  }

  const handleClickSaveButton = (customizationIdx) => {
    if (isValidCustomizationName) {
      const obj = {
        id: customizationIdx,
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
  
  const handleClickAddOptionButton = (customizationIdx) => {
    const clonedCustomizations = structuredClone(customizations);
    setSelectedCustomizationIdx(customizationIdx);
    setSelectedOptions(clonedCustomizations[customizationIdx].options);
  }

  const handleClickCancelButton = () => {
    setAddButtonClicked(false);
  }

  const handleClickDeleteGridButton = (gridIdx) => {
    setCustomizations((prev) => prev.filter((_, i) => i !== gridIdx));
  }

  const handleClickOptionGrid = (optionIdx) => {
    setSelectedOptions(prev => {
      const exists = prev.find(option => option.id === optionIdx);
      const newOption = {
        id: optionIdx,
        item: options[optionIdx],
        isDefault: false,
        defaultQuantity: 0,
        maxQuantity: 0,
        extraPrice: 0,
        measureTypeButton: "SINGLE"
      }
      if (exists) {
        return prev.filter(option => option.id !== optionIdx);
      }
      else {
        return (
          [...prev, newOption]
        );
      }
    });
  }
  const handleClickSelectedOptionCustomButton = (optionIdx) => {
    const isDefault = selectedOptions[optionIdx].isDefault;
    const defaultQuantity = selectedOptions[optionIdx].defaultQuantity;
    const maxQuantity = selectedOptions[optionIdx].maxQuantity;
    const extraPrice = selectedOptions[optionIdx].extraPrice;
    const orderIndex = selectedOptions[optionIdx].orderIndex;
    const measureTypeButton = selectedOptions[optionIdx].measureTypeButton;
    const measureType = selectedOptions[optionIdx].measureType;
    const measureValue = selectedOptions[optionIdx].measureValue;

    setSelectedOptionIdx(optionIdx);
    setSelectedOptionIsDefault(isDefault);
    setSelectedOptionDefaultQuantity(defaultQuantity);
    setSelectedOptionMaxQuantity(maxQuantity);
    setSelectedOptionExtraPrice(extraPrice);
    setSelectedOptionOrderIndex(orderIndex);
    setSelectedOptionMeasureTypeButton(measureTypeButton);
    setSelectedOptionMeasureType(measureType);
    setSelectedOptionMeasureValue(measureValue);
  }

  const handleClickSelectedOptionDeleteButton = (optionIdx) => {
    setSelectedOptions(prev => prev.filter((_, idx) => optionIdx !== idx));
  }

  const handleClickSelectedOptionSaveButton = () => {
    const isDefault = selectedOptionIsDefault;
    const defaultQuantity = selectedOptionDefaultQuantity;
    const maxQuantity = selectedOptionMaxQuantity;
    const extraPrice = selectedOptionExtraPrice;
    const orderIndex = selectedOptionOrderIndex;
    const measureTypeButton = selectedOptionMeasureTypeButton;
    const measureType = selectedOptionMeasureType;
    const measureValue = selectedOptionMeasureValue;

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

  const handleClickSelectedOptionCancelButton = () => {
    setSelectedOptionIdx("");
    setSelectedOptionIsDefault(false);
    setSelectedOptionDefaultQuantity("");
    setSelectedOptionMaxQuantity("");
    setSelectedOptionExtraPrice("");
    setSelectedOptionOrderIndex("");
    setSelectedOptionMeasureType("SINGLE");
  }

  const handleClickOptionModalSaveButton = () => {
    const updatedCustomizations = structuredClone(customizations);
    updatedCustomizations[selectedCustomizationIdx].options = selectedOptions;
    setCustomizations(updatedCustomizations);
    closeOptionModal();
    // successfully saved notification
  }

  const handleClickOptionModalCancelButton = () => {
    closeOptionModal();
  }

  const closeOptionModal = () => {
    setSelectedOptions([]);
    setSelectedCustomizationIdx("");
  }

  const handleClickSingleButton = () => {
    const optionIdx = selectedOptionIdx;

    const isDefault = selectedOptions[optionIdx].isDefault;
    const defaultQuantity = selectedOptions[optionIdx].defaultQuantity;
    const maxQuantity = selectedOptions[optionIdx].maxQuantity;
    const extraPrice = selectedOptions[optionIdx].extraPrice;
    const orderIndex = selectedOptions[optionIdx].orderIndex;

    if (selectedOptions[optionIdx].measureTypeButton !== "SINGLE") {
      setSelectedOptionIsDefault(false);
      setSelectedOptionDefaultQuantity(1);
      setSelectedOptionMaxQuantity(1);
      setSelectedOptionExtraPrice(0);
      setSelectedOptionOrderIndex("");
      setSelectedOptionMeasureType("");
      setSelectedOptionMeasureValue("");
      setSelectedOptionMeasureTypeButton("SINGLE");
    }
    else {
      setSelectedOptionIsDefault(isDefault);
      setSelectedOptionDefaultQuantity(defaultQuantity);
      setSelectedOptionMaxQuantity(maxQuantity);
      setSelectedOptionExtraPrice(extraPrice);
      setSelectedOptionOrderIndex(orderIndex);
      setSelectedOptionMeasureTypeButton("SINGLE");
    }
  }

  const handleClickCountableButton = () => {
    const optionIdx = selectedOptionIdx;
    const isDefault = selectedOptions[optionIdx].isDefault;
    const defaultQuantity = selectedOptions[optionIdx].defaultQuantity;
    const maxQuantity = selectedOptions[optionIdx].maxQuantity;
    const extraPrice = selectedOptions[optionIdx].extraPrice;
    const orderIndex = selectedOptions[optionIdx].orderIndex;

    if (selectedOptions[optionIdx].measureTypeButton !== "COUNTABLE") {
      setSelectedOptionIsDefault(false);
      setSelectedOptionDefaultQuantity(1);
      setSelectedOptionMaxQuantity(1);
      setSelectedOptionExtraPrice(0);
      setSelectedOptionOrderIndex("");
      setSelectedOptionMeasureType("");
      setSelectedOptionMeasureValue("");
      setSelectedOptionMeasureTypeButton("COUNTABLE");
    }
    else {
      setSelectedOptionIsDefault(isDefault);
      setSelectedOptionDefaultQuantity(defaultQuantity);
      setSelectedOptionMaxQuantity(maxQuantity);
      setSelectedOptionExtraPrice(extraPrice);
      setSelectedOptionOrderIndex(orderIndex);
      setSelectedOptionMeasureTypeButton("COUNTABLE");
    }
  }

  const handleClickUncountableButton = () => {
    const optionIdx = selectedOptionIdx;
    const isDefault = selectedOptions[optionIdx].isDefault;
    const measureType = selectedOptions[optionIdx].measureType;
    const measureValue = selectedOptions[optionIdx].measureValue;
    const extraPrice = selectedOptions[optionIdx].extraPrice;
    const orderIndex = selectedOptions[optionIdx].orderIndex;

    if (selectedOptions[optionIdx].measureTypeButton !== "UNCOUNTABLE") {
      setSelectedOptionIsDefault(false);
      setSelectedOptionDefaultQuantity(1);
      setSelectedOptionMaxQuantity(1);
      setSelectedOptionExtraPrice(0);
      setSelectedOptionOrderIndex("");
      setSelectedOptionMeasureType("");
      setSelectedOptionMeasureValue("");
      setSelectedOptionMeasureTypeButton("UNCOUNTABLE");
    }
    else {
      setSelectedOptionIsDefault(isDefault);
      setSelectedOptionMeasureType(measureType);
      setSelectedOptionMeasureValue(measureValue);
      setSelectedOptionExtraPrice(extraPrice);
      setSelectedOptionOrderIndex(orderIndex);
      setSelectedOptionMeasureTypeButton("UNCOUNTABLE");
    }

  }

  const handleChangeSelectedOptionMeasureType = (e) => {
    setSelectedOptionMeasureValue("");
    setSelectedOptionMeasureType(e.target.value)
  }

  useEffect(() => {
    axios.get("http://localhost:8080/api/v1/category")
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => console.error(error));

    axios.get("http://localhost:8080/api/v1/options")
    .then(response => {
      setOptions(response.data);
    })
    .catch(error => console.error(error));
  }, [])

  return (
    <div className={styles.contentLayout}>
      {selectedCustomizationIdx !== "" &&
              <Modal
                height={optionModalStyle.height}
                width={optionModalStyle.width}
                flexDirection={optionModalStyle.flexDirection}
              >
                {selectedOptionIdx !== "" && 
                  <Modal 
                    height={selectedOptionModalStyle.height}
                    width={selectedOptionModalStyle.width}
                    flexDirection={selectedOptionModalStyle.flexDirection}
                  >
                    <div className={styles.selectedOptionModalHeader}>
                      <div className={styles.selectedOptionCountModifier}>
                        <button onClick={() => handleClickSingleButton()} disabled={selectedOptionMeasureTypeButton === "SINGLE" ? true : false}>Single</button>
                        <button onClick={() => handleClickCountableButton()} disabled={selectedOptionMeasureTypeButton === "COUNTABLE" ? true : false}>Countable</button>
                        <button onClick={() => handleClickUncountableButton()} disabled={selectedOptionMeasureTypeButton === "UNCOUNTABLE" ? true : false}>Uncountable</button>
                      </div>
                    </div>
                    <div className={styles.selectedOptionDetailInput}>
                      {(selectedOptionMeasureTypeButton === "SINGLE" || selectedOptionMeasureTypeButton === "COUNTABLE") && 
                        <div className={styles.selectedOptionFormGrid}>
                          <label htmlFor="isDefaultInput">is default:</label>
                          <input id="isDefaultInput" type="checkbox" checked={selectedOptionIsDefault} onChange={(e) => setSelectedOptionIsDefault(e.target.checked)}/>
                          {selectedOptionMeasureTypeButton === "SINGLE" ?
                            <>
                            <label htmlFor="defaultQuantityInput">default quantity:</label>
                            <input id="defaultQuantityInput" type="number" value={1} disabled/>
                            <label htmlFor="maxQuantityInput">max quantity:</label>
                            <input id="maxQuantityInput" type="number" value={1} disabled/>
                            </>
                            :
                            <>
                            <label htmlFor="defaultQuantityInput">default quantity:</label>
                            <input id="defaultQuantityInput" type="number" value={selectedOptionDefaultQuantity} onChange={(e) => setSelectedOptionDefaultQuantity(e.target.value)}/>
                            <label htmlFor="maxQuantityInput">max quantity:</label>
                            <input id="maxQuantityInput" type="number" value={selectedOptionMaxQuantity} onChange={(e) => setSelectedOptionMaxQuantity(e.target.value)}/>
                            </>
                          }

                          <label htmlFor="extraPriceInput">extra price:</label>
                          <input id="extraPriceInput" type="number" value={selectedOptionExtraPrice} onChange={(e) => setSelectedOptionExtraPrice(e.target.value)}/>
                          <label htmlFor="orderIndexInput">order index:</label>
                          <input id="orderIndexInput" type="number" value={selectedOptionOrderIndex} onChange={(e) => setSelectedOptionOrderIndex(e.target.value)}/>
                        </div>
                      }
                      {selectedOptionMeasureTypeButton === "UNCOUNTABLE" && 
                        <div className={styles.selectedOptionFormGrid}>
                          <label htmlFor="isDefaultInput">is default:</label>
                          <input id="isDefaultInput" type="checkbox" checked={selectedOptionIsDefault} onChange={(e) => setSelectedOptionIsDefault(e.target.checked)}/>
                          <label htmlFor="measureTypeInput">measure type:</label>
                          <select id="measureTypeInput" value={selectedOptionMeasureType} onChange={(e) => handleChangeSelectedOptionMeasureType(e)}>
                            <option value="">
                              {defaultOptionString}
                            </option>
                            <option value="SIZE">
                              Size
                            </option>
                            <option value="DEGREE">
                              Degree
                            </option>
                          </select>
                          <label htmlFor="measureTypeInput">default unit:</label>
                          <select id="defaultMeasureValueInput" value={selectedOptionMeasureValue} disabled={selectedOptionMeasureType === "" ? true : false} onChange={(e) => setSelectedOptionMeasureValue(e.target.value)}>
                            <option value="">
                              {defaultOptionString}
                            </option>
                            {
                              selectedOptionMeasureType === "SIZE" &&
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
                              selectedOptionMeasureType === "DEGREE" &&
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
                          <input id="extraPriceInput" type="number" value={selectedOptionExtraPrice} onChange={(e) => setSelectedOptionExtraPrice(e.target.value)}/>
                          <label htmlFor="orderIndexInput">order index:</label>
                          <input id="orderIndexInput" type="number" value={selectedOptionOrderIndex} onChange={(e) => setSelectedOptionOrderIndex(e.target.value)}/>
                        </div>
                      }
                    </div>
                    <div className={styles.selectedOptionModalFooter}>
                      <button className={styles.optionModalButton} onClick={() => handleClickSelectedOptionSaveButton()}>Save</button>
                      <button className={styles.optionModalButton} onClick={() => handleClickSelectedOptionCancelButton()}>Cancel</button>
                    </div>
                  </Modal>
                }
                <div className={styles.optionModalLayout}>
                  <div className={styles.optionModalSearchSection}>
                    <input className={styles.optionModalSearchBar} placeholder="Type to search for options..."></input>
                  </div>
                  <div className={styles.optionModalSortSection}>
                  </div>
                  <div className={styles.optionModalItemSection}>
                    <div className={styles.optionModalGridContainer}>
                      {options.map((option, optionIdx) => {
                        const exists = selectedOptions.find(item => item.id === optionIdx);
                        return (
                          <div key={optionIdx} className={`${styles.optionModalGrid} ${exists ? styles.checked : ""}`} onClick={() => handleClickOptionGrid(optionIdx)}>
                            <div className={styles.optionImageContainer}>
                            </div>
                            <div className={styles.optionDetailContainer}>
                              <p>{option.optionName}</p>
                              <p>{option.optionCalories} Cal</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.selectedOptionSection}>
                  {selectedOptions.map((option, optionIdx) => {
                    return (
                      <div key={optionIdx} className={styles.selectedOptionBlock}>
                        <div className={styles.selectedOptionInfo}>
                          <div className={styles.optionImageContainer}>
                          </div>
                          <div className={styles.optionDetailContainer}>
                            <p>{option.item.optionName}</p>
                            <p>{option.item.optionCalories} Cal</p>
                          </div>
                        </div>
                        <div className={styles.selectedOptionBlockFooter}>
                          <button className={styles.optionModalButton} onClick={() => handleClickSelectedOptionCustomButton(optionIdx)}>Custom</button>
                          <button className={styles.optionModalButton} onClick={() => handleClickSelectedOptionDeleteButton(optionIdx)}>Delete</button>
                        </div>
                      </div>
                    );

                  })}
                </div>
                <div className={styles.optionModalFooter}>
                  <button className={styles.optionModalButton} onClick={() => handleClickOptionModalSaveButton()}>Save</button>
                  <button className={styles.optionModalButton} onClick={() => handleClickOptionModalCancelButton()}>Cancel</button>
                </div>
              </Modal>
      }
        <div className={styles.inputContainer}>
          <h2>Product</h2>
          <p>Please type in information of new product.</p>
          <label>
            product name: <input name="product" value={productName} placeholder="new product's name" onChange={() => setProductName()}/>
          </label>
          <label>
            product price: <input name="productPrice" value={productPrice} type="number" placeholder="new product's price" onChange={() => setProductPrice()}/>
          </label>
          <label>
            product calories: <input name="productCalories" value={productCalories} type="number" placeholder="new product's calories" onChange={() => setProductCalories()}/>
          </label>
          <label>
          product type:
          <select value={productType} onChange={(e) => setProductType(e.target.value)}>
            <option value="" disabled>
              {defaultOptionString}
            </option> 
            <option value="ONLY">
              Only
            </option>
            <option value="MEAL">
              Meal
            </option>
          </select>
          </label>
          <label>
            brief information: <input name="briefInfo" value={briefInfo} placeholder="brief information about new product" onChange={() => setBriefInfo()}/>
          </label>
          <label>
            category:
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="" disabled>
                  {defaultOptionString}
                </option>
                {categories.map((category, categoryIdx) => {
                  return (
                    <option key={categoryIdx} value={category.categoryId}>{category.name}</option>
                  );
                })}
              </select>
          </label>
        </div>

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
                        {defaultOptionString}
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
        <button>
          Create
        </button>
    </div>
  );
}

export default MenuCreate;