import { ScrollArea } from "@/components/ui/scroll-area";
import { UserBtn } from "@/components/user-btn/user-btn";
import Image from "next/image";
import { Profile } from "./profile";
import { CarFront, Layout, List, ListChecksIcon } from "lucide-react";
import { Links } from "./links";

export const SideBar = () => {
  const items = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Layout className="text-zinc-600/50"/>,
    },
    {
        name: "Bookings",
        href: "/bookings",
        icon: <ListChecksIcon className="text-zinc-600/50" />,
      },
      {
        name: "Brands",
        href: "/brands",
        icon: <List className="text-zinc-600/50"/>,
      },
      {
        name: "Cars",
        href: "/cars",
        icon: <CarFront className="text-zinc-600/50"/>,
      },
     
  ];

  return (
    <div className="flex flex-col">
      <div className="relative my-3 ml-4 h-[30px] flex items-center justify-center w-[30px]">
        <Image src="/crsm.svg" alt="logo" fill className="object-contain" />
      </div>
      <ScrollArea className="w-full h-[85vh]">
        <div>
          <Links items={items} />
        </div>
      </ScrollArea>

      <div className=" flex items-center space-x-2">
        <div>
          <UserBtn />
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
};
