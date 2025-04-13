import {useState, useEffect, createContext} from "react";
import styles from "../styles/MenuCreate.module.css";
import Modal from "../components/Modal.jsx";
import axios from "axios";
import SelectedOptionCustom from "../components/MenuCreate/SelectedOptionCustom.jsx";
import ProductDetailInput from "../components/MenuCreate/ProductDetailInput.jsx";
import CustomizationDetailInput from "../components/MenuCreate/CustomizationDetailInput.jsx";

export const SelectedOptionsContext = createContext();

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

  const handleClickCreateButton = async () => {
    const customRuleRequests = [];

    customRules.map((customRule, customRuleIdx) => {
      const optionRequests = [];

      customRule.options.map((option, optionIdx) => {
        const optionTraitRequests = [];

        optionRequests.push({
          optionId: option.item.optionId,
          isDefault: option.isDefault,
          measureType: option.measureType,
          defaultQuantity: option.defaultQuantity,
          maxQuantity: option.maxQuantity,
          extraPrice: option.extraPrice,
          orderIndex: option.orderIndex,
          optionTraitRequests: optionTraitRequests
        }
        );
      });
      customRuleRequests.push(
        {
          customRuleName: customRule.customRuleName,
          customRuleType: customRule.customRuleType,
          maxSelection: customRule.maxSelection,
          minSelection: customRule.minSelection,
          rowIndex: customRuleIdx,
          optionRequests: optionRequests
        }
      )
    })

    const data = {
      productName: productName,
      productPrice: productPrice,
      calories: productCalories,
      productType: productType,
      briefInfo: briefInfo,
      categoryId: selectedCategoryId,
      customRuleRequests: customRuleRequests
    }

    console.log("Requested with", data);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/products", data);
      console.log("Response:", response.data);
    }
    catch (error) {
      console.error("Error:", error);
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
    <SelectedOptionsContext.Provider value={{
      selectedOptions,
      setSelectedOptions,
      selectedOptionIdx,
      setSelectedOptionIdx,
      optionTraits
      }}>
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
                      <SelectedOptionCustom/>
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
                            <button className={styles.customRuleButton} onClick={() => handleClickSelectedOptionBlockCustomButton(optionIdx)}>Custom</button>
                            <button className={styles.customRuleButton} onClick={() => handleClickSelectedOptionBlockDeleteButton(optionIdx)}>Delete</button>
                          </div>
                        </div>
                      );

                    })}
                  </div>
                  <div className={styles.optionModalFooter}>
                    <button className={styles.customRuleButton} onClick={() => handleClickOptionModalSaveButton()}>Save</button>
                    <button className={styles.customRuleButton} onClick={() => handleClickOptionModalCancelButton()}>Cancel</button>
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
          <button className={styles.finishButton} onClick={() => handleClickCreateButton()}>
            Create
          </button>
      </div>
    </SelectedOptionsContext.Provider>
  );
}

export default MenuCreate;