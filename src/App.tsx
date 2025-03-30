import "./App.css";
import { ModeToggle } from "./components/ui/mode-toggle";
import LoginPage from "./components/pages/login-page";
import { BrowserRouter, Routes, Route } from "react-router";
import RegisterPage from "./components/pages/register-page";
import Home from "./components/pages/home-page";
import SingleBlogPost from "./components/pages/single-blog-page";
import MainLayout from "./components/pages/main-layout";
import UserProfilePage from "./components/pages/user-profile-page";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/post/:id" element={<SingleBlogPost />} />
            <Route path="/profile/:iUserId" element={<UserProfilePage />} />
          </Route>

          <Route path="/mode-toggle" element={<ModeToggle />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
