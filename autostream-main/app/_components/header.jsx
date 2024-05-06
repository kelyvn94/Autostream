import { Button } from "@/components/ui/button";
import { UserBtn } from "@/components/user-btn/user-btn";
import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export const Header = async () => {
  const { userId } = auth();

  const find_user = async () => {
    if (userId != null) {
      const users = await db.user.findUnique({
        where: {
          clerkId: userId,
        },
      });
      return users;
    } else {
      return null;
    }
  };

  const users = await find_user();

  return (
    <div className="flex items-center justify-between p-3 px-4 border-b border-zinc-300/30">
      <div className="flex items-center space-x-2">
        <Link href="/" className="relative h-[40px] w-[40px]">
          <Image src="/crsm.svg" alt="logo" fill className="object-contain" />
        </Link>

        <div className="text-lg font-semibold italic">AutoStream</div>
      </div>

      {users?.role == "ADMIN" && (
        <div className="flex items-center space-x-3">
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/dashboard"
            >
              Dashboard
            </Link>
          </nav>
          <UserBtn />
        </div>
      )}

      {users?.role == "CLIENT" && (
        <div className="flex items-center space-x-3">
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Button size="sm" asChild>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/car"
              >
                Get started
              </Link>
            </Button>

            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="/mybookings"
            >
              My Bookings
            </Link>
          </nav>
          <UserBtn />
        </div>
      )}

      {users?.role != "CLIENT" && users?.role != "ADMIN" && (
        <div className="flex items-center space-x-3">
          <nav className="ml-auto flex items-center gap-4 sm:gap-6">
            <Button size="sm" asChild>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="/car"
              >
                Get started
              </Link>
            </Button>

            <Link
              className="text-sm font-medium hover:underline underline-offset-4"
              href="#"
            >
              contact
            </Link>
          </nav>
          <UserBtn />
        </div>
      )}
    </div>
  );
};
