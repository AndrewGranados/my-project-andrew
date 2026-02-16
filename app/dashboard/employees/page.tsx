"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  salary: number;
  phone: string;
  email: string;
  createdAt: string;
}

export default function EmployeesPage() {
  const router = useRouter();

  const [data, setData] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (name.trim()) params.append("name", name.trim());
      if (email.trim()) params.append("email", email.trim());

      const res = await fetch(`/api/employees?${params.toString()}`);

      if (!res.ok) {
        const text = await res.text();
        console.error("Error API:", text);
        return;
      }

      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllEmployees = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/employees");

      if (!res.ok) {
        const text = await res.text();
        console.error("Error API: ", text);
        return;
      }

      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Fetch: error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={card}>
        <h2 style={title}>Empleados</h2>

        {/* Filtros */}
        <div style={filtersRow}>
          <div style={fieldGroup}>
            <label style={labelStyle}>Nombre</label>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={fieldGroup}>
            <label style={labelStyle}>Correo</label>
            <input
              type="text"
              placeholder="Buscar por correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={buttonsGroup}>
            <button
              style={primaryButton}
              onClick={fetchEmployees}
              disabled={loading}
            >
              Buscar
            </button>

            <button
              style={secondaryButton}
              onClick={fetchAllEmployees}
              disabled={loading}
            >
              Obtener todos
            </button>
          </div>
        </div>

        {/* Tabla */}
        <div style={{ overflowX: "auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Nombre</th>
                <th style={th}>Email</th>
                <th style={th}>Teléfono</th>
                <th style={th}>Salario</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={4} style={emptyState}>
                    Cargando...
                  </td>
                </tr>
              )}

              {!loading && data.length === 0 && (
                <tr>
                  <td colSpan={4} style={emptyState}>
                    No hay empleados
                  </td>
                </tr>
              )}

              {!loading &&
                data.map((emp) => (
                  <tr key={emp.id} style={row}>
                    <td style={td}>
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td style={td}>{emp.email}</td>
                    <td style={td}>{emp.phone ?? "-"}</td>
                    <td style={td}>${emp.salary}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Acción */}
        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <button
            style={primaryButton}
            onClick={() => router.push("/dashboard/employees/register")}
          >
            Registrar nuevo empleado
          </button>
        </div>
      </div>
    </div>
  );
}

/* ===== estilos copiados del registro ===== */

const pageWrapper: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "#f5f6f8",
  paddingTop: 48,
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 900,
  padding: 32,
  borderRadius: 8,
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const title: React.CSSProperties = {
  textAlign: "left",
  marginBottom: 8,
  fontSize: 20,
  fontWeight: 600,
  color: "#333",
};

const filtersRow: React.CSSProperties = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  alignItems: "flex-end",
};

const fieldGroup: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
  minWidth: 220,
  flex: 1,
};

const buttonsGroup: React.CSSProperties = {
  display: "flex",
  gap: 8,
};

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
  backgroundColor: "#ffffff",
  color: "#111",
  fontWeight: 500,
  cursor: "pointer",
};

const table: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const th: React.CSSProperties = {
  borderBottom: "1px solid #d1d5db",
  textAlign: "left",
  padding: "10px 8px",
  fontWeight: 600,
  color: "#111",
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #eee",
  padding: "10px 8px",
  color: "#333",
};

const row: React.CSSProperties = {
  transition: "background 0.15s ease",
};

const emptyState: React.CSSProperties = {
  textAlign: "center",
  padding: 16,
  fontSize: 13,
  color: "#555",
};
