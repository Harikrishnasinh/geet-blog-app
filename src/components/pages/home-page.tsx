import BlogList from "../ui/blog-list";
import BlogSideBar from "../ui/blog-sidebar";

const Home = () => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap align-center justify-between">
        <BlogList />
        <BlogSideBar />
      </div>
    </>
  );
};

export default Home;
