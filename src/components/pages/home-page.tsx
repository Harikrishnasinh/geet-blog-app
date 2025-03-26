import BlogFooter from "../ui/blog-footer";
import BlogList from "../ui/blog-list";
import BlogSideBar from "../ui/blog-sidebar";
import Navbar from "../ui/navbar";

const Home = () => {
  // useEffect(() => {
  //   if(auth === '' || !auth || !auth.length){
  //     navigate('/login')
  //   } 
  // }, [navigate, auth])
  return (
    <>
      <Navbar />
      <div className="flex flex-wrap md:flex-nowrap align-center justify-between">
        <BlogList />
        <BlogSideBar />
      </div>
      <BlogFooter/>
    </>
  );
};

export default Home;
