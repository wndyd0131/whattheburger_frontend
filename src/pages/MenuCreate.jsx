import {useState, useEffect} from "react";
import styles from "../styles/MenuCreate.module.css";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import SelectedOptionCustom from "../components/MenuCreate/SelectedOptionCustom.jsx";
import ProductDetailInput from "../components/MenuCreate/ProductDetailInput.jsx";
import CustomizationDetailInput from "../components/MenuCreate/CustomizationDetailInput.jsx";

const MenuCreate = () => {

  const optionModalStyle = {
    height: 850,
    width: 1400,
    flexDirection: "column"
  }
  const selectedOptionModalStyle = {
    height: 350,
    width: 600,
    flexDirection: "column"
  };

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCalories, setProductCalories] = useState(0);
  const [productType, setProductType] = useState("");
  const [briefInfo, setBriefInfo] = useState("");
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionTraits, setOptionTraits] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [customRuleName, setCustomRuleName] = useState("");
  const [customRuleType, setCustomRuleType] = useState("");
  const [minSelection, setMinSelection] = useState(0);
  const [maxSelection, setMaxSelection] = useState(0);
  const [customRules, setCustomRules] = useState([]);
  const [selectedCustomRuleIdx, setSelectedCustomRuleIdx] = useState("");
  const [requestObject, setRequestObject] = useState({});

  const [selectedOptionIdx, setSelectedOptionIdx] = useState("");

  const handleClickOptionGrid = (optionIdx) => {
    setSelectedOptions(prev => {
      const exists = prev.find(option => option.id === optionIdx);
      const currentIndex = selectedOptions.length;

      const newOption = {
        id: optionIdx,
        item: options[optionIdx],
        isDefault: false,
        defaultQuantity: 1,
        maxQuantity: 1,
        extraPrice: 0,
        orderIndex: currentIndex,
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

  const handleClickSelectedOptionBlockCustomButton = (optionIdx) => {
    setSelectedOptionIdx(optionIdx);
  }

  const handleClickSelectedOptionBlockDeleteButton = (optionIdx) => {
    setSelectedOptions(prev => prev.filter((_, idx) => optionIdx !== idx));
  }

  const handleClickOptionModalSaveButton = () => {
    const updatedcustomRules = structuredClone(customRules);
    updatedcustomRules[selectedCustomRuleIdx].options = selectedOptions;
    setCustomRules(updatedcustomRules);
    closeOptionModal();
    // successfully saved notification
  }

  const handleClickOptionModalCancelButton = () => {
    closeOptionModal();
  }

  const closeOptionModal = () => {
    setSelectedOptions([]);
    setSelectedCustomRuleIdx("");
  }

  const handleClickCreateButton = () => {
    const updatedCustomRules = structuredClone(customRules);
    updatedCustomRules.map((customRule, customRuleIdx) => {
      customRule.rowIndex = customRuleIdx;
    })

    console.log(updatedCustomRules);

    const obj = {
      productName: productName,
      productPrice: productPrice,
      calories: productCalories,
      productType: productType,
      briefInfo: briefInfo,
      categoryId: selectedCategoryId,
      customRuleRequests: updatedCustomRules
    }
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

    axios.get("http://localhost:8080/api/v1/optionTraits")
    .then(response => {
      setOptionTraits(response.data);
    })
    .catch(error => console.error(error));

  }, [])

  return (
    <div className={styles.contentLayout}>
      {selectedCustomRuleIdx !== "" &&
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
                    <SelectedOptionCustom selectedOptions={selectedOptions} selectedOptionIdx={selectedOptionIdx} optionTraits={optionTraits} setSelectedOptions={setSelectedOptions} setSelectedOptionIdx={setSelectedOptionIdx}/>
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
                          <button className={styles.optionModalButton} onClick={() => handleClickSelectedOptionBlockCustomButton(optionIdx)}>Custom</button>
                          <button className={styles.optionModalButton} onClick={() => handleClickSelectedOptionBlockDeleteButton(optionIdx)}>Delete</button>
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
        <ProductDetailInput
          categories={categories}
          productName={productName}
          productPrice={productPrice}
          productCalories={productCalories}
          productType={productType}
          briefInfo={briefInfo}
          selectedCategoryId={selectedCategoryId}
          setProductName={setProductName}
          setProductPrice={setProductPrice}
          setProductCalories={setProductCalories}
          setProductType={setProductType}
          setBriefInfo={setBriefInfo}
          setSelectedCategoryId={setSelectedCategoryId}
        />

        <CustomizationDetailInput
          customRules={customRules}
          customRuleName={customRuleName}
          customRuleType={customRuleType}
          minSelection={minSelection}
          maxSelection={maxSelection}
          setCustomRules={setCustomRules}
          setSelectedCustomRuleIdx={setSelectedCustomRuleIdx}
          setCustomRuleName={setCustomRuleName}
          setCustomRuleType={setCustomRuleType}
          setMinSelection={setMinSelection}
          setMaxSelection={setMaxSelection}
          setSelectedOptions={setSelectedOptions}
        />
        <button onClick={() => handleClickCreateButton()}>
          Create
        </button>
    </div>
  );
}

export default MenuCreate;