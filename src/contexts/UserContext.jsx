import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [userDetails, setUserDetails] = useState({});
  return (
    <UserContext.Provider value={{userDetails, setUserDetails}}>
      {children}
    </UserContext.Provider>
  );
}