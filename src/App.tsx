import './styles/styles.scss';

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";



import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";

import Header from "./components/Header";

import UserLogin from "./pages/Auth/UserLogin";
import UserRegister from './pages/Auth/UserRegister';

import EditProduct from './pages/Products/EditProduct';
import StockPage from './pages/Stock/StockPage';
import SaleDetails from './pages/Sales/SalesDetails/SaleDetails';
import SalesPage from './pages/Sales/SalesPage/SalesPage';
import ProductsPage from './pages/Products/ProductsPage/ProductsPage';
import AddSales from './pages/Sales/AddSales/AddSales';
import AddProduct from './pages/Products/AddProduct';

type User = {
  email: string,
  id: number
}

function App() {
  const [user, setUser] = useState<User>(getUserFromLocalStorage());
  const [isLogged, setIsLogged] = useState(false);


  useEffect(() => {
    if (user.id) {//se há um usuário no localStorage -> usuário está logado 
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

