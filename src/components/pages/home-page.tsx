import BlogList from "../ui/blog-list";
import BlogSideBar from "../ui/blog-sidebar";

const Home = () => {
  return (
    <>
      <div className="flex flex-wrap w-100 md:w-auto md:flex-nowrap gap-0 md:gap-8 justify-between">
        <BlogList />
        <BlogSideBar />
      </div>
    </>
  );
};

export default Home;
