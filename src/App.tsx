import './styles/styles.scss';

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sales from "./pages/SalesOfTheDay";
import Summary from "./pages/Summary";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";


import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";
import AddProduct from "./pages/AddProduct";
import ProductsPage from './pages/ProductsPage';
import AddSales from './pages/AddSales';


function App() {
  const [user, setUser] = useState(getUserFromLocalStorage());
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (user.length !== 0) {//provisorio
      setIsLogged(true)
    }
  }, [user]);


  return (
    <Routes>
      <Route path="/" element={<Header isLogged={isLogged} />}>
        <Route index element={isLogged ? <Sales /> : <UserLogin setUser={setUser} />} />
        <Route path="cadastro" element={<UserRegister />} />
        <Route path="adicionar-venda" element={<AddSales />} />

        <Route path="resumo" element={<Summary />} />
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="adicionar-produto" element={<AddProduct />} />
      </Route>
    </Routes>


  );
}

export default App;

