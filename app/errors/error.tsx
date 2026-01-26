
"use client";

import { useRouter } from "next/navigation";

export default function ErrorDemoPage() {
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
          display: "flex",
          flexDirection: "column",
          gap: 20,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111" }}>
          Ocurrió un problema
        </h1>

        <p style={{ fontSize: 14, color: "#555" }}>
          Esta es una pantalla de error de ejemplo.  
          Puedes usarla para pruebas, mantenimiento o errores controlados.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => router.back()}
            style={secondaryButton}
          >
            Regresar
          </button>

          <button
            onClick={() => router.push("/")}
            style={primaryButton}
          >
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

const primaryButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 6,
  border: "none",
  backgroundColor: "#1f2937",
  color: "#fff",
  fontWeight: 500,
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  color: "#111",
  fontWeight: 500,
  cursor: "pointer",
};

/*
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ErrorDemoPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("msg") || "Ocurrió un problema inesperado";

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
          display: "flex",
          flexDirection: "column",
          gap: 20,
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 600, color: "#111" }}>
          Ocurrió un problema
        </h1>

        <p style={{ fontSize: 14, color: "#dc2626", fontWeight: 500 }}>
          {message}
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button onClick={() => router.back()} style={primaryButton}>
            Regresar
          </button>
          {/*
          <button onClick={() => router.back()} style={secondaryButton}>
            Regresar
          </button>

          <button onClick={() => router.push("/")} style={primaryButton}>
            Ir al inicio
          </button>*//*}/*
        </div>
      </div>
    </div>
  );
}

const primaryButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 6,
  border: "none",
  backgroundColor: "#1f2937",
  color: "#fff",
  fontWeight: 500,
  cursor: "pointer",
};
/*
const secondaryButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  backgroundColor: "#fff",
  color: "#111",
  fontWeight: 500,
  cursor: "pointer",
};
*/