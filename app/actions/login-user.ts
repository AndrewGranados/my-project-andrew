"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginUser(formData: FormData){
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if(!email || !password){
    throw new Error("El correo y contraseña son obligatorios");
  }

  const user = await prisma.user.findUnique({
    where: {email },
  });

  if (!user){
    throw new Error("Usuario no registrado");
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if(!validPassword){
    throw new Error("Contraseña incorrecta");
  }

  //Se guarda la sesión en las cookies
  const cookieStore = await cookies(); 

  cookieStore.set("userId", user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  redirect("/dashboard");
}