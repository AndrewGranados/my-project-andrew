"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

import { redirect } from "next/navigation";


export async function createUser(formData: FormData): Promise<void>{
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | null; //en teoría el name no debería ser nulo, pero nomás pa calar

    if(!email || !password){
        throw new Error("Error y password son obligatorios");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
        },
    });

    //return user;
//    redirect("/success");
}