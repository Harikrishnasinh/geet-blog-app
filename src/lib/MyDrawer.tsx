import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AddBlogPost from "./addBlogPostForm";

const MyDrawer = ({
  drawerTrigger,
  drawerTitle,
}: any) => {
  return (
    <Drawer>
      <DrawerTrigger>{drawerTrigger}</DrawerTrigger>
      <DrawerContent className="min-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          {/* <DrawerDescription>{drawerDescription}</DrawerDescription> */}
        </DrawerHeader>
        <AddBlogPost />
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
