import { db } from "@/lib/db/db"
import { NextResponse } from "next/server"

export const POST=async (req)=>{
    try {
        const {id,url}=await req.json()
        await db.images.create({
            data:{
                carId:id,
                image:url
            }
        })

        return NextResponse.json('success',{status:200})
    } catch (error) {
        console.log(error)
    }
}