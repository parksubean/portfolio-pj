import React, { createContext, useContext, useState, useEffect } from "react";

type UserType = {
   id: string;
   company: string;
} | null;

type ContextType = {
   user: UserType;
   login: (id: string, company: string) => void;
   logout: () => void;
};

const LoginContext = createContext<ContextType | null>(null);

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
   const [user, setUser] = useState<UserType>(null);

   useEffect(() => {
      const stored = localStorage.getItem("loginUser");
      if (stored) {
         setUser(JSON.parse(stored));
      }
   }, []);

   const login = (id: string, company: string) => {
      const newUser = { id, company };
      setUser(newUser);
      localStorage.setItem("loginUser", JSON.stringify(newUser));
   };

   const logout = () => {
      setUser(null);
      localStorage.removeItem("loginUser");
   };

   return (
      <LoginContext.Provider value={{ user, login, logout }}>
         {children}
      </LoginContext.Provider>
   );
};

export const useLog = () => useContext(LoginContext)!;
