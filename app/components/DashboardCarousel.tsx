"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Banner = {
  id: string;
  imageUrl: string;
};

export default function DashboardCarousel({
  banners,
  interval = 4000,
  height = 280,
  width = 280,
}: {
  banners: Banner[];
  interval?: number;
  height?: number;
  width?: number;
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
    <div
      style={{
        position: "relative",
        width,
        height,
        overflow: "hidden",
        borderRadius: 12,
      }}
    >
      <Image
        key={current.id}
        src={current.imageUrl}
        alt="banner"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        priority
      />

      {/* botones */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() =>
              setIndex((index - 1 + banners.length) % banners.length)
            }
            style={navButtonStyle("left")}
            aria-label="Anterior"
          >
            ‹
          </button>

          <button
            onClick={() => setIndex((index + 1) % banners.length)}
            style={navButtonStyle("right")}
            aria-label="Siguiente"
          >
            ›
          </button>
        </>
      )}

      {/* indicadores */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {banners.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setIndex(i)}
            aria-label={`Ir al banner ${i + 1}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "none",
              background: i === index ? "#fff" : "rgba(255,255,255,.5)",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function navButtonStyle(side: "left" | "right") {
  return {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    [side]: 10,
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    border: "none",
    width: 32,
    height: 32,
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: 20,
    lineHeight: "32px",
  };
}
