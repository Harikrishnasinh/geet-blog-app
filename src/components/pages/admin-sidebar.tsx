import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";

interface AdminSidebarProps {
    selectedMenu: string;
    onChangeMenu: (menu: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ selectedMenu, onChangeMenu }) => {


  const items = [
    {
      title: "Home",
      key: "home",
    },
    {
      title: "Posts",
      key: "post",
    },
    {
      title: "Categories",
      key: "categories",
    },
    {
        title: "Comments",
        key: "comments",
    },
  ];

  return (
    <div>
      <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <h1 className="text-xl my-2">Blogium Admin Panel</h1>
            </SidebarHeader>
            <Separator className="mb-2"/>
          <SidebarContent>
            <SidebarGroup>
            <SidebarGroupContent>
              {items.map((item) => (
                <SidebarMenu key={item.key}>
                  <SidebarMenuButton
                    isActive={item.key === selectedMenu}
                    onClick={() => onChangeMenu(item.key)}
                  >
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenu>
              ))}
            </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};
export default AdminSidebar;
