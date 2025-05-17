import { useState, useEffect, useReducer, useContext, createContext } from "react";
import "../styles/Menu.styles.css";
import axios from "axios";
import CategoryNav from "../components/Menu/CategoryNav";
import MenuContainer from "../components/Menu/MenuContainer";
import OrderModal from "../components/Menu/OrderModal/OrderModal";
import { MenuContext } from "../contexts/MenuContext";
import { orderReducer } from "../reducers/Menu/orderReducer";
import ImageSlider from "../components/ImageSlider";
import { motion } from "motion/react";

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

  const [orderState, dispatchOrder] = useReducer(
    orderReducer,
    {
      currentSelections: {
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
      dispatchOrder: dispatchOrder,
      isLoading: isLoading,
      setIsLoading: setIsLoading
    }}>
      <div className="flex flex-col bg-amber-600">
        <ImageSlider/>
        <div className="rounded-t-[60px] bg-white">
          <div className="flex flex-col justify-center items-center pt-10">
            <h1 className="text-[#FE7800] font-['Whatthefont']">MENU</h1>
            <h2>{categoryList[selectedCategory - 1].name}</h2>
          </div>
          <div className="flex justify-center items-start pb-[50px]">
            <CategoryNav/>
            <MenuContainer/>
          </div>
          {selectedProduct !== null && (
            <OrderModal/>
          )}
        </div>

      </div>
    </MenuContext.Provider>
  );
}

export default Menu;