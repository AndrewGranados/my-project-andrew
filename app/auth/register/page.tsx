"use client";

import { createUser } from "../../actions/create-user";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

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
      <form
        action={createUser}
        style={{
          width: 320,
          padding: 32,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 8,
            fontSize: 20,
            fontWeight: 600,
            color: "#333",
          }}
        >
          Crear usuario
        </h2>

        {/* Nombre */}
        <label style={labelStyle}>Nombre</label>
        <input name="name" placeholder="Ingresa tu nombre" style={inputStyle} required/>

        {/* Email */}
        <label style={labelStyle}>Correo electrónico</label>
        <input
          name="email"
          placeholder="correo@ejemplo.com"
          type="email"
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

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: 12,
              color: "#555",
            }}
          >
            {showPassword ? "Ocultar" : "Ver"}
          </button>
        </div>

        {/* reCAPTCHA */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 8,
              marginBottom: 4,
              transform: "scale(0.95)",
              transformOrigin: "center",
            }}
          >
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>
        )}

        {/* Token oculto para enviar al server */}
        <input type="hidden" name="captchaToken" value={captchaToken ?? ""} />

        {/* Pregunta si ya tiene cuenta, si si que lo mande a iniciar sesión*/}
        <label>
          <Link
            href="/auth/login"
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
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </label>

        <button
          type="submit"
          disabled={!captchaToken}
          style={{
            marginTop: 12,
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            backgroundColor: !captchaToken ? "#9ca3af" : "#1f2937",
            color: "#fff",
            fontWeight: 500,
            cursor: !captchaToken ? "not-allowed" : "pointer",
          }}
        >
          Crear usuario
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
