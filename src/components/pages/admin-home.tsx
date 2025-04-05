import { useEffect, useState } from "react";
import AdminSidebar from "./admin-sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { axiosPost } from "@/handleApi";
import { Button } from "../ui/button";
import { EyeIcon, PencilIcon, Trash } from "lucide-react";
import { addElipsis } from "@/lib/utils";
import {
  Dialog,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import AdminCheckDetails from "./admin-check-details";
import { Separator } from "../ui/separator";

const AdminHome = () => {
  const admin = localStorage.getItem("admin");
  const adminData = admin ? JSON.parse(admin) : null;

  // const { adminUser: adminUser } = useSelector((state: any) => state.admin);

  const [menuItems, setMenuItems] = useState("home");
  const [menuData, setMenuData] = useState([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [type, setType] = useState("");

  const handleDialog = async (item: any, type: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
    setType(type);
  };

  useEffect(() => {
    console.log("menuitems called !!!!");

    const fetchDataFromMenuItems = async () => {
      setMenuData([]);
      const oPayload = {
        menu: menuItems,
        iUserId: adminData._id,
      };
      const res = await axiosPost("/api/v1/admin/list", oPayload);
      if (res.success) {
        setMenuData(res.data);
      }
    };
    fetchDataFromMenuItems();
  }, [menuItems]);

  return (
    <>
      <div className="flex">
        <AdminSidebar selectedMenu={menuItems} onChangeMenu={setMenuItems} />
        <div className="w-full">
          <h1 className="font-light text-3xl capitalize text-left my-4">
            {menuItems}
          </h1>
          {/* for users */}

          {menuItems === "home" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Srno.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    _id
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    First Name
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Last Name
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Username
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Email
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuData.map((item: any, index: number) => (
                  <TableRow>
                    <TableCell key={item._id} className="font-medium text-left">
                      {index + 1}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item._id}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.firstName}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.lastName}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.userName}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.email?.length > 10
                        ? addElipsis(item.email, 10)
                        : item.email}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      <div className="flex gap-3 items-center">
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "view")}
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "edit")}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "delete")}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* for categories */}

          {menuItems === "categories" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Srno.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    _id.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Name
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Value
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuData.map((item: any, index: number) => (
                  <TableRow>
                    <TableCell key={item._id} className="font-medium text-left">
                      {index + 1}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item._id}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.sName}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.sValue}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      <div className="flex justify-start gap-3 items-center">
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "view")}
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "edit")}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "delete")}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* For Comments */}

          {menuItems === "comments" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Srno.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    _id
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    iBlogId
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Comment
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Username
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuData.map((item: any, index: number) => (
                  <TableRow>
                    <TableCell key={item._id} className="font-medium text-left">
                      {index + 1}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item._id}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.iBlogId}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.sCommentContent}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.userMetaData?.userName}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      <div className="flex justify-start gap-3 items-center">
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "view")}
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "edit")}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "delete")}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {/* For Posts */}

          {menuItems === "post" && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Srno.
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    _id
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Title
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Content
                  </TableHead>
                  <TableHead className="w-[300px] font-bold text-md text-muted-foreground">
                    Image
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Likes
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Save
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    userName
                  </TableHead>
                  <TableHead className="w-[100px] font-bold text-md text-muted-foreground">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuData.map((item: any, index: number) => (
                  <TableRow>
                    <TableCell key={item._id} className="font-medium text-left">
                      {index + 1}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item._id}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.title?.length > 10
                        ? addElipsis(item.title, 10)
                        : item.title}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.content?.length > 20
                        ? addElipsis(item.content, 20)
                        : item.content}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      <img src={item.image} className="" />
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.likes?.length}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.saved?.length}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      {item.userMetaData?.userName}
                    </TableCell>
                    <TableCell key={item._id} className="font-medium text-left">
                      <div className="flex justify-start gap-3 items-center">
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "view")}
                        >
                          <EyeIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "edit")}
                        >
                          <PencilIcon />
                        </Button>
                        <Button
                          variant={"secondary"}
                          onClick={() => handleDialog(item, "delete")}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogOverlay className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40" />
        <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-muted max-h-[80vh] min-w-[23vw] rounded-lg shadow-lg p-6">
          <DialogTitle>
            {menuItems == "comments"
              ? "Comments"
              : menuItems == "categories"
              ? "Categories"
              : menuItems == "post"
              ? "Posts"
              : "Users"}
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4">
              <Separator className="my-7 bg-primary" />
              {selectedItem ? (
                <AdminCheckDetails
                  close ={setIsDialogOpen}
                  data={selectedItem}
                  type={type}
                  forLabel={menuItems}
                />
              ) : (
                ""
              )}
            </div>
          </DialogDescription>
          <Button
            className="absolute bottom-4 right-4"
            variant={"link"}
            onClick={() => {
              setIsDialogOpen(false);
              setSelectedItem(null);
            }}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminHome;
