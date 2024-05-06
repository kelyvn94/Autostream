import { Header } from "@/app/_components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db/db";
import { auth } from "@clerk/nextjs";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

async function MyBookings() {
  const { userId } = auth();
  const myBookings = await db.booking.findMany({
    where: {
      userId,
    },
    include: {
      reserve: {
        include: {
          car: true,
        },
      },
    },
    orderBy:{
        createdAt:'desc'
    }
  });

  //   console.log(myBookings);
  return (
    <div>
      <div>
        <Header />
      </div>

      <Card className="shadow-none border-none mt-4">
        <CardHeader>
          <CardTitle>Booking History</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableCaption>A list of your recent bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SNo.</TableHead>
                <TableHead className="">Car Name</TableHead>
                <TableHead className="">Car Registration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Booked </TableHead>

              </TableRow>
            </TableHeader>
            <TableBody>
              {myBookings?.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{i + 1}</TableCell>
                  <TableCell>{item?.reserve?.car?.name}</TableCell>
                  <TableCell>{item?.reserve?.car?.regno}</TableCell>

                  {item?.status == "BOOKED" && (
                    <TableCell >
                      <Badge className="bg-sky-400 hover:bg-sky-400">
                        booked
                      </Badge>
                    </TableCell>
                  )}

                  {item?.status == "COMPLETED" && (
                    <TableCell >
                      <Badge className="bg-emerald-400 hover:bg-emerald-400">
                        completed
                      </Badge>
                    </TableCell>
                  )}

                  {item?.status == "LIVE" && (
                    <TableCell >
                      <Badge className="bg-amber-400 hover:bg-amber-400">
                        live
                      </Badge>
                    </TableCell>
                  )}

                  {item?.status == "CANCELLED" && (
                    <TableCell >
                      <Badge className="bg-rose-400 hover:bg-rose-400">
                        cancelled
                      </Badge>
                    </TableCell>
                  )}
                  <TableCell>$ {`${JSON.parse(item?.reserve?.totalprice)}`}</TableCell>
                  <TableCell>{moment(item?.reserve?.createdAt).format('DD/MM/YYYY')}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyBookings;
