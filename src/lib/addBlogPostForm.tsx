import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Sonner for notifications
import { axiosPost } from "@/handleApi";
import { Spinner } from "@/components/ui/loader";

const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET; // Replace with your Cloudinary upload preset
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; // Replace with your Cloudinary cloud name

const AddBlogPost: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  //   get user data from localstorage
  const userDataString = localStorage.getItem("user"); // Get item from localStorage
  const userData = userDataString ? JSON.parse(userDataString) : null; // Safely parse JSON

  // Function to handle image upload
  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url; // Cloudinary returns the image URL
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Image upload failed.");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please fill out all fields.");
      return;
    }

    setLoading(true);
    const imageUrl = await uploadImage(); // Upload image first

    const blogPostData = {
      userMetaData: userData,
      title,
      content,
      image: imageUrl || "", // Save image URL (empty if no image)
    };

    try {
      console.log(56, blogPostData);
      const response = await axiosPost("/api/v1/post", blogPostData);

      if (response.success) {
        toast.success("Post Added Successfully!", {
          closeButton: true,
          position: "top-right",
        });
        setTimeout(() => {
          onClose();
        });
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        toast.error("Failed to add blog post.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Image Input */}
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        className="w-full"
      />

      {/* Title Input */}
      <Input
        type="text"
        placeholder="Enter blog title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />

      {/* Content Textarea */}
      <Textarea
        placeholder="Write your blog content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-40"
      />

      {/* Submit Button */}
      <div className="flex gap-2 w-full justify-end">
        <div>
          <Button onClick={handleSubmit} className="w-full" size="lg" disabled={loading}>
            {
              loading ? <div className="flex items-center justify-center gap-2">
                <Spinner size={"small"} className="text-background"></Spinner>
                Publishing...
              </div> : 'Publish'
            }
          </Button>
        </div>
        <div>
          <Button onClick={onClose} disabled={loading} className="w-full" size="lg" variant={"outline"}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBlogPost;
