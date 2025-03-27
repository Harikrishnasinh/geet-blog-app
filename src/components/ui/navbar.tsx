import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ModeToggle } from "./mode-toggle";
import { Input } from "./input";
import { axiosPost } from "../../handleApi/index.ts";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import MyDrawer from "@/lib/MyDrawer.tsx";
import AddBlogPost from "@/lib/addBlogPostForm.tsx";
import { Toaster } from "./sonner.tsx";

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}


export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.removeItem("user");
    const logOut: any = await axiosPost("/api/v1/users/logout");
    if (logOut.success) {
      toast.success("logged out successfully", {
        closeButton: true,
        position: "top-right",
      });
      localStorage.setItem("auth", "");
      navigate("/login");
    }
  };
  return (
    <Disclosure as="nav" className="border-b mb-4 sticky top-0 bg-background">
      <Toaster />
      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-muted-foreground focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="block size-6 group-data-open:hidden">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="hidden size-6 group-data-open:block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <a href="/">
                <span className="tracking-wider text-2xl">Blogium</span>
              </a>
            </div>
            <div className="w-1/5 ml-4 hidden md:block">
              <Input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="inset-y-0 right-0 flex gap-2 items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            <MyDrawer
              drawerTrigger="Add Post"
              drawerTitle="Add Post"
              drawerDescription={(onClose) => <AddBlogPost onClose={onClose} />} // Pass onClose
              drawerTriggerClassName="bg-foreground text-background"
              />
            
            {/* Dark and Light mode toggle   */}
            <ModeToggle />

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden cursor-pointer">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 px-1 mt-2 w-36 origin-top-right rounded-md bg-foreground text-background py-1 ring-1 shadow-lg ring-foreground/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="w-full flex rounded-sm px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground data-focus:outline-hidden"
                  >
                    Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    onClick={handleLogout}
                    className="w-full flex rounded-sm px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground data-focus:outline-hidden cursor-pointer"
                  >
                    Logout
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
