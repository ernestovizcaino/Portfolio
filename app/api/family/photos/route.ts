import { NextResponse } from "next/server";
import { listTripPhotos, uploadTripPhoto } from "@/lib/family-trip/photos";
import {
  isValidFamilyTripToken,
  isValidUploadSecret,
} from "@/lib/family-trip/secrets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!isValidFamilyTripToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const album = await listTripPhotos();
    return NextResponse.json(album, {
      headers: { "Cache-Control": "private, max-age=30" },
    });
  } catch {
    return NextResponse.json(
      { configured: false, photos: [], error: "Error al listar fotos" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!isValidFamilyTripToken(token)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formulario inválido" }, { status: 400 });
  }

  const uploadSecret = String(form.get("uploadSecret") ?? "");
  if (!isValidUploadSecret(uploadSecret)) {
    return NextResponse.json(
      { error: "Clave de subida incorrecta" },
      { status: 403 },
    );
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta la foto" }, { status: 400 });
  }

  const caption = String(form.get("caption") ?? "");
  const bytes = Buffer.from(await file.arrayBuffer());
  const result = await uploadTripPhoto({
    bytes,
    contentType: file.type || "image/jpeg",
    filename: file.name || "foto.jpg",
    caption,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ photo: result.photo }, { status: 201 });
}
