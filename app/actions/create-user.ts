/*"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function createUser(formData: FormData): Promise<void> {
  const captchaToken = formData.get("captchaToken") as string;
  
  if (!captchaToken) {
    throw new Error("Captcha no verificado");
  }

  // Validar captcha contra Google
  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
  });

  const captchaValidation = await res.json();

  if (!captchaValidation.success) {
    throw new Error("Falló la verificación del reCAPTCHA");
  }

  // Si pasa el captcha, ahora sí validamos datos
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string | null;

  if (!email || !password) {
    throw new Error("Email y password son obligatorios");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
}*/
/*
"use server";
export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData): Promise<void> {
  try {
    const captchaToken = formData.get("captchaToken") as string;

    if (!captchaToken) {
      redirect("/errors?message=Captcha no verificado");
    }

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });

    const captchaValidation = await res.json();

    if (!captchaValidation.success) {
      redirect("/errors?message=Falló la verificación del reCAPTCHA");
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | null;

    if (!email || !password) {
      redirect("/errors?message=Email y password son obligatorios");
    }

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

    if (error === "P2002") {
      redirect("/errors?message=Este correo ya está registrado");
    }

    redirect("/errors?message=Error al crear el usuario");
  }
}
*/

"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData): Promise<void> {
  try {
    const captchaToken = formData.get("captchaToken") as string;

    if (!captchaToken) {
      redirect("/errors?message=Captcha no verificado");
    }

    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });

    const captchaValidation = await res.json();

    if (!captchaValidation.success) {
      redirect("/errors?message=Falló la verificación del reCAPTCHA");
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | null;

    if (!email || !password) {
      redirect("/errors?message=Email y password son obligatorios");
    }

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

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code: string }).code === "P2002"
    ) {
      redirect("/errors?message=Este correo ya está registrado");
    }

    redirect("/errors?message=Error al crear el usuario");
  }
}
