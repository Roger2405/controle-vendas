import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import AddSales from "./pages/AddSales";
import Register from "./pages/Register";
import { getUserFromLocalStorage } from "./commons/userFromLocalStorage";


function App() {
  const [user, setUser] = useState(getUserFromLocalStorage());
  var [isLogged, setIsLogged] = useState(true);
  /*
    useEffect(() => {
      if (user.length !== 0) { 
        console.log("User:", user)
        setIsLogged(true)
      }
      console.log(isLogged + user);
    }, []);
  */

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={isLogged ? <Sales /> : <Login setUser={setUser} />} />
        <Route path="registro" element={<Register />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="produtos" element={<AddSales />} />
      </Route>
    </Routes>


  );
}

export default App;

