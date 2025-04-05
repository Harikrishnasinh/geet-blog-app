import { Outlet } from "react-router";
import { Toaster } from "sonner";
import BlogFooter from "../ui/blog-footer";
import { useTheme } from "../ui/theme-provider";

const MainAdminLayout = () => {
  const { theme } = useTheme();
  return (
    <div>
      <Toaster theme={theme} />
      <div className="container mx-auto p-4">
        <Outlet /> {/* This will render Home, SingleBlogPost, etc. */}
      </div>
      <BlogFooter />
    </div>
  );
};

export default MainAdminLayout;
