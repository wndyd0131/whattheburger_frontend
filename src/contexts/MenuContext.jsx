import { createContext, useContext } from "react";

export const MenuContext = createContext(null);
export const useMenuContext = () => useContext(MenuContext);