import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";

import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import AddSales from "./pages/AddSales";
import Register from "./pages/Register";

import './styles/styles.scss';

import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";


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
        <Route index element={isLogged ? <Sales /> : <Login setUser={setUser} />} />
        <Route path="registro" element={<Register />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="produtos" element={<AddSales />} />
      </Route>
    </Routes>


  );
}

export default App;

