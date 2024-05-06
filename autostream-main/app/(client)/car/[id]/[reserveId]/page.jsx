import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db/db";
import moment from "moment";
import React from "react";
import { BookForm } from "../../_components/book-form";

async function CheckoutPage({ params }) {
  const id = params.reserveId;

  const reservation = await db.reserve.findUnique({
    where: {
      id,
    },
    include: {
      car: {
        select: {
          name: true,
          fuel: true,
          bodytype: true,
          transmission: true,
        },
      },
    },
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="shadow-none w-[600px]">
        <CardHeader>
          <CardTitle className="text-lg">{reservation?.car?.name}</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="mt-2">
          <div className="space-y-2 mb-2">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">Body Type: </div>
              <div className="text-sm">{reservation?.car?.bodytype}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">Fuel Type: </div>
              <div className="text-sm">{reservation?.car?.fuel}</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">Transmission: </div>
              <div className="text-sm">{reservation?.car?.transmission}</div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 my-2">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">Start Date: </div>
              <div className="text-sm">
                {moment(reservation?.start).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">End Date: </div>
              <div className="text-sm">
                {moment(reservation?.end).format("DD-MM-YYYY")}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">Total Hours: </div>
              <div className="text-sm font-bold">
                {reservation?.totalhours} HRS
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2 my-2">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold w-[250px]">Total Price: </div>
              <div className="text-xl font-bold">
                $ {`${JSON.parse(reservation?.totalprice)}`}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <BookForm
              id={id}
              price={`${JSON.parse(reservation?.totalprice)}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CheckoutPage;
