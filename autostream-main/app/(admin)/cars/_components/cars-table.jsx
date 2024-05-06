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
import { Check, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { DeleteCars } from "./delete-car";
import { UploadImages } from "./upload-images";

export const CarsTable = async () => {
  const cars = await db.car.findMany({
    include: {
      brand: {
        select: {
          name: true,
        },
      },
      Images: true,
    },
  });

  return (
    <Table>
      <TableCaption>A list of your recent uploaded cars.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo.</TableHead>
          <TableHead>Car Name</TableHead>
          <TableHead>Thumbnail</TableHead>
          <TableHead>Price per hour</TableHead>
          <TableHead>Fuel Type</TableHead>
          <TableHead>Body type</TableHead>
          <TableHead>Registration Number</TableHead>
          <TableHead>Kms Driven</TableHead>
          <TableHead>Seat Capacity</TableHead>
          <TableHead>Brand Type</TableHead>
          <TableHead>Fastag</TableHead>
          <TableHead>Sun Roof</TableHead>
          <TableHead>Cruise control</TableHead>
          <TableHead>360 camera</TableHead>
          <TableHead>Home Delivery</TableHead>
          <TableHead>Air Bags</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cars?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{item?.name}</TableCell>
            <TableCell className="relative h-[30px] w-[30px]">
              <Image
                alt="thumbnail"
                src={item?.image}
                fill
                className="object-contain"
              />
            </TableCell>
            <TableCell>{item?.priceperhour}</TableCell>
            <TableCell>{item?.fuel}</TableCell>
            <TableCell>{item?.bodytype}</TableCell>
            <TableCell>{item?.regno}</TableCell>
            <TableCell>{item?.kmsdriven}</TableCell>
            <TableCell>{item?.capacity}</TableCell>
            <TableCell>{item?.brand?.name}</TableCell>
            <TableCell>
              {item?.fastag ? (
                <div>
                  <Check className="text-emerald-500" />
                </div>
              ) : (
                <X className="text-rose-500" />
              )}
            </TableCell>

            <TableCell>
              {item?.sunroof ? (
                <div>
                  <Check className="text-emerald-500" />
                </div>
              ) : (
                <X className="text-rose-500" />
              )}
            </TableCell>
            <TableCell>
              {item?.cruisecontrol ? (
                <div>
                  <Check className="text-emerald-500" />
                </div>
              ) : (
                <X className="text-rose-500" />
              )}
            </TableCell>
            <TableCell>
              {item?.camera ? (
                <div>
                  <Check className="text-emerald-500" />
                </div>
              ) : (
                <X className="text-rose-500" />
              )}
            </TableCell>
            <TableCell>
              {item?.delivery ? (
                <div>
                  <Check className="text-emerald-500" />
                </div>
              ) : (
                <X className="text-rose-500" />
              )}
            </TableCell>
            <TableCell>
              {item?.airbags ? (
                <div>
                  <Check className="text-emerald-500" />
                </div>
              ) : (
                <X className="text-rose-500" />
              )}
            </TableCell>

            <TableCell>
              <DeleteCars id={item?.id} />
            </TableCell>

            <TableCell>
              {item?.Images?.length > 0 ? (
                <div className="text-zinc-300 flex items-center space-x-2">
                  <ImageIcon />
                  <div>{item?.Images?.length} </div>
                </div>
              ) : (
                <UploadImages id={item?.id} />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
