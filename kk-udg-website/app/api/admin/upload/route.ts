import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          "Skladište za fotografije (Vercel Blob) nije povezano sa sajtom. Dodajte ga u Vercel projektu pa probajte ponovo.",
      },
      { status: 500 }
    );
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Nije izabrana fotografija" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Fajl mora biti fotografija" }, { status: 400 });
  }

  const MAX_SIZE = 8 * 1024 * 1024; // 8MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Fotografija je prevelika (maksimum 8MB)" },
      { status: 400 }
    );
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const blob = await put(`kkudg/${Date.now()}-${safeName}`, file, {
      access: "public",
    });
    return NextResponse.json({ url: blob.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška pri otpremanju fotografije";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
