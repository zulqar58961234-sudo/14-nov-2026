"use server"
import prisma from "@/lib/db"

export default async function ReadInfo(){
    try{
        const data = await prisma.studentinfo.findMany();
        return data
    }catch(error){
        return error
    }
}