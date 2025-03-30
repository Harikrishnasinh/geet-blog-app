import { axiosGet } from "@/handleApi";
import { addElipsis } from "@/lib/utils";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "./button";
import { Separator } from "./separator";

const BlogSideBar = () => {
  const [blogs, setBlogs]: any = React.useState([]);
  const [topUsers, setTopUsers] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await getSuggestedPost();
      await getTopUsers();
    };
    fetchData();
  }, []);

  const getSuggestedPost = async () => {
    try {
      const res = await axiosGet(`/api/v1/post/suggestedPost`);
      if (res.success) {
        setBlogs(res.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch suggested posts", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const getTopUsers = async () => {
    try {
      const res = await axiosGet("/api/v1/post/top-users");
      if (res.success) {
        setTopUsers(res.data);
      } else {
        console.log("Failed to fetch top users");
        toast.error("Failed to fetch top users", {
          closeButton: true,
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  return (
    <div className="px-4 relative">
      <div className="md:w-11/12 flex flex-col gap-4 sticky top-[5rem]">
        <h1 className="text-left font-bold">Suggested For you</h1>

        {blogs?.map((blog: any, index: any) => {
          return (
            <div key={index} className="flex my-2 flex-col items-start gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="profile"
                    className="size-6 rounded-full ring-2 shadow-sm"
                  />
                </div>
                <div>
                  <h1 className="font-bold">{blog.userMetaData.userName}</h1>
                </div>
              </div>
              <div className="flex flex-col gap-2 align-start justify-between">
                <h2 className="text-left text-md font-light">
                  {addElipsis(blog.title, 34)}
                </h2>
                <p className="text-left text-sm text-muted-background">
                  {addElipsis(blog.content, 38)}
                </p>
              </div>
              <Link to={`/post/${blog._id}`}>
                <Button type="button" variant="secondary" size={"sm"}>
                  Read More
                </Button>
              </Link>
            </div>
          );
        })}

        <Separator />

        <h1 className="text-left font-bold">Top Blogiums</h1>
        {topUsers.length && (
          <div>
            {topUsers.map((topUser: any) => {
              return (
                <div
                  key={topUser._id}
                  className="flex my-2 gap-4 flex-col items-start"
                >
                  <div className="flex flex-col gap-2 align-start justify-between">
                    <h2 className="text-left text-md font-bold">
                      {addElipsis(topUser?.userName, 34)}
                    </h2>
                    <p className="text-left text-sm text-muted-background">
                      {addElipsis(topUser?.email, 38)}
                    </p>
                  </div>
                  <div>
                  <Link to={`/profile/${topUser.userId}`}>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      size={"sm"}
                    >
                      View Profile
                    </Button>
                  </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSideBar;
