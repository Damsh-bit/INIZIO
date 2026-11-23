import { NextResponse } from "next/server";

// Endpoint de la maqueta: valida y registra la solicitud.
// Pendiente: conectar con email (Resend/SMTP) o CRM antes de producción.
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);
  if (!data || typeof data !== "object") return NextResponse.json({ ok: false }, { status: 400 });
  const email = String((data as Record<string, unknown>).email ?? "");
  const phone = String((data as Record<string, unknown>).phone ?? "");
  if (!email && !phone) return NextResponse.json({ ok: false, error: "Falta email o teléfono" }, { status: 422 });
  console.log("[lead]", (data as Record<string, unknown>).type ?? "contacto", new Date().toISOString());
  return NextResponse.json({ ok: true });
}
