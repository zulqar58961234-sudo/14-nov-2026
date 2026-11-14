"use server"
import prisma from "@/lib/db";
import getSession from "./session";

export async function EnrollJs({name, course, age, image }) {
  const session = await getSession();
  if (!session) {
    return { error: "unauthorized" };
  }
  try {
    await prisma.studentinfo.create({
      data: {
      userId: session.id,
        name,
        course,
         image: image || "default.png",
        age: Number(age),
      },
    });

    return { success: "✔️ Data Saved Successfully" };
  } catch (error) {
    console.error("⚠️ Something Went Wrong", error);
    return { error: "❌ Data Storing Failed" };
  }
}
export async function GetInfo(){
  await prisma.studentinfo.findMany()
}