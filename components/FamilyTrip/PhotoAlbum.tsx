"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import type {
  CSSProperties,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
} from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import type { TripPhoto } from "@/lib/family-trip/photos";
import { cn } from "@/lib/utils";

type AlbumResponse = {
  configured: boolean;
  photos: TripPhoto[];
  error?: string;
};

/** Stable pseudo-random from object key so tilts don't jump on re-fetch. */
function tiltFromKey(key: string, index: number): {
  rotate: number;
  offsetX: number;
  offsetY: number;
} {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) | 0;
  }
  const n = Math.abs(hash);
  const baseRotate = ((n % 17) - 8) * 0.55;
  const fan = index % 2 === 0 ? 1 : -1;
  return {
    rotate: baseRotate + fan * Math.min(index, 8) * 0.85,
    offsetX: fan * (6 + Math.min(index, 10) * 7) + ((n >> 3) % 5) - 2,
    offsetY: Math.min(index, 12) * 9 + ((n >> 6) % 5),
  };
}

function formatStamp(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-MX", {
      day: "numeric",
      month: "short",
    }).format(new Date(iso));
  } catch {
    return "";
  }
}

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
      setMessage("¡Listo! Postal nueva arriba del montón.");
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
      intro="Postales del viaje apiladas como en la mesa de la cocina. Ver no pide contraseña extra; subir sí."
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
          Todavía no hay postales. Cuando Erne (o alguien con la clave) suba una,
          cae arriba del montón — las más nuevas primero.
        </p>
      ) : (
        <PostcardStack
          photos={photos}
          onOpen={(index) => setLightboxIndex(index)}
        />
      )}

      {lightboxIndex !== null && photos[lightboxIndex] ? (
        <PostcardLightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </Section>
  );
}

function PostcardStack({
  photos,
  onOpen,
}: {
  photos: TripPhoto[];
  onOpen: (index: number) => void;
}) {
  const depth = Math.min(photos.length - 1, 12);
  const stackHeight = 280 + depth * 9;

  return (
    <div className="reveal mt-10">
      <p className="mb-5 text-sm text-muted-foreground">
        {photos.length === 1
          ? "1 postal en el montón — tócala para verla grande."
          : `${photos.length} postales · la de arriba es la más nueva. Toca para ampliar.`}
      </p>

      <div
        className="relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem]"
        style={{ height: `${stackHeight}px` }}
        role="list"
        aria-label="Montón de postales del viaje"
      >
        {/* Render oldest first so DOM order matches visual pile under newest. */}
        {[...photos].reverse().map((photo, reverseIndex) => {
          const index = photos.length - 1 - reverseIndex;
          const { rotate, offsetX, offsetY } = tiltFromKey(photo.key, index);
          const isTop = index === 0;
          const style: CSSProperties = {
            zIndex: photos.length - index,
            transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
          };

          return (
            <button
              key={photo.key}
              type="button"
              role="listitem"
              onClick={() => onOpen(index)}
              aria-label={
                photo.caption
                  ? `Abrir postal: ${photo.caption}`
                  : `Abrir postal ${index + 1} de ${photos.length}`
              }
              className={cn(
                "absolute left-1/2 top-0 w-[min(100%,18.5rem)] -translate-x-1/2 cursor-pointer border-0 bg-transparent p-0 text-left transition-[transform,box-shadow] duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40",
                isTop && "hover:-translate-y-1",
              )}
              style={style}
            >
              <PostcardFace photo={photo} featured={isTop} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PostcardFace({
  photo,
  featured,
  large = false,
}: {
  photo: TripPhoto;
  featured?: boolean;
  large?: boolean;
}) {
  const stamp = formatStamp(photo.uploadedAt);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[0.35rem] border border-black/8 bg-[#f7f4ef] shadow-tilt",
        featured && "shadow-[0_10px_28px_-10px_oklch(0_0_0/0.28),0_2px_6px_-2px_oklch(0_0_0/0.12)]",
        large && "mx-auto max-w-lg",
      )}
    >
      <div className={cn("bg-white", large ? "p-3 sm:p-4" : "p-2.5")}>
        <div
          className={cn(
            "relative w-full overflow-hidden bg-muted",
            large ? "aspect-[4/3]" : "aspect-[4/3]",
          )}
        >
          <Image
            src={photo.url}
            alt={photo.caption || "Postal del viaje"}
            fill
            sizes={
              large
                ? "(max-width: 640px) 92vw, 32rem"
                : "(max-width: 640px) 80vw, 18rem"
            }
            className="object-cover"
            unoptimized
            priority={featured}
          />
        </div>
      </div>
      <div
        className={cn(
          "flex items-end justify-between gap-3 border-t border-dashed border-black/10",
          large ? "px-4 py-3" : "px-3 py-2.5",
        )}
      >
        <p
          className={cn(
            "min-w-0 flex-1 font-mono text-[0.7rem] leading-snug text-foreground/80",
            large && "text-sm",
          )}
        >
          {photo.caption || "Saludos desde Córdoba ♡"}
        </p>
        {stamp ? (
          <span
            className="shrink-0 rounded-sm border border-foreground/25 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-faint"
            aria-hidden
          >
            {stamp}
          </span>
        ) : null}
      </div>
    </article>
  );
}

function PostcardLightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: TripPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const titleId = useId();
  const photo = photos[index]!;

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        onNavigate((index + 1) % photos.length);
      }
      if (event.key === "ArrowLeft") {
        onNavigate((index - 1 + photos.length) % photos.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onNavigate, photos.length]);

  function stopBubble(event: KeyboardEvent | MouseEvent) {
    event.stopPropagation();
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg"
        onClick={stopBubble}
        onKeyDown={stopBubble}
      >
        <h2 id={titleId} className="sr-only">
          {photo.caption || `Postal ${index + 1} de ${photos.length}`}
        </h2>

        <PostcardFace photo={photo} featured large />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            {index + 1} / {photos.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {photos.length > 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    onNavigate((index - 1 + photos.length) % photos.length)
                  }
                >
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigate((index + 1) % photos.length)}
                >
                  Siguiente
                </Button>
              </>
            ) : null}
            <Button type="button" size="sm" onClick={onClose}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
