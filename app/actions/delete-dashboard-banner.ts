"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteDashboardBanner(id: string) {
  await prisma.dashboardBanner.update({
    where: { id },
    data: { active: false },
  });

  revalidatePath("/dashboard");
}