import { useState, createContext, useReducer, useMemo } from "react";
import { initialState, rootReducer } from "../reducers/rootReducerT";

export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
  const [cartOpened, setCartOpened] = useState(false);
  const [rootState, dispatchRoot] = useReducer(rootReducer, initialState);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const reducer = useMemo(() => ({
    rootState,
    dispatchRoot
  }), [rootState, dispatchRoot])
  
  return (
    <LayoutContext.Provider value={{
      cartOpened,
      setCartOpened,
      selectedProduct,
      setSelectedProduct,
      selectedCategory,
      setSelectedCategory,
      reducer
    }}>
      {children}
    </LayoutContext.Provider>
  );
}