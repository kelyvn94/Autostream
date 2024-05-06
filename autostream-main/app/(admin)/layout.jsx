import React from "react";
import { SideBar } from "./_comonents/side-bar";
import { MobileToggle } from "@/components/mobile";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <div className=" w-[200px] hidden md:flex h-screen fixed border-r border-zinc-300/30">
        <SideBar />
      </div>  

      <div className="md:pl-[200px] w-full">
        <div className="p-3">
          <div className="md:hidden">
            <MobileToggle />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
