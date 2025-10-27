import { useState, useEffect, useReducer, useContext, createContext } from "react";
import "../styles/Menu.styles.css";
import { MenuContext } from "../contexts/MenuContext";
import ImageSlider from "../components/ImageSlider";
import { BurgerIcon, ChickenIcon, DessertIcon, DrinkIcon, FishIcon, GroupIcon, KidsIcon, SaladIcon, SidesIcon, SpecialIcon } from "../svg/categoryNav";
import { LayoutContext } from "../contexts/LayoutContext";
import { useLocation } from "react-router-dom";
import api from "../utils/api";
import MenuSection from "../components/Menu/MenuSection";

const Menu = () => {
  
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
    setIsLoading(true);
    api.get(`http://localhost:8080/api/v1/products/category/${selectedCategory}`)
    .then(({data}) => 
      {
        if (Array.isArray(data)) {
          const product = data.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            calories: item.calolries,
            briefInfo: item.briefInfo,
            imageSource: item.imageSource
          }));
          setProducts(product);
        }
        // exception
      })
    .catch(error => console.error("Error: ", error))
    .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth'});
      }
    }
  }, [hash]);


  return (
    <MenuContext.Provider value={{
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      categoryList: categoryList,
      products: products,
      setProducts: setProducts,
      selectedCategory: selectedCategory,
      setSelectedCategory: setSelectedCategory,
      selectedProduct: selectedProduct,
      setSelectedProduct: setSelectedProduct,
    }}>
      <div className="flex flex-col bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 min-h-screen">
        <ImageSlider/>
        <MenuSection/>
      </div>
    </MenuContext.Provider>
  );
}

export default Menu;