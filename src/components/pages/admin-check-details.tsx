import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { axiosPost } from "@/handleApi";
import { TriangleAlert } from "lucide-react";
import { toast } from "sonner";

// forLabel = post, comments, home, categories
// type = edit | view | delete

interface adminCheckDetails {
forLabel: any,
data: any,
type: any,
close: any,
}

const AdminCheckDetails: React.FC<adminCheckDetails> = ({ data, forLabel, type , close}: any) => {
  const dataToShow: any = {
    comments: [
      { label: "_id", key: "_id" },
      { label: "Blog Id", key: "iBlogId" },
      { label: "User Id", key: "iUserId" },
      { label: "Comment", key: "sCommentContent" },
    ],
    post: [
      { label: "_id", key: "_id" },
      { label: "Title", key: "title" },
      { label: "Content", key: "content" },
    ],
    home: [
      { label: "_id", key: "_id" },
      { label: "First Name", key: "firstName" },
      { label: "Last Name", key: "lastName" },
      { label: "User Name", key: "userName" },
      { label: "Email", key: "email" },
    ],
    categories: [
      { label: "_id", key: "_id" },
      { label: "Category Name", key: "sName" },
      { label: "Category Value", key: "sValue" },
    ],
  };

  const [updateData, setUpdateData] = React.useState(data);

  const handleUpdate = async () => {
    try {
        const oPayload = {
          forLabel,
          updateData,
        };
        await axiosPost("/api/v1/admin/update", oPayload);
        toast.success('Updated, Plese refresh!!',{
            closeButton: true,
            position: "top-right",
        })
        close();
    } catch (error) {
        toast.error('Something went wrong!',{
            closeButton: true,
            position: "top-right",
        })
    }
  };
  const handleChangeUpdateData = (e: any) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
        const oPayload = {
          forLabel,
          _id: data._id,
        };
        await axiosPost("/api/v1/admin/delete", oPayload);
        toast.success('Deleted, Plese refresh!!',{
            closeButton: true,
            position: "top-right",
        })
        close();
    } catch (error) {
        toast.success('Updated, Plese refresh!!',{
            closeButton: true,
            position: "top-right",
        })
    }
  }
  return (
    <div className="mb-10">
        {
            type == "delete" ? <div className="w-100 flex flex-col gap-4">
                <div className="flex text-3xl items-center justify-center w-full">
                    <TriangleAlert />
                </div>
                <p className="text-md">Are you sure you want to delete this {forLabel == 'home' ? 'User' : forLabel}?</p>
                <Button className="w-100" variant={"destructive"} onClick={() => handleDelete()}>
                    Delete
                </Button>
            </div> : <div className="flex flex-col flex-wrap gap-4">
            {dataToShow[forLabel].map((item: any) => (
              <div className="flex justify-between" key={item?.key}>
                <span className="text-left font-bold w-100">{item?.label}</span>
                <Input
                  type="text"
                  onChange={(e: any) => handleChangeUpdateData(e)}
                  className="ring-1 ring-primary focus:ring-2 focus:outline-none focus:shadow-none"
                  name={item.key}
                  disabled={
                    type != "edit" ||
                    item.key == "_id" ||
                    item.key == "iBlogId" ||
                    item.key == "iUserId"
                  }
                  value={updateData[item?.key]}
                />
              </div>
            ))}
            {type == "edit" && (
              <Button
                onClick={() => handleUpdate()}
                variant="outline"
                className="mt-4"
                type="submit"
                disabled={type != "edit"}
              >
                Update
              </Button>
            )}
          </div>
        }
    </div>
  );
};

export default AdminCheckDetails;
