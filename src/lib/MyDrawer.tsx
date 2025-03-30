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
import { toast } from "sonner";

interface MyDrawerProps {
  drawerTrigger: string;
  drawerTitle: string;
  drawerDescription: (onClose: () => void) => React.ReactNode; // Make it a function,
  drawerTriggerClassName?: string;
  drawerTriggerButtonVariant: any;
}

const oUser: any = localStorage.getItem("user");
const userJsoned = JSON.parse(oUser);


const MyDrawer: React.FC<MyDrawerProps> = ({
  drawerTrigger,
  drawerTitle,
  drawerDescription,
  drawerTriggerClassName,
  drawerTriggerButtonVariant = "default",
}) => {
  const [open, setOpen] = useState(false); 

  const handleTrigger = () => {
    if (!userJsoned?.hasOwnProperty('_id')) {
      toast.error('Please login!!', {
        closeButton: true,
        position: 'top-right'
      })
      return;
    }
    else setOpen(true); // Toggle drawer state when trigger is clicked
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className={cn(drawerTriggerClassName)}>
        <Button variant={drawerTriggerButtonVariant} onClick={handleTrigger}>{drawerTrigger}</Button>
      </DrawerTrigger>
      {
        open && (
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{drawerTitle} {open}</DrawerTitle>
              <Separator className="mb-4"/>
              <DrawerDescription className="mb-1">
                {drawerDescription(() => setOpen(false))} {/* Pass setOpen */}
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        )
      }
    </Drawer>
  );
};

export default MyDrawer;
