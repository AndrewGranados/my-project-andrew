"use client";

import { useEffect, useState } from "react";

type Banner = {
  id: string;
  imageUrl: string;
};

export default function DashboardCarousel({
  banners,
  interval = 4000,
}: {
  banners: Banner[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!banners.length) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, interval);

    return () => clearInterval(id);
  }, [banners, interval]);

  if (!banners.length) return null;

  const current = banners[index];

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <img
        src={current.imageUrl}
        style={{
          width: "100%",
          height: 260,
          objectFit: "cover",
          borderRadius: 12,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* botones */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() =>
              setIndex((index - 1 + banners.length) % banners.length)
            }
            style={{
              position: "absolute",
              top: "50%",
              left: 10,
            }}
          >
            ‹
          </button>

          <button
            onClick={() => setIndex((index + 1) % banners.length)}
            style={{
              position: "absolute",
              top: "50%",
              right: 10,
            }}
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
