import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db/db";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Table, TableCell } from "@/components/ui/table";
import { BookingForm } from "./booking-form";
import { Separator } from "@/components/ui/separator";
import { Frown } from "lucide-react";
import Link from "next/link";
import { EmblaCouresel } from "@/components/embla";

export const CarDetails = async ({ id }) => {
  const car = await db.car.findUnique({
    where: {
      id,
    },
    include: {
      Images: {
        select: {
          image: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
    },
  });

  const my_bookings = await db.booking.findMany({
    include: {
      reserve: true,
    },
  });

  const find_from_bookings = my_bookings.find(
    (item) => item?.reserve?.carId == id
  );

  return (
    <div className="space-y-3">
      <div>
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle className="text-xl font-bold">{car?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-x-3 flex flex-col md:flex-row">
            <div className="space-y-4">
              <Card>
                <CardContent className="md:h-[70vh] h-[50vh] w-full md:w-[850px]">
                  <EmblaCouresel image={car?.image} images={car?.Images} />
                </CardContent>
              </Card>

              <Card className="md:w-[850px] w-full">
                <CardContent>
                  <div className="grid md:grid-cols-3 grid-cols-1">
                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Brand:</div>
                      <div className="text-sm font-bold">
                        {car?.brand?.name}
                      </div>
                    </div>

                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Body Type:</div>
                      <div className="text-sm font-bold">{car?.bodytype}</div>
                    </div>

                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Transmission:</div>
                      <div className="text-sm font-bold">
                        {car?.transmission}
                      </div>
                    </div>

                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Fuel Type:</div>
                      <div className="text-sm font-bold">{car?.fuel}</div>
                    </div>

                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Reg No.:</div>
                      <div className="text-sm font-bold">{car?.regno}</div>
                    </div>

                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Kms Driven:</div>
                      <div className="text-sm font-bold">{car?.kmsdriven}</div>
                    </div>

                    <div className="col-span-1 flex p-2 items-center space-x-2">
                      <div className="text-sm">Price Per Hour:</div>
                      <div className="text-sm font-bold">
                        $ {car?.priceperhour}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:w-[850px] w-full mb-3">
                <CardHeader>
                  <CardTitle className="text-sm font-bold">
                    Car feature/details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-[300px] font-bold p-2 bg-slate-400/10">
                      Fatag
                    </div>
                    <div className="w-[200px] p-2 bg-gray-300/10">
                      {car?.fastag ? "Yes" : "no"}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-[300px] font-bold p-2 bg-slate-400/10">
                      Sun roof
                    </div>
                    <div className="w-[200px] p-2 bg-gray-300/10">
                      {car?.sunroof ? "Yes" : "no"}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-[300px] font-bold p-2 bg-slate-400/10">
                      Cruisecontrol
                    </div>
                    <div className="w-[200px] p-2 bg-gray-300/10">
                      {car?.cruisecontrol ? "Yes" : "no"}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-[300px] font-bold p-2 bg-slate-400/10">
                      Air Bags
                    </div>
                    <div className="w-[200px] p-2 bg-gray-300/10">
                      {car?.airbags ? "Yes" : "no"}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-[300px] font-bold p-2 bg-slate-400/10">
                      Home Delivery
                    </div>
                    <div className="w-[200px] p-2 bg-gray-300/10">
                      {car?.delivery ? "Yes" : "no"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="mt-3">
                <CardContent>
                  <div className="flex items-center justify-between space-x-4">
                    <div className="md:w-[300px] p-2 text-sm ">Price</div>
                    <div className="font-bold">$ {car?.priceperhour}/hr</div>
                  </div>

                  <Separator />

                  {find_from_bookings?.status == "BOOKED" ||
                  find_from_bookings?.status == "LIVE" ? (
                    <div className="text-center h-[30vh] text-sm flex flex-col justify-center items-center">
                      <Frown className="w-[100px] h-[100px] text-zinc-400" />
                      <div className="w-[300px]  text-center">
                        Sorry , this vehicle is currently on booking process .It
                        cannot be booked multiple times.{" "}
                        <Link
                          className="text-sky-500 underline text-sm"
                          href="/"
                        >
                          Return to home page for bookings
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <BookingForm id={id} price={car?.priceperhour} />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      <div></div>
    </div>
  );
};
