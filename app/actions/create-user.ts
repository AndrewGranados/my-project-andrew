/*
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
*/

"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

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

  // redirect("/success"); // si quieres redirigir después
}
