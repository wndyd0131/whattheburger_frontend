import { useState, createContext, useReducer, useMemo } from "react";
import { initialState, rootReducer } from "../reducers/rootReducer";
import Cookie from "js-cookie";
import { CART_ACTIONS } from "../reducers/Cart/actions";
import { useMediaQuery } from "@mui/material";

export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
  const isMobile = useMediaQuery('(max-width: 48rem)');
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const [cartOpened, setCartOpened] = useState(false);
  const [rootState, dispatchRoot] = useReducer(rootReducer, initialState);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const reducer = useMemo(() => ({
    rootState,
    dispatchRoot
  }), [rootState, dispatchRoot])

  const deselectStore = () => {
    setSelectedStoreId(null);
    Cookie.remove("storeId");
    dispatchRoot({
      type: CART_ACTIONS.INIT
    });
  }
  
  return (
    <LayoutContext.Provider value={{
      isMobile,
      hamburgerOpened,
      setHamburgerOpened,
      cartOpened,
      setCartOpened,
      selectedProduct,
      setSelectedProduct,
      selectedStoreId,
      setSelectedStoreId,
      deselectStore,
      reducer
    }}>
      {children}
    </LayoutContext.Provider>
  );
}