import { useState, useEffect, useReducer, useContext, createContext } from "react";
import "../styles/Menu.styles.css";
import axios from "axios";
import CategoryNav from "../components/Menu/CategoryNav";
import MenuContainer from "../components/Menu/MenuContainer";
import OrderModal from "../components/Menu/OrderModal/OrderModal";
import { MenuContext } from "../contexts/MenuContext";
import { optionReducer } from "../reducers/Option/optionReducer";
import ImageSlider from "../components/ImageSlider";
import { motion } from "motion/react";
import { BurgerIcon, ChickenIcon, DessertIcon, DrinkIcon, FishIcon, GroupIcon, KidsIcon, SaladIcon, SidesIcon, SpecialIcon } from "../svg/categoryNav";
import { orderReducer } from "../reducers/Order/orderReducer";
import { LayoutContext } from "../contexts/LayoutContext";

const Menu = (props) => {
  
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    reducer
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
    { id: 10, name: "Large Order", icon: <GroupIcon color={selectedCategory === 10 ? "#FE7800" : "#555555"}/>},
  ]

  // const [optionState, dispatchOption] = useReducer(
  //   optionReducer,
  //   {
  //     currentSelections: {
  //       totalExtraPrice: 0,
  //       totalCalories: 0,
  //       items: []
  //     },
  //     defaultSelections: {
  //       totalExtraPrice: 0,
  //       totalCalories: 0,
  //       items: []
  //     }
  //   }
  // );

  // const [orderState, dispatchOrder] = useReducer(
  //   orderReducer,
  //   {}
  // );

  useEffect(() => { /* Get Product By Category */
    axios.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(response => setProducts(response.data))
    .catch(error => console.error("Error: ", error));
  }, []);

  {
    console.log("RS: ", reducer.rootState);
  }

  return (
    <MenuContext.Provider value={{
      categoryList: categoryList,
      products: products,
      setProducts: setProducts,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory,
      selectedProduct: selectedProduct,
      setSelectedProduct: setSelectedProduct,
      optionState: reducer.rootState.optionState,
      orderState: reducer.rootState.orderState,
      dispatchRoot: reducer.dispatchRoot,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
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