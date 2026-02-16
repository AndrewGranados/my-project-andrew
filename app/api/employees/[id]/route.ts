import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
//import { redirect } from "next/navigation";

type Params = {
  params: { id: string };
};

export async function GET(
  req: Request,
  { params }: Params
) {
  const [employee] = await sql`
    SELECT *
    FROM Employee
    WHERE id = ${params.id}
  `;

  if (!employee) {
    return NextResponse.json(
      { message: "Empleado no encontrado" },
      { status: 404 }
    );
    //redirect("/errors?message=Empleado no encontrado");
  }

  return NextResponse.json(employee);
}

export async function PUT(
  req: Request,
  { params }: Params
) {
  const body = await req.json();

  const {
    firstName,
    lastName,
    salary,
    phone,
    email
  } = body;

  const [employee] = await sql`
    UPDATE Employee
    SET
      firstName = ${firstName},
      lastName  = ${lastName},
      salary     = ${salary},
      phone      = ${phone},
      email      = ${email}
    WHERE id = ${params.id}
    RETURNING *
  `;

  return NextResponse.json(employee);
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  await sql`
    DELETE FROM Employee
    WHERE id = ${params.id}
  `;

  return NextResponse.json({ ok: true });
}
