import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  return (
    <UserContext.Provider value={{
      userDetails,
      setUserDetails,
      isLoading,
      setIsLoading,
      isReady,
      setIsReady
    }}>
      {children}
    </UserContext.Provider>
  );
}