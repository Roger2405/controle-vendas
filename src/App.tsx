import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import ProductsPage from "./pages/ProductsPage";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Sales />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="produtos" element={<ProductsPage />} />
      </Route>
    </Routes>

  );
}

export default App;
