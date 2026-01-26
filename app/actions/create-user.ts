/*
"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function createUser(formData: FormData): Promise<void> {
  try {
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

    // Obtener datos
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | null;

    // Validaciones básicas
    if (!email || !password) {
      throw new Error("Email y password son obligatorios");
    }

    if (name && name.length > 35) {
      throw new Error("El nombre excede los 35 caracteres");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Email inválido");
    }

    // Validaciones de contraseña (seguridad backend)
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    if (!hasMinLength || !hasNumber || !hasUppercase) {
      throw new Error("La contraseña no cumple los requisitos de seguridad");
    }

    // Verificar si ya existe el usuario
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("El usuario ya existe");
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

  } catch (error) {
    console.error("Error al crear usuario:", error);
    redirect("/errors");
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
      throw new Error("Captcha no verificado");
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
      throw new Error("Falló la verificación del reCAPTCHA");
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string | null;

    if (!email || !password) {
      throw new Error("Email y contraseña son obligatorios");
    }

    if (name && name.length > 35) {
      throw new Error("El nombre no puede exceder 35 caracteres");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El correo electrónico no es válido");
    }

    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    if (!hasMinLength || !hasNumber || !hasUppercase) {
      throw new Error(
        "La contraseña no cumple con los requisitos de seguridad",
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Este correo ya está registrado");
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
    console.error("Error al crear usuario:", error);

    let message = "Ocurrió un error inesperado al crear el usuario";

    if (error instanceof Error) {
      message = error.message;
    }

    redirect(`/errors?msg=${encodeURIComponent(message)}`);
  }
}
