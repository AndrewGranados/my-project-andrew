"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
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
        <SidebarMenu
          label="Configuración"
          icon="⚙️"
          basePath="/dashboard/settings"
          items={[
            { label: "Configuración", href: "/dashboard/settings" },
            { label: "Seguridad", href: "/dashboard/settings/security" },
            { label: "Preferencias", href: "/dashboard/settings/preferences" },
          ]}
        />

        <SidebarMenu
          label="Empleados"
          icon="👥"
          basePath="/dashboard/employees"
          items={[
            { label: "Empleados", href: "/dashboard/employees" },
            { label: "Nuevo empleado", href: "/dashboard/employees/register" },
          ]}
        />

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
/*
function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = pathname.startsWith("/dashboard/settings");

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 6,
          cursor: "pointer",
          color: isActive ? "#2563eb" : "#111",
          background: isActive ? "#eff6ff" : "transparent",
          fontWeight: isActive ? 600 : 400,
          fontSize: 14,
        }}
      >
        ⚙️ Configuración
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            marginLeft: 1,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: 180,
            zIndex: 50,
            padding: 8,
          }}
        >
          <SubItem href="/dashboard/settings/">Configuración</SubItem>
          <SubItem href="/dashboard/settings/security">Seguridad</SubItem>
          <SubItem href="/dashboard/settings/preferences">Preferencias</SubItem>
        </div>
      )}
    </div>
  );
}*/
function SidebarMenu({
  label,
  basePath,
  icon,
  items,
}: {
  label: string;
  icon?: string;
  basePath: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = pathname.startsWith(basePath);

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 6,
          cursor: "pointer",
          color: isActive ? "#2563eb" : "#111",
          background: isActive ? "#eff6ff" : "transparent",
          fontWeight: isActive ? 600 : 400,
          fontSize: 14,
        }}
      >
        {icon} {label}
      </div>

      {open && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "100%",
            marginLeft: 1,
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: 8,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            width: 180,
            zIndex: 50,
            padding: 8,
          }}
        >
          {items.map((item) => (
            <SubItem key={item.href} href={item.href}>
              {item.label}
            </SubItem>
          ))}
        </div>
      )}
    </div>
  );
}

function SubItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "8px 10px",
        borderRadius: 6,
        textDecoration: "none",
        color: active ? "#2563eb" : "#111",
        background: active ? "#eff6ff" : "transparent",
        fontSize: 13,
      }}
    >
      {children}
    </Link>
  );
}
