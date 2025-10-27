import { useState, useEffect, useReducer, useContext, createContext, useMemo } from "react";
import "../styles/Menu.styles.css";
import { MenuContext } from "../contexts/MenuContext";
import ImageSlider from "../components/ImageSlider";
import { BurgerIcon, ChickenIcon, DessertIcon, DrinkIcon, FishIcon, GroupIcon, KidsIcon, SaladIcon, SidesIcon, SpecialIcon } from "../svg/categoryNav";
import { LayoutContext } from "../contexts/LayoutContext";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../utils/api";
import MenuSection from "../components/Menu/MenuSection";
import Cookie from "js-cookie";
import { STORE_ID_EXPIRATION_TIME } from "../utils/cookieExpirationTime";

const Menu = () => {
  
  const {
    selectedStoreId,
    setSelectedStoreId,
    deselectStore,
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { storeId: storeIdParam } = useParams();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const selectedCategoryId = searchParams.get("categoryId");

  useEffect(() => {
    Cookie.set("orderType", "DELIVERY");
  }, []);

  useEffect(() => {
    if (!storeIdParam || isNaN(storeIdParam)) return;
    setSelectedStoreId(Number(storeIdParam));
    if (Cookie.get("storeId") !== Number(storeIdParam)) {
      Cookie.set("storeId", Number(storeIdParam), { expires: STORE_ID_EXPIRATION_TIME});
    }
  }, [storeIdParam]);

  useEffect(() => { /* Get Product By Category */
    if (!selectedStoreId) return;
    setIsLoading(true);
    
    api.get(`/store/${selectedStoreId}/category/product`)
      .then(({data}) => {
        if (Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(err => {
        const status = err.response?.status;
        deselectStore();
        nav("/menu/store");
        if (status === 404) {
          nav("/menu/store");
        } else {
          console.error(err)
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [selectedStoreId]);

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start"});
      })
    }
  }, [location.hash]);

  const selectedCategory = useMemo(() => {
    const fallbackId = categories.length ? categories[0].categoryId : null;
    const effectiveId = selectedCategoryId ?? fallbackId;
    return categories.find(category => String(category.categoryId) === String(effectiveId)) ?? null;
  }, [categories, selectedCategoryId]);

  return (
    <MenuContext.Provider value={{
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      categories: categories,
      setCategories: setCategories,
      selectedCategory: selectedCategory,
      selectedCategoryId: selectedCategoryId,
      selectedProduct: selectedProduct,
      setSelectedProduct: setSelectedProduct
    }}>
      <div className="flex flex-col font-[sans-serif] bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 min-h-screen">
        <ImageSlider/>
        <MenuSection/>
      </div>
    </MenuContext.Provider>
  );
}

export default Menu;