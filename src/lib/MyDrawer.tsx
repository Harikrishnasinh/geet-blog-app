import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { cn } from "./utils";
import { Button } from "@/components/ui/button";

interface MyDrawerProps {
  drawerTrigger: string;
  drawerTitle: string;
  drawerDescription: (onClose: () => void) => React.ReactNode; // Make it a function,
  drawerTriggerClassName: string;
}

const MyDrawer: React.FC<MyDrawerProps> = ({
  drawerTrigger,
  drawerTitle,
  drawerDescription,
  drawerTriggerClassName
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className={cn(drawerTriggerClassName)}>
        <Button className="outline-none" onClick={() => setOpen(true)}>{drawerTrigger}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <Separator className="mb-4"/>
          <DrawerDescription className="mb-1">
            {drawerDescription(() => setOpen(false))} {/* Pass setOpen */}
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default MyDrawer;
