import { db } from "@/lib/db/db";
import { NextResponse } from "next/server";

export const dynamic='force-dynamic'

export const POST = async (req) => {
  try {
    const {
      name,
      regno,
      price,
      kmsdriven,
      capacity,
      transmission,
      fuel,
      brand,

      fastag,
      sunroof,
      cruisecontrol,
      camera,
      delivery,
      airbags,
      bodytype,
      thumbnailImg,
    } = await req.json();

    if (!thumbnailImg) {
      return NextResponse.json("no thumbnail image was detected", {
        status: 200,
      });
    }

    const created_car = await db.car.create({
      data: {
        airbags,
        bodytype,
        brandId: brand,
        camera,
        capacity,
        cruisecontrol,
        delivery,
        fastag,
        fuel,
        image: thumbnailImg,
        kmsdriven,
        priceperhour: price,
        name,
        regno,
        sunroof,
        transmission: transmission,
      },
    });


    return NextResponse.json(created_car, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};


export const DELETE = async (req) => {
  try {
    const id = new URL(req.url).searchParams.get("id");

    await db.car.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const GET=async(req)=>{
  try {
    const cars=await db.car.findMany({
      include:{
        brand:{
          select:{
            name:true
          }
        },
        Images:{
          select:{
            image:true
          }
        }
      },
      orderBy:{
        createdAt:"desc"
      }
    })

    return NextResponse.json(cars,{status:200})
  } catch (error) {
    console.log(error)
  }
}
