'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Links = ({ items }) => {
    const path=usePathname()
  return (
    <div>
      {items?.map((item, i) => (
        <Link className={cn("flex  items-center rounded-sm p-2 space-x-2 mx-2 mt-2",
        path==item?.href && 'bg-fuchsia-200 text-fuchsia-900'
        )} key={i} href={item?.href}>
          <div>{item?.icon}</div>
          <div>{item?.name}</div>
        </Link>
      ))}
    </div>
  );
};
