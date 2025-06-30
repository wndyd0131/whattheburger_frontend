import { useState, useEffect, useReducer, useContext, createContext } from "react";
import "../styles/Menu.styles.css";
import axios from "axios";
import CategoryNav from "../components/Menu/CategoryNav";
import MenuContainer from "../components/Menu/MenuContainer";
import OrderModal from "../components/Menu/OrderModal/OrderModal";
import { MenuContext } from "../contexts/MenuContext";
import { optionReducer } from "../reducers/Option/optionReducer";
import ImageSlider from "../components/ImageSlider";
import { AnimatePresence, motion } from "motion/react";
import { BurgerIcon, ChickenIcon, DessertIcon, DrinkIcon, FishIcon, GroupIcon, KidsIcon, SaladIcon, SidesIcon, SpecialIcon } from "../svg/categoryNav";
import { orderReducer } from "../reducers/Order/orderReducer";
import { LayoutContext } from "../contexts/LayoutContext";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

const Menu = (props) => {
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    selectedCategory,
    setSelectedCategory,
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const categoryList = [
    { id: 1, name: "Burgers", icon: <BurgerIcon color={selectedCategory === 1 ? "#FE7800" : "#555555"}/>},
    { id: 2, name: "Chickens", icon: <ChickenIcon color={selectedCategory === 2 ? "#FE7800" : "#555555"}/>},
    { id: 3, name: "Fish", icon: <FishIcon color={selectedCategory === 3 ? "#FE7800" : "#555555"}/>},
    { id: 4, name: "ATF & LTO", icon: <SpecialIcon color={selectedCategory === 4 ? "#FE7800" : "#555555"}/>},
    { id: 5, name: "Kids", icon: <KidsIcon color={selectedCategory === 5 ? "#FE7800" : "#555555"}/>},
    { id: 6, name: "Sides", icon: <SidesIcon color={selectedCategory === 6 ? "#FE7800" : "#555555"}/>},
    { id: 7, name: "Salad", icon: <SaladIcon color={selectedCategory === 7 ? "#FE7800" : "#555555"}/>},
    { id: 8, name: "Dessert", icon: <DessertIcon color={selectedCategory === 8 ? "#FE7800" : "#555555"}/>},
    { id: 9, name: "Drink", icon: <DrinkIcon color={selectedCategory === 9 ? "#FE7800" : "#555555"}/>},
    { id: 10, name: "Group Order", icon: <GroupIcon color={selectedCategory === 10 ? "#FE7800" : "#555555"}/>},
  ]

  const { hash } = useLocation();

  useEffect(() => { /* Get Product By Category */
    axios.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(response => setProducts(response.data))
    .catch(error => console.error("Error: ", error));
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        console.log("ELEMENT", element);
        element.scrollIntoView({ block: 'start', behavior: 'smooth'});
      }
    }
  }, [hash]);

  console.log("RS: ", rootState);

  return (
    <MenuContext.Provider value={{
      categoryList: categoryList,
      products: products,
      setProducts: setProducts,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory,
      selectedProduct: selectedProduct,
      setSelectedProduct: setSelectedProduct,
    }}>
      <div className="flex flex-col bg-amber-600">
        <ImageSlider/>
        <div id="category-section" className="rounded-t-[60px] bg-white scroll-mt-[60px]">
          <div className="flex flex-col justify-center items-center pt-10">
            <h1 className="text-[#FE7800] font-['Whatthefont']">MENU</h1>
            <h2>{categoryList[selectedCategory - 1].name}</h2>
          </div>
          <div className="flex justify-center items-start pb-[50px]">
            <CategoryNav/>
            <MenuContainer/>
          </div>
          {selectedProduct !== null &&
            <OrderModal mode="menu"/>
          }
        </div>
      </div>
    </MenuContext.Provider>
  );
}

export default Menu;