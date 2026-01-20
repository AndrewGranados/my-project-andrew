"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6f8",
      }}
    >
      <div
        style={{
          width: 400,
          padding: 32,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111" }}>
          Página no encontrada
        </h1>

        <p style={{ fontSize: 14, color: "#555", marginTop: 12 }}>
          La página que buscas no existe o fue movida.
        </p>

        <div style={{ marginTop: 24 }}>
          <button onClick={() => router.back()} style={secondaryButton}>
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
}

const secondaryButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  color: "#111",
  fontWeight: 500,
  cursor: "pointer",
};
