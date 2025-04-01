import { axiosGet } from "@/handleApi";
import { addElipsis } from "@/lib/utils";
import React, { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "./button";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";

const BlogSideBar = () => {
  const [blogs, setBlogs]: any = React.useState([]);
  const [topUsers, setTopUsers] = React.useState([]);
  const [suggestedLoading, setSuggestedLoading] = React.useState(false);
  const [topUsersLoading, setTopUsersLoading] = React.useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await getSuggestedPost();
      await getTopUsers();
    };
    fetchData();
  }, []);

  const getSuggestedPost = async () => {
    try {
      setSuggestedLoading(true);
      const res = await axiosGet(`/api/v1/post/suggestedPost`);
      if (res.success) {
        setBlogs(res.data);
        setSuggestedLoading(false);
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
      setTopUsersLoading(true);
      const res = await axiosGet("/api/v1/post/top-users");
      if (res.success) {
        setTopUsers(res.data);
        setTopUsersLoading(false);
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
        {suggestedLoading ? (<>
          <>
            <div className="flex gap-4">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-auto w-5/6" />
            </div>
            <Skeleton className="h-[3vh] w-auto" />
            <Skeleton className="h-[6vh] w-auto" />
          </>
          <>
            <div className="flex gap-4">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-auto w-5/6" />
            </div>
            <Skeleton className="h-[3vh] w-auto" />
            <Skeleton className="h-[6vh] w-auto" />
          </>
          <>
            <div className="flex gap-4">
              <Skeleton className="size-8 rounded-full" />
              <Skeleton className="h-auto w-5/6" />
            </div>
            <Skeleton className="h-[3vh] w-auto" />
            <Skeleton className="h-[6vh] w-auto" />
          </>
          </>
        ) : (
          blogs.length === 0 && (
            <p className="text-center text-sm">No suggested posts available</p>
          )
        )}

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

        {topUsersLoading ? (<>
          <>
            <Skeleton className="h-[3vh] w-3/4" />
            <Skeleton className="h-[3vh] w-auto" />
          </>
          <>
            <Skeleton className="h-[3vh] w-3/4" />
            <Skeleton className="h-[3vh] w-auto" />
          </>
          <>
            <Skeleton className="h-[3vh] w-3/4" />
            <Skeleton className="h-[3vh] w-auto" />
          </>
          </>
        ) : (
          topUsers.length === 0 && (
            <p className="text-center text-sm">No users found</p>
          )
        )}

        {topUsers.length && (
          <div>
            {topUsers.map((topUser: any) => {
              return (
                <div
                  key={topUser._id}
                  className="flex my-4 gap-4 flex-col items-start"
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
