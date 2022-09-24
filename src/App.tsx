import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from './pages/Home';
import Log from "./pages/Log";
import Orders from "./pages/Orders";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="pedidos" element={<Orders />} />
        <Route path="log" element={<Log />} />
      </Route>
    </Routes>

  );
}

export default App;
