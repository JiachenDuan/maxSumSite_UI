import React, { useState, useCallback } from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback((userName, password) => {
    setIsLoading(true);

    fetch(`http://localhost:8080/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false);

        if (response.message !== undefined) {
          setErrorMessage(response.message);
        }
        if (response.jwt !== undefined) {
          setData(response.jwt);
        }
      })
      .catch((error) => setErrorMessage(error));
  }, []);

  const register = useCallback((userName, password) => {
    setIsLoading(true);

    fetch(`http://localhost:8080/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        setIsLoading(false);

        if (response.message !== undefined) {
          setErrorMessage(response.message);
        }
        if (response.jwt !== undefined) {
          setData(response.jwt);
        }
      })
      .catch((error) => setErrorMessage(error));
  }, []);

  const logout = useCallback(() => {
    setData(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        data,
        login,
        logout,
        register,
        isLoading,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const useAuth = () => React.useContext(AuthContext);
export { AuthProvider, useAuth };
