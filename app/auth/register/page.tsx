/*
"use client";

import { createUser } from "../../actions/create-user";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Validaciones de contraseña
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const isPasswordValid = hasMinLength && hasNumber && hasUppercase;

  const MAX_NAME_LENGTH = 35;

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

        {/* Nombre *//*}
        <label style={labelStyle}>Nombre</label>
        <input
          name="name"
          placeholder="Ingresa tu nombre"
          style={inputStyle}
          required
          value={name}
          maxLength={MAX_NAME_LENGTH}
          onChange={(e) => setName(e.target.value)}
        />
        <span style={{ fontSize: 12, color: "#555", textAlign: "right" }}>
          {name.length} / {MAX_NAME_LENGTH}
        </span>

        {/* Email *//*}
        <label style={labelStyle}>Correo electrónico</label>
        <input
          name="email"
          placeholder="correo@ejemplo.com"
          type="email"
          style={inputStyle}
          required
        />

        {/* Password *//*}
        <label style={labelStyle}>Contraseña</label>
        <div style={{ position: "relative" }}>
          <input
            name="password"
            placeholder="********"
            type={showPassword ? "text" : "password"}
            style={{ ...inputStyle, paddingRight: 40 }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Indicadores de validación *//*}
        <ul style={{ fontSize: 12, marginTop: 6, paddingLeft: 18, color: "#555" }}>
          <li style={{ color: hasMinLength ? "green" : "red" }}>
            Mínimo 8 caracteres
          </li>
          <li style={{ color: hasNumber ? "green" : "red" }}>
            Al menos un número
          </li>
          <li style={{ color: hasUppercase ? "green" : "red" }}>
            Al menos una letra mayúscula
          </li>
        </ul>

        {/* reCAPTCHA *//*}
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

        {/* Token oculto *//*}
        <input type="hidden" name="captchaToken" value={captchaToken ?? ""} />

        {/* Link login *//*}
        <label>
          <Link
            href="/auth/login"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#1a73e8",
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
          disabled={!captchaToken || !isPasswordValid || name.length === 0}
          style={{
            marginTop: 12,
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            backgroundColor:
              !captchaToken || !isPasswordValid || name.length === 0
                ? "#9ca3af"
                : "#1f2937",
            color: "#fff",
            fontWeight: 500,
            cursor:
              !captchaToken || !isPasswordValid || name.length === 0
                ? "not-allowed"
                : "pointer",
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
*/

"use client";

import { createUser } from "../../actions/create-user";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

export default function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Validaciones de contraseña
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNotOnlySpaces = password.trim().length > 0;

  const isPasswordValid =
    hasMinLength && hasNumber && hasUppercase && hasNotOnlySpaces;

  const MAX_NAME_LENGTH = 35;

  const isNameValid = name.trim().length > 0;

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
        <input
          name="name"
          placeholder="Ingresa tu nombre"
          style={inputStyle}
          required
          value={name}
          maxLength={MAX_NAME_LENGTH}
          pattern=".*\S.*"
          title="Debe contener al menos un carácter distinto a espacio"
          onChange={(e) => setName(e.target.value)}
        />
        <span style={{ fontSize: 12, color: "#555", textAlign: "right" }}>
          {name.length} / {MAX_NAME_LENGTH}
        </span>

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
            value={password}
            pattern=".*\S.*"
            title="No puede ser solo espacios"
            onChange={(e) => setPassword(e.target.value)}
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

        {/* Indicadores de validación */}
        <ul style={{ fontSize: 12, marginTop: 6, paddingLeft: 18, color: "#555" }}>
          <li style={{ color: hasMinLength ? "green" : "red" }}>
            Mínimo 8 caracteres
          </li>
          <li style={{ color: hasNumber ? "green" : "red" }}>
            Al menos un número
          </li>
          <li style={{ color: hasUppercase ? "green" : "red" }}>
            Al menos una letra mayúscula
          </li>
        </ul>

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

        {/* Token oculto */}
        <input type="hidden" name="captchaToken" value={captchaToken ?? ""} />

        {/* Link login */}
        <label>
          <Link
            href="/auth/login"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#1a73e8",
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
          disabled={!captchaToken || !isPasswordValid || !isNameValid}
          style={{
            marginTop: 12,
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            backgroundColor:
              !captchaToken || !isPasswordValid || !isNameValid
                ? "#9ca3af"
                : "#1f2937",
            color: "#fff",
            fontWeight: 500,
            cursor:
              !captchaToken || !isPasswordValid || !isNameValid
                ? "not-allowed"
                : "pointer",
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
