import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    redirect("/auth/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Bienvenido, {user.name ?? "Usuario"}</h1>
      <p>{user.email}</p>
    </div>
  );
}
