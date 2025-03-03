import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/signup"; // Ensure correct case
import Home from "./pages/Home"; // Import Home component
import Login from "./pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
