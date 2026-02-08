import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createDashboardBanner } from "../actions/create-dashboard-banner";
import DashboardCarousel from '../components/DashboardCarousel';


export default async function DashboardPage() {
  //Inicio de sesión
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

  //Subir Imagenes
  const banners = await prisma.dashboardBanner.findMany({
    where: { active: true },
    orderBy: { order: "asc" },
  });

  /*async function action(formData: FormData){
    "use server";

    const file = formData.get("image") as File;

    if (!file || file.size === 0) return;

    const result = await uploadDashboardImage(file);

    console.log("resultado cloudinary ",result);
  }*/

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>Inicio hola</h1>

      <form action={createDashboardBanner}>
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Subir imagen</button>
      </form>

      <DashboardCarousel banners={banners} />

    </div>
  );
}
