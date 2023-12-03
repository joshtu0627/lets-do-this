// UserContext.js
import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // 可以在這裡將用戶數據存儲到 localStorage 或進行其他處理
  };

  const logout = () => {
    setUser(null);
    const storage = window.localStorage;
    storage.removeItem("token");

    // 清除 localStorage 或進行其他清理操作
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
