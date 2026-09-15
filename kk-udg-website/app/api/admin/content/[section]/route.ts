import { NextRequest, NextResponse } from "next/server";
import { updateSection, type SiteContent } from "@/lib/content";

const VALID_SECTIONS: (keyof SiteContent)[] = [
  "homepage",
  "players",
  "fixtures",
  "news",
  "partners",
  "staff",
  "contact",
  "support",
];

export async function POST(
  request: NextRequest,
  { params }: { params: { section: string } }
) {
  const section = params.section as keyof SiteContent;
  if (!VALID_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Nepoznata sekcija" }, { status: 400 });
  }

  const body = await request.json().catch(() => null);
  if (body === null) {
    return NextResponse.json({ error: "Neispravan sadržaj" }, { status: 400 });
  }

  try {
    await updateSection(section, body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška pri čuvanju";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
