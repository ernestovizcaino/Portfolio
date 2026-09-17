import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
  HeadObjectCommand,
} from "@aws-sdk/client-s3";

const PREFIX = "family-trip/";

export interface TripPhoto {
  key: string;
  url: string;
  caption: string;
  uploadedAt: string;
  contentType: string;
}

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID?.trim() &&
      process.env.R2_ACCESS_KEY_ID?.trim() &&
      process.env.R2_SECRET_ACCESS_KEY?.trim() &&
      process.env.R2_BUCKET_NAME?.trim() &&
      process.env.R2_PUBLIC_BASE_URL?.trim(),
  );
}

function getR2Client(): S3Client | null {
  if (!isR2Configured()) return null;
  const accountId = process.env.R2_ACCOUNT_ID!.trim();
  return new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!.trim(),
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!.trim(),
    },
  });
}

function publicUrlForKey(key: string): string {
  const base = process.env.R2_PUBLIC_BASE_URL!.trim().replace(/\/$/, "");
  return `${base}/${key}`;
}

export async function listTripPhotos(): Promise<{
  configured: boolean;
  photos: TripPhoto[];
}> {
  if (!isR2Configured()) {
    return { configured: false, photos: [] };
  }

  const client = getR2Client()!;
  const bucket = process.env.R2_BUCKET_NAME!.trim();
  const listed = await client.send(
    new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: PREFIX,
      MaxKeys: 200,
    }),
  );

  const contents = listed.Contents ?? [];
  const photos: TripPhoto[] = [];

  for (const object of contents) {
    if (!object.Key || object.Key.endsWith("/")) continue;
    let caption = "";
    let contentType = "image/jpeg";
    try {
      const head = await client.send(
        new HeadObjectCommand({ Bucket: bucket, Key: object.Key }),
      );
      caption = head.Metadata?.caption
        ? decodeURIComponent(head.Metadata.caption)
        : "";
      contentType = head.ContentType ?? contentType;
    } catch {
      // Metadata optional — still show the image.
    }

    photos.push({
      key: object.Key,
      url: publicUrlForKey(object.Key),
      caption,
      uploadedAt: (object.LastModified ?? new Date()).toISOString(),
      contentType,
    });
  }

  photos.sort(
    (a, b) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
  );

  return { configured: true, photos };
}

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]);

export async function uploadTripPhoto(input: {
  bytes: Buffer;
  contentType: string;
  filename: string;
  caption?: string;
}): Promise<{ ok: true; photo: TripPhoto } | { ok: false; error: string }> {
  if (!isR2Configured()) {
    return { ok: false, error: "El álbum no está configurado (falta R2)." };
  }

  if (!ALLOWED_TYPES.has(input.contentType)) {
    return {
      ok: false,
      error: "Solo fotos: JPEG, PNG, WebP, GIF o HEIC.",
    };
  }

  if (input.bytes.byteLength > 12 * 1024 * 1024) {
    return { ok: false, error: "Máximo 12 MB por foto." };
  }

  const ext =
    input.filename.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
    "jpg";
  const key = `${PREFIX}${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
  const caption = (input.caption ?? "").trim().slice(0, 200);

  const client = getR2Client()!;
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!.trim(),
      Key: key,
      Body: input.bytes,
      ContentType: input.contentType,
      Metadata: caption
        ? { caption: encodeURIComponent(caption) }
        : undefined,
    }),
  );

  return {
    ok: true,
    photo: {
      key,
      url: publicUrlForKey(key),
      caption,
      uploadedAt: new Date().toISOString(),
      contentType: input.contentType,
    },
  };
}
