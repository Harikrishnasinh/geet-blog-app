import "./App.css";
import { ModeToggle } from "./components/ui/mode-toggle";
import LoginPage from "./components/pages/login-page";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./components/pages/register-page";
import Home from "./components/pages/home-page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/mode-toggle" element={<ModeToggle />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
