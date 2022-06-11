import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Main from "./routes/Main";
import ProductDetails from "./routes/ProductDetails";

import "./App.scss";
import OrderHistory from "./routes/OrderHistory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/dashboard" element={<Main />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="orderHistory" element={<OrderHistory />} />
      </Routes>
    </div>
  );
}

export default App;
