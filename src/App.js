import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import "./App.scss";
import Main from "./routes/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
