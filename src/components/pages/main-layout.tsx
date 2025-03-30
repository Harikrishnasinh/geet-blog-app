
import Navbar from "../ui/navbar";
import BlogFooter from "../ui/blog-footer";
import { Outlet } from "react-router";
import { Toaster } from "../ui/sonner";
import { useTheme } from "next-themes";

const MainLayout = () => {
  const {theme}: any = useTheme()
  return (
    <div>
      <Toaster theme={theme}/>
      <Navbar /> {/* Always visible */}
      <div className="container mx-auto p-4">
        <Outlet /> {/* This will render Home, SingleBlogPost, etc. */}
      </div>
      <BlogFooter /> 
    </div>
  );
};

export default MainLayout;
