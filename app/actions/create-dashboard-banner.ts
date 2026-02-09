"use server";

import { uploadDashboardImage } from "./upload-dashboard-image";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createDashboardBanner(
  prevState: { success: boolean},
  formData: FormData
) {
    const file = formData.get("image") as File;

  if(!file || file.size === 0) {
    return { success: false };
  }

  const uploadResult = await uploadDashboardImage(file);

  await prisma.dashboardBanner.create({
    data: {
      imageUrl: uploadResult.secure_url,
      order: 0,
      active: true,
    },
  });

  revalidatePath("/dashboard");

  return { success: true }
}