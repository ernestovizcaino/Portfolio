// Mirrors the UploadThing file listing (data exported from your UT dashboard).
//
// The PDFs are NOT linked directly: browsers ignore the HTML `download`
// attribute for cross-origin URLs, and UploadThing serves these with
// `Content-Disposition: inline`, so a direct link would open the file in the
// PDF viewer instead of downloading it. `app/resume/[locale]/route.js` streams
// them from the same origin with an `attachment` disposition instead.
//
// PUBLIC-SITE PRIVACY CHECK REQUIRED BEFORE DEPLOYMENT:
// Existing PDFs could not be inspected here. Verify that both downloaded PDFs
// omit the name, domain, screenshots and identifying details of private ventures.
// Never substitute a private application résumé into these public URLs.
// To swap in a sanitized PUBLIC resume: re-upload, then paste its URL and size.
// (UploadThing mints a new key per upload, so the URL always changes.)

export const resumes = [
  {
    locale: "en",
    label: "English",
    filename: "Ernesto-Vizcaino-Resume.pdf",
    url: "https://cdwur3ntl2.ufs.sh/f/5Hfm73e8pLaZWFWYbVpzVFDhWIS5wGsxgEC37cR09Kj4vBr2",
    size: 119655,
    updatedAt: "2026-10-13T02:16:30.000Z",
  },
  {
    locale: "es",
    label: "Español",
    filename: "Ernesto-Vizcaino-CV-ES.pdf",
    url: "https://cdwur3ntl2.ufs.sh/f/5Hfm73e8pLaZ9ux127svzYOD7GqNXkLtFSdTjw8WCyu6iKpE",
    size: 120666,
    updatedAt: "2026-10-13T02:16:30.000Z",
  },
];

export const findResume = (locale: string) =>
  resumes.find((resume) => resume.locale === locale) ?? null;
