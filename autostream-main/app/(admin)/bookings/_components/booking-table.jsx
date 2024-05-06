import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db/db";
import { ArrowRightCircle } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const BookingsTable = async () => {
  const bookings = await db.booking.findMany({
    include: {
      reserve: {
        include: {
          car: true,
        },
      },
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Table>
      <TableCaption>A list of your recent booking.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order Id</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead>Client Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Total hours</TableHead>

          <TableHead>Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item?.orderId}</TableCell>
            <TableCell>{item?.reserve?.car?.name}</TableCell>
            <TableCell>{item?.user?.name}</TableCell>

            <TableCell>
              {item?.status == "BOOKED" && (
                <Badge className="bg-sky-500 text-white text-sm">booked</Badge>
              )}
              {item?.status == "LIVE" && (
                <Badge className="bg-amber-300 text-white text-sm">live</Badge>
              )}
              {item?.status == "CANCELLED" && (
                <Badge className="bg-rose-500 text-white text-sm">
                  cancelled
                </Badge>
              )}
              {item?.status == "COMPLETED" && (
                <Badge className="bg-emerald-500 text-white text-sm">
                  completed
                </Badge>
              )}
            </TableCell>
            <TableCell>
              {moment(item?.reserve?.start).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell>
              {moment(item?.reserve?.end).format("DD-MM-YYYY")}
            </TableCell>
            <TableCell>{item?.reserve?.totalhours} hrs</TableCell>

            <TableCell>{`$${JSON.parse(item?.reserve?.totalprice)}`}</TableCell>
            <TableCell>
              <Link href={`/bookings/${item?.id}`}>
                <ArrowRightCircle />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
