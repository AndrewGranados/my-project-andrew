"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    redirect("/errors?message=El correo y contraseña son obligatorios");
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email },
    });
  } catch (e) {
    console.error(e);
    redirect("/errors?message=Error consultando el usuario");
  }

  if (!user) {
    redirect("/errors?message=El usuario no esta registrado");
  }

  let validPassword;
  try {
    validPassword = await bcrypt.compare(password, user.password);
  } catch (e) {
    console.error(e);
    redirect("/errors?message=Error validando la contrasena");
  }

  if (!validPassword) {
    redirect("/errors?message=Contrasena incorrecta");
  }

  const cookieStore = await cookies();

  cookieStore.set("userId", user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 20,
  });

  redirect("/dashboard");
}
