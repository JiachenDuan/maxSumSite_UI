import React from "react";
import { useAuth } from "./AuthProvider";

const UserContext = React.createContext();
function UserProvider({ children }) {
  const { data } = useAuth();
  return <UserContext.Provider value={data}> {children}</UserContext.Provider>;
}

const useUser = () => React.useContext(UserContext);

export { UserProvider, useUser };
