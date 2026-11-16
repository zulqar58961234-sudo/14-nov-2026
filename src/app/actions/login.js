"use server";

import prisma from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LogIn({ email, password }) {
  try {
    // Validation
    if (!email || !password) {
      return {
        error: "Please fill all credentials.",
      };
    }

    // Find User
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        studentinfo: true,
      },
    });

    if (!user) {
      return {
        error: "User not found.",
      };
    }

    // Check Password
    if (user.password !== password) {
      return {
        error: "Wrong password.",
      };
    }

    // Secret Key
    const SECRET = process.env.SECRET;

    if (!SECRET) {
      return {
        error: "SECRET environment variable is missing.",
      };
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Next.js 16 Cookie
    const cookieStore = await cookies();

    cookieStore.set("Auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // Redirect
    if (user.studentinfo?.course) {
      redirect("/dashboard");
    }

    redirect("/home");
  } catch (error) {
    console.error(error);

    return {
      error: "Something went wrong. Please try again.",
    };
  }
}