"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .slice(1); // quitamos "dashboard"

  return (
    <nav style={{ marginBottom: 20, fontSize: 14, color: "#6b7280" }}>
      <Link href="/dashboard" style={{ color: "#2563eb", textDecoration: "none" }}>
        Inicio
      </Link>

      {segments.map((segment, index) => {
        const path = "/dashboard/" + segments.slice(0, index + 1).join("/");

        return (
          <span key={index}>
            {" / "}
            <Link
              href={path}
              style={{ color: "#2563eb", textDecoration: "none" }}
            >
              {formatSegment(segment)}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

function formatSegment(text: string) {
  return text
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
