import { useState, createContext, useReducer, useMemo } from "react";
import { initialState, rootReducer } from "../reducers/rootReducer";
import Cookie from "js-cookie";
import { CART_ACTIONS } from "../reducers/Cart/actions";

export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
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