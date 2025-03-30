import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SingleBlog from "./single-blog";
import { useEffect, useState } from "react";
import { axiosGet, axiosPost } from "@/handleApi";
import { toast } from "sonner";
import MainBlogListSkeleton from "@/lib/MainBlogListSkeleton";
import { useDebounce } from "@/hooks/useDebounce";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState([]);

  const searchDebounced = useDebounce(search, 1000)

  useEffect(() => {
    // Fetch blog data here

    
    const fetchData = async () => {
      if(searchDebounced == ''){
        await fetchBlogs();
        await fetchCategories();
        return;
      }
      if(searchDebounced) {
        await fetchCategories();
        await getSearchedBlog();
        return;
      }
    }
    fetchData();
  }, [searchDebounced]);

  

  const getSearchedBlog = async () => {
    try {
      setLoading(true);
      const oPayload = {
        search: searchDebounced,
      }
      const res = await axiosPost(`/api/v1/post/search`, oPayload);
      if (res.success) {
        setBlogs(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch posts", {
        closeButton: true,
        position: "top-right",
      });
    }
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };

  const fetchBlogs = async (from?: any) => {
    setLoading(true);
    try {
      const res = await axiosGet("/api/v1/post");
      if (res.success) {
        setBlogs(res.posts);
        if(from == 'all') setLoading(false)
      }
    } catch (error) {
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      // API call to get all categories
      const chk = await axiosGet("/api/v1/categories");
      if (chk.success) {
        setCategories(chk.data);
        setLoading(false)
      }
    } catch (error) {
      toast.error("Failed to fetch categories", {
        closeButton: true,
        position: "top-right",
      });
    }
  };
  const fetchDataForSpecificCategory = async (iCategoryId: any) =>{
    setLoading(true)
    try {
      const res = await axiosGet(`/api/v1/post/category/${iCategoryId}`)
      if(res.success){
        setBlogs(res.data)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong!', {
        closeButton: true,
        position: "top-right",
      })
    }
  }

  return (
    <div className="w-100 border-r-2 md:w-3/4 md:pr-8">
      <div className="px-2 py-1 pb-2 block w-full">
        <Input type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e)} />
      </div>
      <Tabs defaultValue="all">
        <TabsList className="flex align-center justify-between gap-2 p-2 w-[100vw] overflow-x-scroll md:w-[47vw] md:overflow-x-scroll removeScroll">
          <TabsTrigger value="all" onClick={() => fetchBlogs('all')}>All</TabsTrigger>
          {categories.map((category: any) => {
            return (
              <TabsTrigger key={category._id} value={category.sValue} onClick={() => fetchDataForSpecificCategory(category._id)}>
                {category.sName}
              </TabsTrigger>
            );
          })}
        </TabsList>
        <TabsContent value="all">
          <div className="overflow-y-auto removeScroll p-1">
            {loading ? (
              <MainBlogListSkeleton />
            ) : (
              blogs?.map((blog: any) => {
                return <SingleBlog key={blog._id} data={blog} fetchBlogs={fetchBlogs} />;
              })
            )}
          </div>
        </TabsContent>
        {
          categories.map((category: any ) =>{
            return (
              <TabsContent key={category._id} value={category.sValue}>
                <div className="overflow-y-auto removeScroll p-1">
                  {
                    loading? (
                      <MainBlogListSkeleton />
                    ) : (
                      !blogs?.length ? 
                        <div className="h-[40vh] flex items-center justify-center">
                          <p className='text-center font-bold text-2xl'>No Data Found</p>
                          </div>
                      : blogs?.map((blog: any) => {
                        return <SingleBlog key={blog._id} data={blog} />;
                      })
                    )
                  }
                </div>
              </TabsContent>
            );
          })
        }
      </Tabs>
    </div>
  );
};

export default BlogList;
