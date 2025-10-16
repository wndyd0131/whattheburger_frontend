import { createContext } from "react";

export const StoreProductCreateContext = createContext();

export const StoreProductCreateProvider = ({stores, products, children}) => {
  return (
    <StoreProductCreateContext.Provider value={{
      stores,
      products
    }}>
      {children}
    </StoreProductCreateContext.Provider>
  );
}