import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const email = searchParams.get("email");

  let rows;

  if (name) {
    rows = await sql`
      SELECT *
      FROM "Employee"
      WHERE
        "firstName" ILIKE ${"%" + name + "%"} OR
        "lastName" ILIKE ${"%" + name + "%"}
      ORDER BY "createdAt" DESC
    `;
  } else if (email) {
    rows = await sql`
      SELECT *
      FROM "Employee"
      WHERE "email" ILIKE ${"%" + email + "%"}
      ORDER BY "createdAt" DESC
    `;
  } else {
    rows = await sql`
      SELECT *
      FROM "Employee"
      ORDER BY "createdAt" DESC
    `;
  }
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, salary, phone, email } = body;

    // Validación mínima
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "firstName, lastName y email son obligatorios" },
        { status: 400 }
      );
    }

    const [employee] = await sql`
      INSERT INTO "Employee" (
        id,
        "firstName",
        "lastName",
        salary,
        phone,
        email
      )
      VALUES (
        gen_random_uuid(),
        ${firstName},
        ${lastName},
        ${salary},
        ${phone},
        ${email}
      )
      RETURNING *
    `;

    return NextResponse.json(employee, { status: 201 });

  } catch {
    return NextResponse.json(
      { error: "Error al crear el empleado", },
      { status: 500 }
    );
  }
}

