import { axiosGet, axiosPost, axiosPut } from "@/handleApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SingleBlog from "../ui/single-blog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UserProfilePage = () => {
  const { iUserId } = useParams();
  const [blogTab, setBlogTab]: any = useState([]);
  const [user, setUser]: any = useState({});
  const [disabled, setDisabled]: any = useState(false);

  const userDataString = localStorage.getItem("user"); // Get item from localStorage
  const userData = userDataString ? JSON.parse(userDataString) : null; // Safely parse JSON

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;

      if (userData?._id === iUserId) {
        setDisabled(false);
        await fetchTabData();
      } else {
        await fetchUserBlog();
        setDisabled(true);
      }
      await fetchUser();
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup
    };
  }, []);

  const fetchUserBlog = async () => {
    try {
      const res = await axiosGet(`/api/v1/post/user/${iUserId}`);
      if (res.success) {
        setBlogTab(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axiosGet(`/api/v1/users/${iUserId}`);
      if (res.success) {
        setUser(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const fetchTabData = async (tab = "likes") => {
    const oPayload = {
      tab: tab,
    };
    try {
      const res = await axiosPost(`/api/v1/post/tab/${iUserId}`, oPayload);
      if (res.success) {
        setBlogTab(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        closeButton: true,
        position: "top-right",
      });
    }
  };

  const aTabData = [
    { label: "Liked", value: "likes" },
    { label: "Saved", value: "saved" },
    // Add more tabs as needed...
  ];

  const handleUpdateProfile = async () => {
    const oPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }

    const res = await axiosPut(`/api/v1/users/${user._id}`, oPayload)
    if(res.success) {
      toast.success("Profile updated successfully", {
        closeButton: true,
        position: "top-right",
      });
      await fetchUser();
    }
  }

  const handleChangeUser = (e: any) => {
    setUser((user: any) => {
      return {...user, [e.target.name]: e.target.value };
    })
  }

  return (
    <div className="flex items-start flex-wrap md:flex-nowrap justify-between gap-4 ">
      <div className="md:w-4/5">
        <div>
          <p className="font-light text-3xl text-left">
            {user.firstName} {user.lastName}
          </p>
        </div>
        <Separator className="my-4" />
        {!disabled ? (
          <Tabs defaultValue="likes" className="w-full">
            <TabsList>
              {aTabData.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={tab.value}
                  onClick={() => fetchTabData(tab.value)}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {aTabData.map((tab, index) => (
              <TabsContent key={index} value={tab.value}>
                <div className="flex flex-col items-start">
                  {blogTab.length ? (
                    <div>
                      {blogTab.map((blog: any, index: any) => {
                        return <SingleBlog key={index} data={blog} />;
                      })}
                    </div>
                  ) : (
                    <p>No blogs found</p>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div>
            {blogTab.length ? (
              <div>
                {blogTab.map((blog: any, index: any) => {
                  return <SingleBlog key={index} data={blog} />;
                })}
              </div>
            ) : (
              <p>No blogs found</p>
            )}
          </div>
        )}
      </div>
      <div className="w-100 flex flex-col gap-4 items-center justify-center bg-muted p-8">
        <img
          alt=""
          src="https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1743328340~exp=1743331940~hmac=d10dd221270c6ff0a9549b3df47ce42aa91debfa08995bb7f70ef0f3f729bd89&w=740"
          className="h-40 w-40 object-cover rounded-lg"
        />
        <div className="w-full flex flex-col items-start gap-2">
          <label>First Name.</label>
          <Input
            disabled={disabled}
            className="bg-background w-full"
            value={user.firstName}
            name='firstName'
            onChange={(e) => handleChangeUser(e)}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label>Last Name.</label>
          <Input
            disabled={disabled}
            className="bg-background w-full"
            value={user.lastName}
            name='lastName'
            onChange={(e)=> handleChangeUser(e)}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label>User Name.</label>
          <Input
            disabled={true}
            className="bg-background w-full"
            value={user.userName}
          />
        </div>
        <div className="w-full flex flex-col items-start gap-2">
          <label>Email.</label>
          <Input
            disabled={disabled}
            className="bg-background w-full"
            value={user.email}
            name='email'
            onChange={(e) => handleChangeUser(e)}
          />
        </div>

        {!disabled && (
          <Button onClick={handleUpdateProfile} className="w-full mt-3" variant={"default"}>
            Update Profile
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
