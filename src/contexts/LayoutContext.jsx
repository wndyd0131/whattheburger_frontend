import { useState, createContext, useReducer, useMemo } from "react";
import { initialState, rootReducer } from "../reducers/rootReducer";

export const LayoutContext = createContext();

export const LayoutProvider = ({children}) => {
  const [cartOpened, setCartOpened] = useState(false);
  const [rootState, dispatchRoot] = useReducer(rootReducer, initialState);
  const reducer = useMemo(() => ({
    rootState,
    dispatchRoot
  }), [rootState, dispatchRoot])
  
  return (
    <LayoutContext.Provider value={{
      cartOpened,
      setCartOpened,
      reducer
    }}>
      {children}
    </LayoutContext.Provider>
  );
}