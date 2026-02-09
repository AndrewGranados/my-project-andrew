import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//import { createDashboardBanner } from "../actions/create-dashboard-banner";
import UploadDashboardBanner from "../components/UploadDashboardBanner";
import DashboardCarousel from '../components/DashboardCarousel';
import DashboardBannerList from "../components/DashboardBannerList";


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

  return (
    <div>
      <h1 style={{ fontSize: 22, fontWeight: 600 }}>Inicio hola</h1>
      
      <UploadDashboardBanner />

      <DashboardCarousel banners={banners} height={320} width={500}/>

      {/*
      <DashboardBannerList banners={banners}/>
      */}
    </div>
  );
}
