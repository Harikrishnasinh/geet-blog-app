import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

interface MyDrawerProps {
  drawerTrigger: string;
  drawerTitle: string;
  drawerDescription: (onClose: () => void) => React.ReactNode; // Make it a function
  drawerClose: string;
}

const MyDrawer: React.FC<MyDrawerProps> = ({
  drawerTrigger,
  drawerTitle,
  drawerDescription,
  drawerClose,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="outline-none" onClick={() => setOpen(true)}>{drawerTrigger}</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <DrawerDescription>
            {drawerDescription(() => setOpen(false))} {/* Pass setOpen */}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerClose asChild>
          <button onClick={() => setOpen(false)}>{drawerClose}</button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
