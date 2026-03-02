"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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

  // ====== paginado ======
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");

  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // ====== cargar al abrir la página ======
  useEffect(() => {
    fetchAllEmployees();
  }, []);

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

      // reiniciar paginado
      setCurrentPage(1);
      setPageInput("1");
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

      // reiniciar paginado
      setCurrentPage(1);
      setPageInput("1");
    } catch (error) {
      console.error("Fetch: error: ", error);
    } finally {
      setLoading(false);
    }
  };
  //------------------ Botón de eliminar ------------------
  const handleDelete = async (id: string) => {
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
      setLoading(true);

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

      setData((prev) => prev.filter((e) => e.id !== id));

      await Swal.fire({
        title: "Eliminado",
        text: "El empleado fue eliminado correctamente",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: "Ocurrió un error inesperado",
        icon: "error",
      });
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

            {/* 
            <button
              style={secondaryButton}
              onClick={fetchAllEmployees}
              disabled={loading}
            >
              Obtener todos
            </button>
            */}
          </div>
        </div>

        {/* Acción */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <button
            style={createButton}
            onClick={() => router.push("/dashboard/employees/register")}
          >
            Registrar nuevo empleado
          </button>
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
                <th style={th}>Acciones</th>
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
                paginatedData.map((emp) => (
                  <tr key={emp.id} style={row}>
                    <td style={td}>
                      {emp.firstName} {emp.lastName}
                    </td>
                    <td style={td}>{emp.email}</td>
                    <td style={td}>{emp.phone ?? "-"}</td>
                    <td style={td}>${emp.salary}</td>
                    <td>
                      <button
                        style={updateButton}
                        onClick={() =>
                          router.push(
                            `/dashboard/employees/update?id=${emp.id}`,
                          )
                        }
                      >
                        Editar
                      </button>
                      <button
                        style={deleteButton}
                        onClick={() => handleDelete(emp.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Paginado */}
        {data.length > 0 && (
          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
              }}
            >
              {/* < */}
              <button
                style={minimalButton}
                disabled={currentPage === 1}
                onClick={() => {
                  const p = currentPage - 1;
                  setCurrentPage(p);
                  setPageInput(String(p));
                }}
              >
                {"<"}
              </button>

              {/* número editable */}
              <input
                type="number"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onBlur={() => {
                  const page = Number(pageInput);
                  if (page >= 1 && page <= totalPages) {
                    setCurrentPage(page);
                  } else {
                    setPageInput(String(currentPage));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const page = Number(pageInput);
                    if (page >= 1 && page <= totalPages) {
                      setCurrentPage(page);
                    } else {
                      setPageInput(String(currentPage));
                    }
                  }
                }}
                style={{
                  width: 40,
                  textAlign: "center",
                  border: "none",
                  borderBottom: "1px solid #d1d5db",
                  outline: "none",
                  fontSize: 14,
                  padding: "2px 4px",
                }}
              />

              <span>/ {totalPages}</span>

              {/* > */}
              <button
                style={minimalButton}
                disabled={currentPage === totalPages}
                onClick={() => {
                  const p = currentPage + 1;
                  setCurrentPage(p);
                  setPageInput(String(p));
                }}
              >
                {">"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== estilos ===== */

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

const createButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  backgroundColor: "#4CAF50",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
};

const updateButton: React.CSSProperties = {
  padding: "3px 7px",
  margin: "5px",
  borderRadius: 6,
  border: "1px solid #FFC107",
  backgroundColor: "#FFC107",
  color: "white",
  fontWeight: 500,
  cursor: "pointer",
};

const deleteButton: React.CSSProperties = {
  padding: "3px 7px",
  borderRadius: 6,
  border: "1px solid #F44336",
  backgroundColor: "#F44336",
  color: "white",
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

const minimalButton: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 16,
  padding: "2px 6px",
  color: "#111",
};
