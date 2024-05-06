import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req) => {
  try {
    const brands = await db.brand.findMany();
    return NextResponse.json(brands, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (req) => {
  try {
    const { name } = await req.json();

    const brand = await db.brand.create({
      data: {
        name,
      },
    });

    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PUT = async (req) => {
  try {
    const { name } = await req.json();
    const id = new URL(req.url).searchParams.get("id");

    const brand = await db.brand.update({
      data: {
        name,
      },
      where: {
        id,
      },
    });

    return NextResponse.json(brand, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (req) => {
  try {
    const id = new URL(req.url).searchParams.get("id");

    await db.brand.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
