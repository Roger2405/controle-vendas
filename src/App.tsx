import './styles/styles.scss';

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";



import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";

import Header from "./components/Header";

import UserLogin from "./pages/Auth/UserLogin";
import UserRegister from './pages/Auth/UserRegister';

import AddProduct from "./pages/Products/AddProduct";
import EditProduct from './pages/Products/EditProduct';
import StockPage from './pages/Stock/StockPage';
import SaleDetails from './pages/Sales/SalesDetails/SaleDetails';
import SalesPage from './pages/Sales/SalesPage/SalesPage';
import ProductsPage from './pages/Products/ProductsPage/ProductsPage';
import AddSales from './pages/Sales/AddSales/AddSales';

type User = {
  email: string,
  id: number
}

function App() {
  const [user, setUser] = useState<User>(getUserFromLocalStorage());
  const [isLogged, setIsLogged] = useState(false);

  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    if (darkTheme)
      htmlElement?.classList.add('dark-mode');
    else
      htmlElement?.classList.remove('dark-mode');
  }, [darkTheme])

  useEffect(() => {
    if (user.id) {//provisorio
      setIsLogged(true)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user]);


  return (
    <Routes>
      <Route path="/" element={<Header darkTheme={darkTheme} isLogged={isLogged} setDarkTheme={setDarkTheme} />}>
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

