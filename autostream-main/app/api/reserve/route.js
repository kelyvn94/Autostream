import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { end, start, totalhours, totalprice, carId } = await req.json();

    const reserved = await db.reserve.create({
      data: {
        end,
        start,
        carId,
        totalhours,
        totalprice,
      },
    });

    return NextResponse.json(reserved,{status:200})
  } catch (error) {
    console.log(error);
  }
};
