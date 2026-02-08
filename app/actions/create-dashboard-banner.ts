"use server";

import { uploadDashboardImage } from "./upload-dashboard-image";
import { prisma } from "@/lib/prisma";

export async function createDashboardBanner(formData: FormData) {
  const file = formData.get("image") as File;

  if(!file || file.size === 0) return;

  const uploadResult = await uploadDashboardImage(file);

  await prisma.dashboardBanner.create({
    data: {
      imageUrl: uploadResult.secure_url,
      order: 0,
      active: true,
    },
  });
}