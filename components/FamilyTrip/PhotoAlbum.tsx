"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import type { TripPhoto } from "@/lib/family-trip/photos";

type AlbumResponse = {
  configured: boolean;
  photos: TripPhoto[];
  error?: string;
};

export function PhotoAlbum({
  token,
  initiallyConfigured = false,
}: {
  token: string;
  initiallyConfigured?: boolean;
}) {
  const [configured, setConfigured] = useState(initiallyConfigured);
  const [photos, setPhotos] = useState<TripPhoto[]>([]);
  const [uploadSecret, setUploadSecret] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/family/photos?token=${encodeURIComponent(token)}`,
        { cache: "no-store" },
      );
      const data = (await res.json()) as AlbumResponse;
      setConfigured(Boolean(data.configured));
      setPhotos(data.photos ?? []);
    } catch {
      setConfigured(false);
      setPhotos([]);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onUpload(event: FormEvent) {
    event.preventDefault();
    if (!file) {
      setMessage("Elige una foto primero.");
      return;
    }
    setBusy(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.set("file", file);
      form.set("caption", caption);
      form.set("uploadSecret", uploadSecret);
      const res = await fetch(
        `/api/family/photos?token=${encodeURIComponent(token)}`,
        { method: "POST", body: form },
      );
      const data = (await res.json()) as { error?: string; photo?: TripPhoto };
      if (!res.ok) {
        setMessage(data.error ?? "No se pudo subir.");
        return;
      }
      setCaption("");
      setFile(null);
      setMessage("¡Listo! Foto subida.");
      await load();
    } catch {
      setMessage("Error de red al subir.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Section
      id="fotos"
      label="Álbum"
      intro="Fotos del viaje para la familia. Ver no pide contraseña extra; subir sí."
    >
      <div className="reveal mt-6 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowUpload((v) => !v)}
        >
          {showUpload ? "Ocultar subida" : "Subir foto"}
        </Button>
        {!configured ? (
          <p className="text-sm text-muted-foreground">
            Álbum aún no configurado (falta Cloudflare R2).
          </p>
        ) : null}
      </div>

      {showUpload ? (
        <form
          onSubmit={onUpload}
          className="reveal mt-6 space-y-3 rounded-2xl bg-surface p-4"
        >
          <label className="block text-sm text-foreground">
            Clave de subida
            <input
              type="password"
              autoComplete="off"
              value={uploadSecret}
              onChange={(e) => setUploadSecret(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
              placeholder="Solo quien sube fotos"
            />
          </label>
          <label className="block text-sm text-foreground">
            Foto
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="mt-1.5 block w-full text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:text-primary-foreground"
            />
          </label>
          <label className="block text-sm text-foreground">
            Pie de foto (opcional)
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={200}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30"
              placeholder="Ej. Primer mate en Córdoba"
            />
          </label>
          <Button type="submit" size="sm" disabled={busy || !configured}>
            {busy ? "Subiendo…" : "Publicar en el álbum"}
          </Button>
          {message ? (
            <p className="text-sm text-muted-foreground" role="status">
              {message}
            </p>
          ) : null}
        </form>
      ) : null}

      {photos.length === 0 ? (
        <p className="reveal mt-8 text-sm text-muted-foreground">
          Todavía no hay fotos. Cuando Erne (o alguien con la clave) suba una,
          aparece aquí — las más nuevas primero.
        </p>
      ) : (
        <ul className="reveal mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {photos.map((photo) => (
            <li key={photo.key} className="overflow-hidden rounded-2xl bg-surface">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo.url}
                  alt={photo.caption || "Foto del viaje"}
                  fill
                  sizes="(max-width: 640px) 100vw, 20rem"
                  className="object-cover"
                  unoptimized
                />
              </div>
              {photo.caption ? (
                <p className="px-3 py-2 text-sm text-muted-foreground">
                  {photo.caption}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
