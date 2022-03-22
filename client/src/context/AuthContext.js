import React, { createContext, useState, useEffect } from "react";
import AuthSercice from "../service/AuthSercice";

export const AuthContext = createContext();

const ContextAuth = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AuthSercice.isAuthenticated().then((data) => {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      setIsLoaded(true);
      console.log("hello");
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};

export default ContextAuth;
