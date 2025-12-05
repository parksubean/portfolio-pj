import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
   PortfolioPack,
   Admin,
   AdminLayout,
   User,
   Contents,
   Notice,
   Login,
} from "./pages";

function App() {
   useEffect(() => {
      const autoLogout = () => {
         localStorage.clear();
      };

      window.addEventListener("beforeunload", autoLogout);

      return () => window.removeEventListener("beforeunload", autoLogout);
   }, []);
   return (
      <BrowserRouter basename="/portfolio-pj">
         <Routes>
            <Route path="/" element={<PortfolioPack />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Admin" element={<AdminLayout />}>
               <Route index element={<Admin />} />
               <Route path="User" element={<User />} />
               <Route path="Contents" element={<Contents />} />
               <Route path="Notice" element={<Notice />} />
            </Route>
         </Routes>
      </BrowserRouter>
   );
}

export default App;
