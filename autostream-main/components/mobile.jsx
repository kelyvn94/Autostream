import { SideBar } from "@/app/(admin)/_comonents/side-bar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-[25px] w-[25px]"/>
      </SheetTrigger>
      <SheetContent side="left">
        <SideBar/>
      </SheetContent>
    </Sheet>
  );
};
