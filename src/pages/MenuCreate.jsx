import {useState, useEffect, createContext, useReducer} from "react";
import styles from "../styles/MenuCreate.module.css";
import axios from "axios";
import ProductDetailInput from "../components/MenuCreate/ProductDetailInput.jsx";
import CustomizationDetailInput from "../components/MenuCreate/CustomizationDetailInput.jsx";
import OptionModal from "../components/MenuCreate/OptionModal/OptionModal.jsx";

export const MenuContext = createContext();

export const ACTIONS = {
  ADD_CUSTOMRULE: 'addCustomRule',
  SAVE_CUSTOMRULE: 'saveCustomRule',
  ADD_OPTION: 'addOption',
  SAVE_OPTION: 'saveOption',
  SAVE_OPTION_TRAITS: 'saveOptionTraits'
}

const MenuCreate = () => {
  const customRuleReducer = (state, action) => {
    switch(action.type) {
      case ACTIONS.ADD_CUSTOMRULE:
        return [
          ...state,
          {
            customRuleName: action.payload.customRuleName,
            customRuleType: action.payload.customRuleType,
            minSelection: action.payload.minSelection,
            maxSelection: action.payload.maxSelection,
            options: []
          }
        ];
      case ACTIONS.SAVE_CUSTOMRULE:
        return state.map((customRule, customRuleIdx) => 
          customRuleIdx === action.payload.selectedCustomRuleIdx
            ? {...customRule, options: action.payload.selectedOptionState} : customRule
        );
      default:
        return state;
    }
  }

  const [customRuleState, customRuleDispatch] = useReducer(customRuleReducer, []);

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
  const [customRules, setCustomRules] = useState([]);
  const [selectedCustomRuleIdx, setSelectedCustomRuleIdx] = useState("");
  const [requestObject, setRequestObject] = useState({});

  const [selectedOptionIdx, setSelectedOptionIdx] = useState("");

  console.log("CR", customRuleState);

  const handleClickCreateButton = async () => {
    const customRuleRequests = [];

    customRules.map((customRule, customRuleIdx) => {
      const optionRequests = [];

      customRule.options.map((option, optionIdx) => {
        const optionTraitRequests = [];

        optionRequests.push({
          optionId: option.item.optionId,
          isDefault: option.isDefault,
          measureType: option.measureType === "" ? null : option.measureType,
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
    <MenuContext.Provider value={{
      customRuleState: customRuleState,
      customRuleDispatch: customRuleDispatch,
      customRules: customRules, // temporary
      setCustomRules: setCustomRules, // temporary
      options: options,
      optionTraits: optionTraits,
      selectedCustomRuleIdx: selectedCustomRuleIdx,
      selectedOptions: selectedOptions,
      setSelectedOptions: setSelectedOptions,
      selectedOptionIdx: selectedOptionIdx,
      setSelectedOptionIdx: setSelectedOptionIdx,
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

          {selectedCustomRuleIdx !== "" &&
            <OptionModal/>
          }
      </div>
    </MenuContext.Provider>
  );
}

export default MenuCreate;