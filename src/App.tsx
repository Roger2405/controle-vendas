import './styles/styles.scss';

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";


import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";
import SalesPage from "./pages/SalesPage";
import AddSales from './pages/AddSales';

import ProductsPage from './pages/ProductsPage';
import AddProduct from "./pages/AddProduct";
import EditProduct from './pages/EditProduct';
import SaleDetails from './pages/SaleDetails';
import StockPage from './pages/StockPage';

type User = {
  email: string,
  id: number
}

function App() {
  const [user, setUser] = useState<User>(getUserFromLocalStorage());
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    if (user.id) {//provisorio
      setIsLogged(true)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user]);


  return (
    <Routes>
      <Route path="/" element={<Header isLogged={isLogged} />}>
        <Route index element={isLogged ? <SalesPage /> : <UserLogin setUser={setUser} />} />
        <Route path="sales/:date" element={<SaleDetails />} />
        <Route path="cadastro" element={<UserRegister />} />

        {/*<Route path="resumo" element={<Summary />} />*/}
        <Route path="produtos" element={<ProductsPage />} />
        <Route path="estoque" element={<StockPage />} />
        <Route path="adicionar-venda" element={<AddSales />} />
        <Route path="adicionar-produto" element={<AddProduct />} />
        <Route path="editar-produto/:id" element={<EditProduct />} />
      </Route>
    </Routes>


  );
}

export default App;

