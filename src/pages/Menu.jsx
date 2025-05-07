import { useState, useEffect, useReducer, useContext, createContext } from "react";
import "../styles/Menu.styles.css";
import axios from "axios";
import CategoryNav from "../components/Menu/CategoryNav";
import MenuContainer from "../components/Menu/MenuContainer";
import OrderModal from "../components/Menu/OrderModal/OrderModal";
import { MenuContext } from "../contexts/MenuContext";

export const ACTIONS = {
  LOAD_CUSTOMRULES: 'loadCustomRules',
  LOAD_OPTIONS: 'loadOptions'
};

const Menu = (props) => {

  const categoryList = [
    { id: 1, name: "Burgers", imgSrc: "/icons/category/burger_icon.svg"},
    { id: 2, name: "Chickens", imgSrc: "/icons/category/chicken_icon.svg"},
    { id: 3, name: "Fish", imgSrc: "/icons/category/fish_icon.svg"},
    { id: 4, name: "ATF & LTO", imgSrc: "/icons/category/star_icon.svg"},
    { id: 5, name: "Kids", imgSrc: "/icons/category/kids_icon.svg"},
    { id: 6, name: "Sides", imgSrc: "/icons/category/fries_icon.svg"},
    { id: 7, name: "Salad", imgSrc: "/icons/category/salad_icon.svg"},
    { id: 8, name: "Dessert", imgSrc: "/icons/category/dessert_icon.svg"},
    { id: 9, name: "Drink", imgSrc: "/icons/category/drink_icon.svg"},
    { id: 10, name: "Large Order", imgSrc: "/icons/category/group_icon.svg"},
  ]
  
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState({});
  const [defaultIngredients, setDefaultIngredients] = useState({});
  const [products, setProducts] = useState([]);
  const [productResponse, setProductResponse] = useState(null);
  const [customRules, setCustomRules] = useState([]);
  const [selectedProductIdx, setSelectedProductIdx] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedOptionReducer = (state, action) => {
    switch(action.type) {
      case LOAD_OPTIONS:
        const optionResponse = action.payload.optionResponse;
        const updatedState = structuredClone(state);

        optionResponse.forEach((option) => {
          const orderIndex = option.customRuleResponse.orderIndex;
          const orderObject = {
            ...option,
            optionQuantity: option.defaultQuantity
          };

          if (!updatedState[orderIndex]) {
            const customRuleName = option.customRuleResponse.name;
            updatedState[orderIndex] = {customRuleName: customRuleName, productOptions: [], totalCount: 0};
          }
          for (let i = 0; i < orderObject.optionTraitResponses.length; i++) {
            orderObject.optionTraitResponses[i].currentSelection = orderObject.optionTraitResponses[i].defaultSelection;
          }
          if (orderObject.isDefault === true) {
            updatedState[orderIndex].productOptions.push(orderObject);
            updatedState[orderIndex].totalCount++;
            totalCalories += orderObject.calories;
          }
          else {
            updatedState[orderIndex].productOptions.push(null);
          }
          return updatedState;
        })
    }
  }
  const [selectedOptionState, dispatchSelectedOption] = useReducer(selectedOptionReducer, []);

  const customRuleReducer = (state, action) => {
    switch(action.type) {
      case LOAD_CUSTOMRULES:
        const optionResponse = action.payload.optionResponse;
        const updatedState = structuredClone(state);

        optionResponse.forEach((option) => {
          const orderIndex = option.customRuleResponse.orderIndex;
          const orderObject = {
            ...option,
            optionQuantity: option.defaultQuantity
          };

          if (!updatedState[orderIndex]) {
            const customRuleName = option.customRuleResponse.name;
            updatedState[orderIndex] = {customRuleName: customRuleName, productOptions: []};
          }
          for (let i = 0; i < orderObject.optionTraitResponses.length; i++) {
            orderObject.optionTraitResponses[i].currentSelection = orderObject.optionTraitResponses[i].defaultSelection;
          }
          updatedState[orderIndex].productOptions.push(orderObject);

          return updatedState;
        })
    }
  }
  const [customRuleState, dispatchCustomRule] = useReducer(customRuleReducer, []);

  useEffect(() => { /* Get Product By Category */
    axios.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(response => setProducts(response.data))
    .catch(error => console.error("Error: ", error));
  }, []);

  useEffect(() => { /* Get Product By Product Id */
    if (!selectedProductIdx) return;

    setIsLoading(true);
    setCustomRules([]);

    axios.get(`http://localhost:8080/api/v1/products/${selectedProductIdx.productId}`)
    .then(response => {
      console.log("RESPONSE: ", response.data);
      const optionLength = response.data.optionResponses.length;
      const optionResponses = response.data.optionResponses;
      const newCustomRules = []; // customization rules (including entire options)
      const ingredients = []; // current or related ingredients (including partial options)
      let totalCalories = 0;
      
      for (let i = 0; i < optionLength; i++) {
        let orderIndex = optionResponses[i].customRuleResponse.orderIndex;
        if (!newCustomRules[orderIndex]) { // if orderIndex is newly created
          let customRuleName = optionResponses[i].customRuleResponse.name;
          newCustomRules[orderIndex] = {customRuleName: customRuleName, productOptions: []};
          ingredients[orderIndex] = {customRuleName: customRuleName, productOptions: [], totalCount: 0};
        }
        let orderObject = {
          ...optionResponses[i],
          optionQuantity: optionResponses[i].defaultQuantity,
        };
        console.log("OO", orderObject);
        for (let j = 0; j < orderObject.optionTraitResponses.length; j++) {
          orderObject.optionTraitResponses[j].currentSelection = orderObject.optionTraitResponses[j].defaultSelection;
        }
        newCustomRules[orderIndex].productOptions.push(orderObject);
        if (orderObject.isDefault === true) {
          ingredients[orderIndex].productOptions.push(orderObject);
          ingredients[orderIndex].totalCount++;
          totalCalories += orderObject.calories;
        }
        else {
          ingredients[orderIndex].productOptions.push(null);
        }
      }
      setCustomRules(newCustomRules);
      setDefaultIngredients({totalExtraPrice: 0, totalCalories: totalCalories, ingredients: structuredClone(ingredients)});
      setCurrentIngredients({totalExtraPrice: 0, totalCalories: totalCalories, ingredients: structuredClone(ingredients)});
    })
    .catch(error => console.error("Error: ", error))
    .finally(() => setIsLoading(false));
  }, [selectedProductIdx]);

  {
    console.log("CSS: ", customRuleState);
    console.log("SOS: ", selectedOptionState);
  }

  return (
    <MenuContext.Provider value={{
      categoryList: categoryList,
      products: products,
      customRules: customRules,
      setCustomRules: setCustomRules,
      setProducts: setProducts,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory,
      selectedProductIdx: selectedProductIdx,
      setSelectedProductIdx: setSelectedProductIdx,
      setCurrentIngredients: setCurrentIngredients,
      setProductResponse: setProductResponse,
      customRuleState: customRuleState,
      dispatchCustomRule: dispatchCustomRule,
      selectedOptionState: selectedOptionState,
      dispatchSelectedOption: dispatchSelectedOption
    }}>
      <div className="flex flex-col pt-[150px] px-[200px]">
        <div className="flex justify-center items-start rounded-[40px] h-[100vh] pb-[50px]">
          <CategoryNav/>
          <MenuContainer/>
        </div>
        {selectedProductIdx !== null && (
          <OrderModal/>
        )}
      </div>
    </MenuContext.Provider>
  );
}

export default Menu;