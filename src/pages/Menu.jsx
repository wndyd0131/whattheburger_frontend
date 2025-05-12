import { useState, useEffect, useReducer, useContext, createContext } from "react";
import "../styles/Menu.styles.css";
import axios from "axios";
import CategoryNav from "../components/Menu/CategoryNav";
import MenuContainer from "../components/Menu/MenuContainer";
import OrderModal from "../components/Menu/OrderModal/OrderModal";
import { MenuContext } from "../contexts/MenuContext";

export const ACTIONS = {
  LOAD_OPTIONS: 'loadOptions',
  LOAD_DEFAULT: 'loadDefault'
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedOptionReducer = (state, action) => {
    switch(action.type) {
      case ACTIONS.LOAD_OPTIONS:
        const optionResponse = action.payload.optionResponse;
        const updatedState = structuredClone(state);

        optionResponse.forEach((option) => {
          const orderIndex = option.customRuleResponse.orderIndex;
          const orderObject = {
            ...option,
            optionQuantity: option.defaultQuantity
          };
          let totalCalories = 0;


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
        })
        return updatedState;
    }
  }
  const [selectedOptionState, dispatchSelectedOption] = useReducer();

  const orderReducer = (state, action) => {

    switch(action.type) {
      case ACTIONS.LOAD_OPTIONS: {
        const updatedState = structuredClone(state);
        const optionResponse = action.payload.optionResponse;
        const customRules = [];
        const selections = [];
        let totalCalories = 0;
        
        optionResponse.forEach((option) => {
          const customRuleIdx = option.customRuleResponse.orderIndex;
          
          const optionDetailObject = {
            ...option,
            optionQuantity: option.defaultQuantity
          };

          if (!customRules[customRuleIdx]) {
            const customRuleName = option.customRuleResponse.name;
            customRules[customRuleIdx] = {
              customRuleName: customRuleName,
              optionDetails: []
            };
            selections[customRuleIdx] = {
              customRuleName: customRuleName,
              optionDetails: [],
              totalCount: 0
            }
          }
          optionDetailObject.optionTraitResponses.forEach((optionTraitResponse) => {
            optionTraitResponse.currentSelection = optionTraitResponse.defaultSelection;
          });
          customRules[customRuleIdx].optionDetails.push(optionDetailObject);

          if (optionDetailObject.isDefault) {
            selections[customRuleIdx].optionDetails.push(optionDetailObject);
            selections[customRuleIdx].totalCount++;
            totalCalories += optionDetailObject.calories;
          }
          else {
            selections[customRuleIdx].optionDetails.push(null);
          }
        });
        updatedState.customRules.items = customRules;
        updatedState.selections.items = selections;
        updatedState.defaultSelections.items = selections;
        updatedState.selections.totalCalories = totalCalories;
        updatedState.defaultSelections.totalCalories = totalCalories;
        return updatedState;
      }
      case ACTIONS.LOAD_DEFAULT: {
        const updatedState = structuredClone(state);
        updatedState.defaultSelections = updatedState.selections;
      }
      default:
        return state;
    }
  }
  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    {
      customRules: {
        items: []
      },
      selections: {
        totalExtraPrice: 0,
        totalCalories: 0,
        items: []
      },
      defaultSelections: {
        totalExtraPrice: 0,
        totalCalories: 0,
        items: []
      }
    }
  );

  useEffect(() => { /* Get Product By Category */
    axios.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(response => setProducts(response.data))
    .catch(error => console.error("Error: ", error));
  }, []);

  useEffect(() => { /* Get Product By Product Id */
    if (!selectedProduct) return;

    setIsLoading(true);
    setCustomRules([]);

    axios.get(`http://localhost:8080/api/v1/products/${selectedProduct.productId}`)
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
  }, [selectedProduct]);

  {
    console.log("OS: ", orderState);
  }

  return (
    <MenuContext.Provider value={{
      categoryList: categoryList,
      products: products,
      customRules: customRules,
      currentIngredients: currentIngredients,
      setCustomRules: setCustomRules,
      setProducts: setProducts,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory,
      selectedProduct: selectedProduct,
      setSelectedProduct: setSelectedProduct,
      setCurrentIngredients: setCurrentIngredients,
      setProductResponse: setProductResponse,
      orderState: orderState,
      dispatchOrder: dispatchOrder
    }}>
      <div className="flex flex-col pt-[150px] px-[200px]">
        <div className="flex justify-center items-start rounded-[40px] h-[100vh] pb-[50px]">
          <CategoryNav/>
          <MenuContainer/>
        </div>
        {selectedProduct !== null && (
          <OrderModal/>
        )}
      </div>
    </MenuContext.Provider>
  );
}

export default Menu;