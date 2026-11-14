"use server"
import prisma from "@/lib/db"
import { redirect } from "next/navigation";

export default async function TakeId(id){
    try{
        const data = await prisma.studentinfo.findUnique({
            where:{id}
        })
        return data;
    } catch(error){
        return error;
    }

}

export async function ChangeData({id,name,age,course,image}){
    
        const data = await prisma.studentinfo.update({
            where:{id},
            data:{
                name,
                age:Number(age),
                course,
                image
            }
        })
        redirect("/dashboard")
    
}