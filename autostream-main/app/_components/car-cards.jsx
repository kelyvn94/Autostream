import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db/db";
import { CarTaxiFront, Fuel, RockingChair, Settings2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CarCards = async () => {
  const cars = await db.car.findMany({
    include: {
      brand: {
        select: {
          name: true,
        },
      },
      Images: {
        select: {
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="grid md:grid-cols-3 gap-3 grid-cols-1">
      {cars.map((item, i) => (
        <Link key={i} href={`/car/${item?.id}`}>
          <Card className="h-[50vh]" key={i}>
            <CardContent>
              <div className=" overflow-hidden relative aspect-video mt-2">
                <Image
                  fill
                  alt="carImage"
                  quality={100}
                  className="object-cover rounded-md"
                  src={item?.image}
                />
              </div>

              <div className="p-2">
                <div className="flex items-center mb-1 justify-between">
                  <div className="text-xs uppercase truncate font-bold">
                    {item?.name}
                  </div>
                  <div className="text-xs font-bold">
                    ${item?.priceperhour}/
                    <span className="text-zinc-500">hr</span>
                  </div>
                </div>

                <Separator className="bg-zinc-200" />

                <div className="flex items-center my-3 justify-between">
                  <div className="flex mt-1 truncate items-center space-x-1 text-xs">
                    <div>
                      <CarTaxiFront className="text-sky-500 h-[25px] w-[25px]" />
                    </div>
                    <div>{item?.bodytype}</div>
                  </div>

                  <div className="flex mt-1 truncate items-center space-x-1 text-xs">
                    <div>
                      <Fuel className="text-sky-500 h-[25px] w-[25px]" />
                    </div>
                    <div>{item?.fuel}</div>
                  </div>

                  <div className="flex mt-1 truncate items-center space-x-1 text-xs">
                    <div>
                      <Settings2 className="text-sky-500 h-[25px] w-[25px]" />
                    </div>
                    <div>{item?.transmission}</div>
                  </div>

                  <div className="flex mt-1 items-center space-x-1 text-xs">
                    <div>
                      <RockingChair className="text-sky-500 h-[25px] w-[25px]" />
                    </div>
                    <div>{item?.capacity}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};
