"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export async function createUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string | null;

  if (!email || !password) {
    redirect("/errors?message=Email y password son obligatorios");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
  } catch (error: unknown) {
    console.error(error);

    // 🔒 Validación segura del error de Prisma
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      redirect("/errors?message=Este correo ya está registrado");
    }

    redirect("/errors?message=Error al crear el usuario");
  }

  // 🚀 redirect limpio fuera del try/catch
  redirect("/auth/login");
}
