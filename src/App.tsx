import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import ProductsPage from "./pages/AddSales";
import Login from "./pages/Login";
import { useState } from "react";
import AddSales from "./pages/AddSales";
import Register from "./pages/Register";
import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";

function App() {
  const [user, setUser] = useState(getUserFromLocalStorage());


  return (
    <Routes>
      {
        user.length === 0 ?
          <Route path="/" >
            <Route index element={<Login setUser={setUser} />} />
            <Route path="registro" element={<Register />} />

          </Route>
          :
          <Route path="/" element={<Header />}>
            <Route index element={<Sales />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="produtos" element={<ProductsPage />} />
          </Route>

      }
    </Routes>


  );
}

export default App;

