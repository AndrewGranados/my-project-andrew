"use server";

import { cookies } from "next/headers";

export async function refreshSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId");

  if (!userId) return;

  cookieStore.set("userId", userId.value, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 20, // renueva 10 min
  });
}
