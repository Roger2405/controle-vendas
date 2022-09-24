import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Log from "./pages/Log";
import Orders from "./pages/Orders";
import ProductsPage from "./pages/Products";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Log />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="produtos" element={<ProductsPage />} />
      </Route>
    </Routes>

  );
}

export default App;
