import {useState, useEffect, createContext, useReducer} from "react";
import styles from "../styles/MenuCreate.module.css";
import axios from "axios";
import ProductDetailInput from "../components/MenuCreate/ProductDetailInput.jsx";
import CustomizationDetailInput from "../components/MenuCreate/CustomizationDetailInput.jsx";
import OptionModal from "../components/MenuCreate/OptionModal/OptionModal.jsx";
import {customRuleReducer} from "../reducers/MenuCreate/customRuleReducer.js";
import {selectedOptionReducer} from "../reducers/MenuCreate/selectedOptionReducer.js";



export const MenuCreateContext = createContext();

const MenuCreate = () => {
  const [customRuleState, customRuleDispatch] = useReducer(customRuleReducer, []);
  const [selectedOptionState, selectedOptionDispatch] = useReducer(selectedOptionReducer, []);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCalories, setProductCalories] = useState(0);
  const [productType, setProductType] = useState("");
  const [briefInfo, setBriefInfo] = useState("");
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionTraits, setOptionTraits] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [customRuleName, setCustomRuleName] = useState("");
  const [customRuleType, setCustomRuleType] = useState("");
  const [minSelection, setMinSelection] = useState(0);
  const [maxSelection, setMaxSelection] = useState(0);

  const [selectedCustomRuleIdx, setSelectedCustomRuleIdx] = useState(null);

  const handleClickCreateButton = async () => {
    const customRuleRequests = [];

    customRuleState.map((customRule, customRuleIdx) => {
      const optionRequests = [];
      console.log(customRule);

      customRule.options.map((option, optionIdx) => {
        console.log(option);
        const optionTraitRequests = [];
        if (option.optionTrait.optionTraitId !== null) {
          optionTraitRequests.push({
            optionTraitId: option.optionTrait.optionTraitId,
            defaultSelection: option.optionTrait.defaultSelection,
            optionTraitExtraPrice: option.optionTrait.optionTraitExtraPrice,
            extraCalories: option.optionTrait.extraCalories
          })
        }

        const countType = option.countType === "SINGLE" || option.countType === "COUNTABLE" ? "COUNTABLE" : "UNCOUNTABLE";
        const measureType = option.measureType === "" || option.measureType === undefined ? null : option.measureType;
        const measureValue = option.measureValue === "" || option.measureValue === undefined ? null : option.measureValue;
        optionRequests.push({
          optionId: option.optionId,
          isDefault: option.isDefault,
          countType: countType,
          measureType: measureType,
          measureValue: measureValue,
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
          orderIndex: customRuleIdx,
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
      categoryIds: selectedCategoryIds,
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
      console.log(response);
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
    <MenuCreateContext.Provider value={{
      customRuleState: customRuleState,
      customRuleDispatch: customRuleDispatch,
      selectedOptionState: selectedOptionState,
      selectedOptionDispatch: selectedOptionDispatch,
      options: options,
      optionTraits: optionTraits,
      selectedCustomRuleIdx: selectedCustomRuleIdx,
      selectedOptions: selectedOptions,
      setSelectedOptions: setSelectedOptions,
      setSelectedCustomRuleIdx: setSelectedCustomRuleIdx
    }}>
      <div className={styles.contentLayout}>
          <ProductDetailInput
            categories={categories}
            productName={productName}
            productPrice={productPrice}
            productCalories={productCalories}
            productType={productType}
            briefInfo={briefInfo}
            selectedCategoryIds={selectedCategoryIds}
            setProductName={setProductName}
            setProductPrice={setProductPrice}
            setProductCalories={setProductCalories}
            setProductType={setProductType}
            setBriefInfo={setBriefInfo}
            setSelectedCategoryIds={setSelectedCategoryIds}
          />

          <CustomizationDetailInput
            customRuleName={customRuleName}
            customRuleType={customRuleType}
            minSelection={minSelection}
            maxSelection={maxSelection}
            setCustomRuleName={setCustomRuleName}
            setCustomRuleType={setCustomRuleType}
            setMinSelection={setMinSelection}
            setMaxSelection={setMaxSelection}
          />
          <button className={styles.finishButton} onClick={() => handleClickCreateButton()}>
            Create
          </button>

          {selectedCustomRuleIdx !== null &&
            <OptionModal/>
          }
      </div>
    </MenuCreateContext.Provider>
  );
}

export default MenuCreate;