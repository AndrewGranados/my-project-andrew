"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const MAX_NAME_LENGTH = 20;

type Form = {
  firstName: string;
  lastName: string;
  salary: string;
  phone: string;
  email: string;
};

export default function UpdateEmployeePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [form, setForm] = useState<Form>({
    firstName: "",
    lastName: "",
    salary: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ================= cargar empleado =================
  useEffect(() => {
    if (!id) return;

    const loadEmployee = async () => {
      try {
        const res = await fetch(`/api/employees/${id}`);

        if (!res.ok) {
          await Swal.fire({
            title: "Empleado no encontrado",
            text: "No se pudo cargar la información del empleado.",
            icon: "error",
          });
          return;
        }

        const emp = await res.json();

        setForm({
          firstName: emp.firstName ?? "",
          lastName: emp.lastName ?? "",
          salary: String(emp.salary ?? ""),
          phone: emp.phone ?? "",
          email: emp.email ?? "",
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  // ================= cambios (con mismas restricciones que register) =================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Limitar teléfono a solo números y máximo 10
    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, "").slice(0, 10);

      setForm({
        ...form,
        phone: onlyNumbers,
      });
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  // ================= guardar =================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // misma validación que en register
    if (form.phone.trim().length !== 10) {
      await Swal.fire({
        title: "Datos inválidos",
        text: "El teléfono debe tener exactamente 10 dígitos",
        icon: "warning",
      });
      return;
    }

    try {
      setSaving(true);

      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          salary: Number(form.salary),
          phone: form.phone.trim(),
          email: form.email.trim(),
        }),
      });

      if (!res.ok) {
        await Swal.fire({
          title: "Error",
          text: "No se pudo actualizar el empleado",
          icon: "error",
        });
        return;
      }

      await Swal.fire({
        title: "Actualizado",
        text: "El empleado fue actualizado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      router.push("/dashboard/employees");
    } catch (err) {
      console.error(err);

      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado",
        icon: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  // ================= eliminar =================
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Eliminar empleado?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#F44336",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        await Swal.fire({
          title: "Error",
          text: "No se pudo eliminar el empleado",
          icon: "error",
        });
        return;
      }

      await Swal.fire({
        title: "Eliminado",
        text: "El empleado fue eliminado correctamente",
        icon: "success",
        timer: 1400,
        showConfirmButton: false,
      });

      router.push("/dashboard/employees");
    } catch (err) {
      console.error(err);

      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado",
        icon: "error",
      });
    }
  };

  if (loading) {
    return <p style={{ padding: 40 }}>Cargando...</p>;
  }

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
          Editar empleado
        </h2>

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
              value={form.firstName}
              onChange={handleChange}
              required
              maxLength={MAX_NAME_LENGTH}
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
              value={form.lastName}
              onChange={handleChange}
              required
              maxLength={MAX_NAME_LENGTH}
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
              type="text"
              value={form.phone}
              onChange={handleChange}
              required
              inputMode="numeric"
              pattern="[0-9]{10}"
              title="Debe contener exactamente 10 números"
              style={inputStyle}
            />
          </div>

          {/* Salario */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>Salario</label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              required
              min="1"
              max="1000000"
              step="1"
              title="Debe ser un número entero mayor a 0"
              style={inputStyle}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          style={{
            marginTop: 8,
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            backgroundColor: saving ? "#9ca3af" : "#1f2937",
            color: "#fff",
            fontWeight: 500,
            cursor: saving ? "not-allowed" : "pointer",
          }}
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>

        <button type="button" onClick={handleDelete} style={deleteButton}>
          Eliminar empleado
        </button>
      </form>
    </div>
  );
}

/* estilos */

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

const deleteButton: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  backgroundColor: "#F44336",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
};