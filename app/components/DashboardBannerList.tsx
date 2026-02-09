"use client";

import Image from "next/image";
import { deleteDashboardBanner } from "../actions/delete-dashboard-banner";

type Banner = {
  id: string;
  imageUrl: string;
};

export default function DashboardBannerList({
  banners,
}: {
  banners: Banner[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 12,
        marginTop: 16,
      }}
    >
      {banners.map((banner) => (
        <div
          key={banner.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Image
            src={banner.imageUrl}
            alt=""
            width={200}
            height={120}
            style={{
              width: "100%",
              height: 90,
              objectFit: "cover",
              display: "block",
            }}
          />

          <button
            onClick={() => {
              if (confirm("¿Quitar esta imagen del carrusel?")) {
                deleteDashboardBanner(banner.id);
              }
            }}
            style={{
              position: "absolute",
              top: 6,
              right: 6,
              background: "#ef4444",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Quitar
          </button>
        </div>
      ))}
    </div>
  );
}
