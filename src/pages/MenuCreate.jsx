import {useState, useEffect, createContext, useReducer} from "react";
import styles from "../styles/MenuCreate.module.css";
import axios from "axios";
import ProductDetailInput from "../components/MenuCreate/ProductDetailInput.jsx";
import CustomizationDetailInput from "../components/MenuCreate/CustomizationDetailInput.jsx";
import OptionModal from "../components/MenuCreate/OptionModal/OptionModal.jsx";

export const MenuCreateContext = createContext();

export const ACTIONS = {
  ADD_CUSTOMRULE: 'addCustomRule',
  SAVE_CUSTOMRULE: 'saveCustomRule',
  DELETE_CUSTOMRULE: 'deleteCustomRule',
  ADD_OPTION: 'addOption',
  SAVE_OPTION: 'saveOption',
  DELETE_OPTION: 'deleteOption',
  INIT_SELECTED_OPTIONS: 'initSelectedOptions',
  LOAD_SELECTED_OPTIONS: 'loadSelectedOptions'
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
      case ACTIONS.DELETE_CUSTOMRULE:
        console.log(state);
        return state.filter((_, idx) => idx !== action.payload.customRuleIdx);
        
      case ACTIONS.SAVE_CUSTOMRULE:
        return state.map((customRule, customRuleIdx) => 
          customRuleIdx === action.payload.selectedCustomRuleIdx
            ? {...customRule, options: action.payload.selectedOptionState} : customRule
        );

      default:
        return state;
    }
  }

  const selectedOptionReducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.ADD_OPTION:
        const elementId = action.payload.elementId;
        const option = action.payload.option;
        const nextIdx = state.length;

        const emptyOptionTrait = {
          elementId: null,
          optionTraitId: null,
          defaultSelection: null,
          extraPrice: null,
          extraCalories: null
        };
        const newOption = {
          elementId: elementId,
          optionId: option.optionId,
          optionName: option.optionName,
          optionCalories: option.optionCalories,
          imageSource: option.imageSource,
          isDefault: false,
          defaultQuantity: 1,
          maxQuantity: 1,
          extraPrice: 0,
          orderIndex: nextIdx,
          measureTypeButton: "SINGLE",
          optionTrait: emptyOptionTrait
        };
        return [...state, newOption];
        
      case ACTIONS.SAVE_OPTION:
        const optionDetail = action.payload.optionDetail;
        const optionTraitDetail = action.payload.optionTraitDetail;
        console.log("OD", optionDetail);
        console.log("OTD", optionTraitDetail);

        return state.map(((selectedOption, _selectedOptionIdx) => 
          _selectedOptionIdx === action.payload.selectedOptionIdx 
            ? {
              ...selectedOption,
              isDefault: optionDetail.isDefault,
              defaultQuantity: optionDetail.defaultQuantity,
              maxQuantity: optionDetail.maxQuantity,
              extraPrice: optionDetail.extraPrice,
              orderIndex: optionDetail.orderIndex,
              measureTypeButton: optionDetail.measureTypeButton,
              measureType: optionDetail.measureType,
              measureValue: optionDetail.measureValue,
              optionTrait: {
                elementId: optionTraitDetail.elementId,
                optionTraitId: optionTraitDetail.optionTraitId,
                defaultSelection: optionTraitDetail.defaultSelection,
                optionTraitExtraPrice: optionTraitDetail.extraPrice,
                extraCalories: optionTraitDetail.extraCalories
              }
            }
            : selectedOption
        ));
        
      case ACTIONS.DELETE_OPTION:
        var optionIdx = action.payload.optionIdx;
        switch (action.payload.deleteMethod) {
          case "grid":
            return state.filter((selectedOption, _) => selectedOption.elementId !== optionIdx); // filter by elementId
          case "button":
            return state.filter((_, idx) => idx !== optionIdx); // filter by index of array
          default:
            return state;
        }

      case ACTIONS.LOAD_OPTION:

      case ACTIONS.INIT_SELECTED_OPTIONS:
        return [];

      case ACTIONS.LOAD_SELECTED_OPTIONS:
        const selectedOptions = action.payload.selectedOptions;
        return selectedOptions;

      default:
        return state;
    }
  }

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
  const [customRules, setCustomRules] = useState([]);
  const [requestObject, setRequestObject] = useState({});

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

        optionRequests.push({
          optionId: option.optionId,
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