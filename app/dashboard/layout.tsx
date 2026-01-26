"use client";

import Link from "next/link";
import { ReactNode } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { usePathname } from "next/navigation";
import { logout } from "@/app/actions/logout";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f3f4f6" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#ffffff",
          borderRight: "1px solid #e5e7eb",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h2 style={{ fontWeight: 600, fontSize: 18, marginBottom: 16 }}>
          MiApp
        </h2>

        <NavItem href="/dashboard">🏠 Inicio</NavItem>
        <NavItem href="/dashboard/profile">👤 Perfil</NavItem>
        <NavItem href="/dashboard/projects">📁 Proyectos</NavItem>
        <NavItem href="/dashboard/settings">⚙️ Configuración</NavItem>

        <form action={logout} style={{ marginTop: "auto" }}>
          <button
            type="submit"
            style={{
              padding: "10px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Cerrar sesión
          </button>
        </form>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 30 }}>
        <Breadcrumbs />
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      style={{
        padding: "10px 12px",
        borderRadius: 6,
        textDecoration: "none",
        color: isActive ? "#2563eb" : "#111",
        background: isActive ? "#eff6ff" : "transparent",
        fontWeight: isActive ? 600 : 400,
        fontSize: 14,
        transition: "0.2s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = "#f3f4f6";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      {children}
    </Link>
  );
}
