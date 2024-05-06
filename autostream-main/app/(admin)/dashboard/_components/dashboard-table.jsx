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
import { ArrowRightCircle } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export const DashBoardTable = ({data}) => {
  

  return (
    <Table className='w-full'>
      <TableCaption>A list of today's bookings.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order Id</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Total hours</TableHead>

          <TableHead>Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item?.orderId}</TableCell>
            <TableCell>{item?.reserve?.car?.name}</TableCell>
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
                  booked
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
              <ArrowRightCircle/>
              </Link>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
