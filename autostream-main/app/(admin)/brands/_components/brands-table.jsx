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
import moment from "moment";
import { DeleteBrand } from "./delete-brand";
import { UpdateBrand } from "./update-brand";

export const BrandsTable = async () => {
  const brands = await db.brand.findMany({
    orderBy:{
      createdAt:'desc'
    }
  });

  return (
    <Table>
      <TableCaption>A list of your recent brands.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SNo</TableHead>
          <TableHead>Brand Name</TableHead>
          <TableHead>Created On</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {brands?.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{item?.name}</TableCell>
            <TableCell>
              {moment(item?.createdAt).format("DD/MM/YYYY")}
            </TableCell>
            <TableCell>
              <DeleteBrand id={item?.id}/>
            </TableCell>

            <TableCell>
              <UpdateBrand id={item?.id}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
