import {useState, useEffect} from "react";
import styles from "../styles/MenuCreate.module.css";
import axios from "axios";

const MenuCreate = () => {

  const defaultOptionString = "----Select----";

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCalories, setProductCalories] = useState(0);
  const [productType, setProductType] = useState("");
  const [briefInfo, setBriefInfo] = useState("");
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [customRuleName, setcustomRuleName] = useState("");
  const [customRuleType, setCustomRuleType] = useState("");
  const [minSelection, setMinSelection] = useState(0);
  const [maxSelection, setMaxSelection] = useState(0);
  const [customizations, setCustomizations] = useState([]);
  const [addButtonClicked, setAddButtonClicked] = useState(false);
  const [addOptionButtonClicked, setAddOptionButtonClicked] = useState(false);

  const isValidCustomizationName = () => {
    return customRuleName.length > 0;
  }

  const handleClickAddButton = () => {
    setAddButtonClicked(true);
  }

  const handleClickSaveButton = () => {
    if (isValidCustomizationName) {
      const obj = {
        customRuleName: customRuleName,
        customRuleType: customRuleType,
        minSelection: minSelection,
        maxSelection: maxSelection
      };
      setCustomizations((prev) => [...prev, obj]);
      setAddButtonClicked(false);
    }
  }

  const handleClickCancelButton = () => {
    setAddButtonClicked(false);
  }

  const handleClickDeleteGridButton = (gridIdx) => {
    setCustomizations((prev) => prev.filter((_, i) => i !== gridIdx));
  }

  const handleClickAddOptionButton = () => {
    setAddOptionButtonClicked(true);
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
      {addOptionButtonClicked &&
        <div className={styles.overlay}>
          <div className={styles.optionModal}>
            <div className={styles.optionModalHeader}>
              <div className={styles.closeOptionModalButton}>
                X
              </div>
            </div>
            <div className={styles.optionModalLayout}>
              <div className={styles.optionModalSortSection}>
              </div>
              <div className={styles.optionModalSearchSection}>
                <input className={styles.optionModalSearchBar} placeholder="Type to search for options..."></input>
              </div>
              <div className={styles.optionModalItemSection}>
                <div className={styles.optionModalGridContainer}>
                  {options.map((option, optionIdx) => {
                    return (
                      <div key={optionIdx} className={styles.optionModalGrid}>
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
            <div className={styles.optionModalFooter}>
            </div>
          </div>
        </div>
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
                      {customization.customRuleName}
                    </div>
                    <div className={styles.customizationInfoGrid}>
                      {customization.customRuleType}
                    </div>
                    <div className={styles.customizationInfoGrid}>
                      {customization.minSelection}
                    </div>
                    <div className={styles.customizationInfoGrid}>
                      {customization.maxSelection}
                    </div>
                  </div>
                  <div className={styles.customizationGridButton2}>
                    <button onClick={() => handleClickAddOptionButton()}>Add Options</button>
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
                    <input name="customRuleName" value={customRuleName} placeholder="" onChange={(e) => setcustomRuleName(e.target.value)}/>
                  </label>
                  <label className={styles.customizationInputGrid}>
                    <select value={customRuleType} onChange={(e) => setCustomRuleType(e.target.value)}>
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