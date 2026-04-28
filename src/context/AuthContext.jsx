import React, { createContext, useContext, useEffect, useState } from "react";
import { adminCredentials } from "../data/mockData";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user");

    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    if (
      email === adminCredentials.email &&
      password === adminCredentials.password
    ) {
      const adminUser = { email, role: "admin" };
      setIsAuthenticated(true);
      setUser(adminUser);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
