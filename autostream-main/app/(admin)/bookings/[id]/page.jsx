import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db/db";
import React from "react";
import { UpdateCarStatus } from "./_components/update-status";
import { Badge } from "@/components/ui/badge";
import { EmblaCouresel } from "@/components/embla";

async function SingelBookingPage({ params }) {
  const id = params.id;

  const booking = await db.booking.findUnique({
    where: {
      id,
    },
    include: {
      reserve: {
        include: {
          car: {
            include: {
              brand: true,
              Images:true
            },
          },
        },
      },
      user:true
    },
  });

  const car = booking?.reserve?.car;

  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-lg font-bold ">{car?.name}</CardTitle>
        <CardDescription>
          {booking?.status == "BOOKED" && (
            <Badge className="bg-sky-500 text-white hover:bg-sky-500">
              Booked
            </Badge>
          )}

          {booking?.status == "LIVE" && (
            <Badge className="bg-amber-500 text-white hover:bg-amber-500">
              Live
            </Badge>
          )}

          {booking?.status == "CANCELLED" && (
            <Badge className="bg-rose-500 text-white hover:bg-rose-500">
              Cancelled
            </Badge>
          )}

          {booking?.status == "COMPLETED" && (
            <Badge className="bg-emerald-500 text-white hover:bg-emerald-500">
              Completed
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="md:flex md:space-x-2 space-y-2">
          <div className="md:w-[700px] w-full space-y-3">
            <Card className="w-full md:h-[70vh] h-[50vh]">
              <CardContent className='md:h-[70vh] h-[50vh]'>
                <EmblaCouresel image={car?.image} images={car?.Images}/>
              </CardContent>
            </Card>
            <Card className="p-2">
              <CardContent className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Brand</div>
                  <div className="font-bold text-sm">{car?.brand?.name}</div>
                </div>

                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Body Type</div>
                  <div className="font-bold text-sm">{car?.bodytype}</div>
                </div>

                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Transmission</div>
                  <div className="font-bold text-sm">{car?.transmission}</div>
                </div>

                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Fuel</div>
                  <div className="font-bold text-sm">{car?.fuel}</div>
                </div>

                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Registration number</div>
                  <div className="font-bold text-sm">{car?.regno}</div>
                </div>

                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Kms Driven</div>
                  <div className="font-bold text-sm">{car?.kmsdriven}</div>
                </div>

                <div className="col-span-1 flex items-center space-x-3">
                  <div className="text-zinc-400">Price Per hour</div>
                  <div className="font-bold text-sm">{car?.priceperhour}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Car Features/details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-[200px] bg-slate-400/30 p-2">Air Bags</div>
                  {car?.airbags ? (
                    <div className="ml-3">Yes</div>
                  ) : (
                    <div className="ml-3">No</div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-[200px] bg-slate-400/30 p-2">
                    360 camera
                  </div>
                  {car?.camera ? (
                    <div className="ml-3">Yes</div>
                  ) : (
                    <div className="ml-3">No</div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-[200px] bg-slate-400/30 p-2">Fatag</div>
                  {car?.fastag ? (
                    <div className="ml-3">Yes</div>
                  ) : (
                    <div className="ml-3">No</div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-[200px] bg-slate-400/30 p-2">
                    Cruise Control
                  </div>
                  {car?.cruisecontrol ? (
                    <div className="ml-3">Yes</div>
                  ) : (
                    <div className="ml-3">No</div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-[200px] bg-slate-400/30 p-2">
                    Home Delivery
                  </div>
                  {car?.delivery ? (
                    <div className="ml-3">Yes</div>
                  ) : (
                    <div className="ml-3">No</div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-[200px] bg-slate-400/30 p-2">Sun roof</div>
                  {car?.sunroof ? (
                    <div className="ml-3">Yes</div>
                  ) : (
                    <div className="ml-3">No</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form for updating status */}
          <Card className="md:w-[350px] w-full p-2">
            <UpdateCarStatus id={id} />
            <div className="border-t border-zinc-400/40 mt-5 space-y-3">
              <div className="text-sm font-bold" >Client Details</div>

              <div className="flex items-center space-x-3">
                <div className="w-[100px]">Client name</div>
                <div className="text-xs">{booking?.user?.name}</div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-[100px]">Client email</div>
                <div className="text-xs">{booking?.user?.email}</div>
              </div>

              
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default SingelBookingPage;
