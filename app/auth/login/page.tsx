"use client";

import { loginUser } from "@/app/actions/login-user";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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
      <form action={loginUser} style={form}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 8,
            fontSize: 20,
            fontWeight: 600,
            color: "#333",
          }}
        >
          Iniciar sesión
        </h2>

        {/* Email */}
        <label style={labelStyle}>Correo electrónico</label>
        <input
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          style={inputStyle}
          required
        />

        {/* Password */}
        <label style={labelStyle}>Contraseña</label>
        <div style={{ position: "relative" }}>
          <input
            name="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            style={{ ...inputStyle, paddingRight: 40 }}
            required
          />
        </div>

        {/* Pregunta si no tiene cuenta, si no que lo mande a registrarse*/}
        <label>
          <Link
            href="/auth/register"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#1a73e8", // azul tipo link
              textDecoration: "underline",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
          >
            ¿No tienes cuenta? Registrate
          </Link>
        </label>

        <button
          type="submit"
          style={{
            marginTop: 12,
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            backgroundColor: "#1f2937",
            color: "#fff",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Comienza
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 500,
  color: "#111",
};

const inputStyle: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  outline: "none",
  color: "gray",
};

const form: React.CSSProperties = {
  width: 320,
  padding: 32,
  borderRadius: 8,
  backgroundColor: "#fff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};
