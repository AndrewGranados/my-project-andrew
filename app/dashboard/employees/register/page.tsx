"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewEmployees() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    salary: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          salary: Number(form.salary),
          phone: form.phone,
          email: form.email.trim(),
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        alert("Error al registrar empleado");
        return;
      }

      alert("Se insertó el empleado con éxito");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f6f8",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: 520,
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
            marginBottom: 4,
            fontSize: 20,
            fontWeight: 600,
            color: "#333",
          }}
        >
          Registrar empleado
        </h2>

        {/* GRID 2 COLUMNAS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          {/* Nombre */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>Nombre</label>
            <input
              name="firstName"
              placeholder="Nombre"
              value={form.firstName}
              onChange={handleChange}
              required
              pattern=".*\S.*"
              title="No puede estar vacío ni contener solo espacios"
              style={inputStyle}
            />
          </div>

          {/* Apellidos */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>Apellidos</label>
            <input
              name="lastName"
              placeholder="Apellidos"
              value={form.lastName}
              onChange={handleChange}
              required
              pattern=".*\S.*"
              title="No puede estar vacío ni contener solo espacios"
              style={inputStyle}
            />
          </div>

          {/* Correo */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>Correo electrónico</label>
            <input
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Teléfono */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>Teléfono</label>
            <input
              name="phone"
              type="number"
              placeholder="Solo números"
              value={form.phone}
              onChange={handleChange}
              required
              inputMode="numeric"
              pattern="[0-9]+"
              title="Solo se permiten números"
              style={inputStyle}
            />
          </div>

          {/* Salario */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>Salario</label>
            <input
              name="salary"
              type="number"
              placeholder="Salario"
              value={form.salary}
              onChange={handleChange}
              required
              min="1"
              step="1"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            backgroundColor: loading ? "#9ca3af" : "#1f2937",
            color: "#fff",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Guardando..." : "Guardar"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard/employees/")}
          style={{
            padding: "10px 0",
            borderRadius: 6,
            border: "1px solid #d1d5db",
            backgroundColor: "#ffffff",
            color: "#111",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Mostrar empleados
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

const fieldWrapper: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};
