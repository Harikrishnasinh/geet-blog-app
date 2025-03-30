import { axiosGet, axiosPost } from "@/handleApi";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import CommentSection from "@/lib/CommentSection";

const SingleBlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = React.useState({
    image: "",
    title: "",
    content: "",
    createdAt: "",
    categoryMetaData: {},
    userMetaData: {
      _id: "",
      userName: "",
    },
    _id: "",
    saved: [],
    likes: []
  });
  const [loading, setLoading] = React.useState(false);
  const [like, setLike] = React.useState(0)
  const [save, setSave] = React.useState(0)
  
  const userDataString = localStorage.getItem("user"); // Get item from localStorage
  const userData = userDataString ? JSON.parse(userDataString) : null; // Safely parse JSON

  React.useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await axiosGet(`/api/v1/post/${id}`);
      if (res.success) {
        setBlog(res.data);
        setLoading(false);
        setLike(res.data.likes.length);
        setSave(res.data.saved.length);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  
  
    const handleLike = async () => {
      try {
        const oPayload = {
          iPostId: blog._id,
          iUserId: userData._id,
        }    
        const res = await axiosPost('/api/v1/post/like', oPayload)
        if(res.success){
          setLike(res.data.likesCount);
          toast.success('Like list updated',{
            closeButton: true,
            position: "top-right",
          })
        }
      } catch (error) {
        toast.success('Something went wrong',{
          closeButton: true,
          position: "top-right"
        })
      }
    }
  
    const handleSave = async () => {
      try {
        const oPayload = {
          iPostId: blog._id,
          iUserId: userData._id,
        }    
        const res = await axiosPost('/api/v1/post/save', oPayload)
        if(res.success){
          setSave(res.data.savedCount);
          toast.success(res.message,{
            closeButton: true,
            position: "top-right",
          })
        }
      } catch (error) {
        toast.success('Something went wrong',{
          closeButton: true,
          position: "top-right"
        })
      }
    }
  
    const handleShare = async () => {
      import.meta.env.VITE_DB_URL
      navigator.clipboard.writeText(`${import.meta.env.VITE_FRONTEND_URL}/${blog._id}`)
      toast.success('Link copied to clipboard',{
        closeButton: true,
        position: "top-right"
      })
    }

    useEffect(()=>{
      fetchBlog()
    },[])

  return (
    <div>
      {loading ? (
        <div>
          <Skeleton className="w-full h-[3rem]"></Skeleton>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <Skeleton className="h-[3rem] w-100" />
              {/* <p>Author.</p> */}
              {/* <p className="text-left text-xl my-2">{blog.userMetaData.userName}</p> */}
            </div>
            <div className="flex flex-col items-start">
              <Skeleton className="h-[3rem] w-100" />
              {/* <p className="text-right w-100">Created at.</p> */}
              {/* <p className="w-100 text-right text-xl my-2">
            {new Date(blog.createdAt).toLocaleString()}
          </p> */}
            </div>
          </div>
          <Skeleton className="h-[10rem] w-full mt-8" />
        </div>
      ) : (
        <>
          <h1 className="text-left font-light text-[3rem] mb-4">
            {blog.title}
          </h1>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <p>Author.</p>
              <p className="text-left text-xl my-2">
                {blog.userMetaData.userName}
              </p>
            </div>
            <div className="flex flex-col items-start">
              <p className="md:text-right w-100 text-left">Created at.</p>
              <p className="w-100 md:text-right text-left text-xl my-2">
                {new Date(blog.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          <img src={blog.image} alt="" />
          <p className="text-left tracking-wide mt-4 font-light text-xl leading-10">
            {blog.content}
          </p>
          <div className="flex flex-wrap align-cennter gap-8 mt-4">
                <div className="like flex align-center gap-2" onClick={handleLike}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">
                   {like}  Like
                  </span>
                </div>
                <div className="share flex align-center gap-2" onClick={handleShare}>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">
                    Share
                  </span>
                </div>
                {/* <div className="comment flex align-center gap-2">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">
                    Comment
                  </span>
                </div> */}
                <div className="save flex align-center gap-2" onClick={handleSave} >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                      />
                    </svg>
                  </span>
                  <span className="text-muted-foreground hidden md:block">
                    {save} Save
                  </span>
                </div>
              </div>
          <Separator className="my-4" />
          <CommentSection iBlogId={id} />
        </>
      )}
    </div>
  );
};

export default SingleBlogPost;
