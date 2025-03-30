import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { axiosGet, axiosPost } from "@/handleApi";
import React from "react";
import { toast } from "sonner";

const CommentSection = ({ iBlogId }: any) => {
  // TODO: Fetch comments from API using iBlogId
  const [comments, setComments] = React.useState([]);
  const [commentContent, setCommentContent] = React.useState("");
  const oUser: any = localStorage.getItem("user");
  const userJsoned = JSON.parse(oUser);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const oPayload = {
        iBlogId: iBlogId,
        iUserId: userJsoned._id,
        sCommentContent: commentContent,
        userMetaData: userJsoned,
      };
      const res = await axiosPost("/api/v1/comment", oPayload);
      if (res.success) {
        toast.success("Comment added successfully", {
          closeButton: true,
          position: "top-right",
        });
        setCommentContent("");
        fetchComments();
      }
      if (res.statusCode == 401) {
        toast.error("Please login to add the comment", {
          closeButton: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axiosGet(`/api/v1/comment/${iBlogId}`);
      if (res.success) {
        setComments(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  React.useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      <h1 className="text-left font-bold">Comments</h1>
      <form onSubmit={handleSubmit} className="flex items-center gap-4 my-6">
        <Input
          type="text"
          placeholder="Write a comment..."
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <Button variant={"default"} type="submit">
          Submit
        </Button>
      </form>
      {comments.map((comment: any) => (
        <div className="flex flex-col items-start" key={comment.id}>
          <h2>{comment.userMetaData.userName}</h2>
          <p>{comment.sCommentContent}</p>
          <Separator className="my-2" />
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
