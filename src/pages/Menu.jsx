import { useState, useEffect } from "react";
import "../styles/Menu.styles.css";
import MenuBox from "../components/Menu/MenuBox";
import OrderSummary from "../components/OrderSummary";
import OrderCustomize from "../components/OrderCustomize";
import axios from "axios";

const Menu = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [defaultIngredients, setDefaultIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [productResponse, setProductResponse] = useState();
  const [customRules, setCustomRules] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const OrderButtonClickHandler = (product) => {
    setSelectedProduct(product);
    setModalOpened(true);
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
      let len = response.data["optionRequests"].length;
      let optionResponse = response.data["optionRequests"];
      console.log("RESPONSE: ", response.data);
      let newCustomRules = [];
      let ingredients = [];
      for (let i = 0; i < len; i++) {
        let rowIndex = response.data["optionRequests"][i]["customRuleRequest"]["rowIndex"];
        if (!newCustomRules[rowIndex]) {
          let customRuleName = response.data["optionRequests"][i]["customRuleRequest"]["name"];
          newCustomRules[rowIndex] = {customRuleName: customRuleName, productOptions: []};
          ingredients[rowIndex] = {customRuleName: customRuleName, productOptions: []};
        }
        newCustomRules[rowIndex].productOptions.push(optionResponse[i]);
        if (response.data["optionRequests"][i].isDefault === true) {
          ingredients[rowIndex].productOptions.push(optionResponse[i]);
        }
      }
      setCustomRules(newCustomRules);
      setDefaultIngredients(ingredients);
      setCurrentIngredients(ingredients);
    })
    .catch(error => console.error("Error: ", error))
    .finally(() => setIsLoading(false));
  }, [selectedProduct]);
  
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
                  <MenuBox key={product.productId} name={product.productName} description={product.briefInfo} calories={700} imgSrc="/src/assets/menu/Whataburger31.png" setModalOpened={() => OrderButtonClickHandler(product)}></MenuBox>
              )}
            </div>
          </div>
        </div>
        {modalOpened && (
          <div className="overlay">
            <div className="order-layout">
              <div className="close-order-modal-button" onClick={() => setModalOpened(false)}>
                X
              </div>
              <OrderSummary product={selectedProduct} currentIngredients={currentIngredients} defaultIngredients={defaultIngredients}/>
              <OrderCustomize customRules={customRules} currentIngredients={currentIngredients} setCurrentIngredients={setCurrentIngredients}/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Menu;