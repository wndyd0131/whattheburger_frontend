import { useState, useEffect } from "react";
import "../styles/Menu.styles.css";
import MenuBox from "../components/Menu/MenuBox";
import OrderSummary from "../components/OrderSummary";
import OrderCustomize from "../components/OrderCustomize";
import axios from "axios";

const categoryList = [
  { id: 1, name: "Burgers", imgSrc: "/icons/category/burger_icon.svg"},
  { id: 2, name: "Chicken", imgSrc: "/icons/category/chicken_icon.svg"},
  { id: 3, name: "Fish", imgSrc: "/icons/category/fish_icon.svg"},
  { id: 4, name: "ATF_LTO", imgSrc: "/icons/category/star_icon.svg"},
  { id: 5, name: "Kids", imgSrc: "/icons/category/kids_icon.svg"},
  { id: 6, name: "Sides", imgSrc: "/icons/category/fries_icon.svg"},
  { id: 7, name: "Salad", imgSrc: "/icons/category/salad_icon.svg"},
  { id: 8, name: "Dessert", imgSrc: "/icons/category/dessert_icon.svg"},
  { id: 9, name: "Drink", imgSrc: "/icons/category/drink_icon.svg"},
  { id: 10, name: "Large Order", imgSrc: "/icons/category/group_icon.svg"},
]

const Menu = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState({});
  const [defaultIngredients, setDefaultIngredients] = useState({});
  const [products, setProducts] = useState([]);
  const [productResponse, setProductResponse] = useState();
  const [customRules, setCustomRules] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmModalOpened, setConfirmModalOpened] = useState(false);

  const orderButtonClickHandler = (product) => {
    setSelectedProduct(product);
    setModalOpened(true);
  }

  const handleClickCloseButton = () => {
    setConfirmModalOpened(true);
  }

  const handleConfirmCloseButton = () => {
    setSelectedProduct(null);
    setCustomRules([]);
    setCurrentIngredients({totalExtraPrice: 0, ingredients: []});
    setConfirmModalOpened(false);
    setModalOpened(false);
  }

  useEffect(() => { /* Get Product By Category */
    axios.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(response => setProducts(response.data))
    .catch(error => console.error("Error: ", error));
  }, [selectedCategory]);

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
        let rowIndex = optionResponses[i].customRuleResponse.rowIndex;
        if (!newCustomRules[rowIndex]) {
          let customRuleName = optionResponses[i].customRuleResponse.name;
          newCustomRules[rowIndex] = {customRuleName: customRuleName, productOptions: []};
          ingredients[rowIndex] = {customRuleName: customRuleName, productOptions: [], totalCount: 0};
        }
        let orderObject = {
          ...optionResponses[i],
          optionQuantity: optionResponses[i].defaultQuantity,
        };
        console.log("OO", orderObject);
        for (let j = 0; j < orderObject.optionTraitResponses.length; j++) {
          orderObject.optionTraitResponses[j].currentSelection = orderObject.optionTraitResponses[j].defaultSelection;
        }
        newCustomRules[rowIndex].productOptions.push(orderObject);
        if (orderObject.isDefault === true) {
          ingredients[rowIndex].productOptions.push(orderObject);
          ingredients[rowIndex].totalCount++;
          totalCalories += orderObject.calories;
        }
        else {
          ingredients[rowIndex].productOptions.push(null);
        }
      }
      setCustomRules(newCustomRules);
      setDefaultIngredients({totalExtraPrice: 0, totalCalories: totalCalories, ingredients: structuredClone(ingredients)});
      setCurrentIngredients({totalExtraPrice: 0, totalCalories: totalCalories, ingredients: structuredClone(ingredients)});
    })
    .catch(error => console.error("Error: ", error))
    .finally(() => setIsLoading(false));
  }, [selectedProduct]);
  


  const handleSelectedCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  }

  return (
    <>
      <div className="content-container">
        <div className="menu-container">
          <div className="category-nav">
            <ul>
              {categoryList.map((category) => 
                  <li
                    key={category.id}
                    onMouseEnter={() => setHoveredCategory(category.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <a onClick={() => handleSelectedCategory(category.id)}>
                      <img src={category.imgSrc}/>
                    </a>
                    <div className={`hovered-category-box ${hoveredCategory === category.id ? "active" : ""}`}>
                      <p>
                        {category.name}
                      </p>
                    </div>
                  </li>
                )}
            </ul>
          </div>

          <div className="menu-box">
            <h1>MENU</h1>
            <h2>{categoryList[selectedCategory-1].name}</h2>
            <div className="menu-grid">
              {products.map( product => 
                  <MenuBox key={product.productId} name={product.productName} description={product.briefInfo} calories={700} imgSrc="/src/assets/menu/Whataburger31.png" setModalOpened={() => orderButtonClickHandler(product)}></MenuBox>
              )}
            </div>
          </div>
        </div>
        {modalOpened && (
          <>
            <div className="overlay">
              <div className="order-layout">
                {confirmModalOpened && (
                <div className="overlay">
                  <div className="confirm-modal">
                    <div className="confirm-modal-text-container">
                      <h3>Are you sure you want to cancel order?</h3>
                    </div>
                    <div className="confirm-modal-button-container">
                      <button onClick={() => handleConfirmCloseButton()}><strong>Yes</strong></button>
                      <button onClick={() => setConfirmModalOpened(false)}><strong>No</strong></button>
                    </div>

                  </div>
                </div>
                )}
                <div className="close-order-modal-button" onClick={() => handleClickCloseButton()}>
                  X
                </div>
                <OrderSummary product={selectedProduct} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients} defaultIngredients={defaultIngredients} isLoading={isLoading}/>
                <OrderCustomize customRules={customRules} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients}/>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Menu;