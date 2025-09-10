/* eslint-disable react-refresh/only-export-components */
// userContext.js
import { useUser } from "@clerk/clerk-react";
import { createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user, isLoaded } = useUser();

  return (
    <UserContext.Provider value={{ user: user, isLoaded: isLoaded }}>
      {children}
    </UserContext.Provider>
  );
};

