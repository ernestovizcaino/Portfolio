// Mirrors the UploadThing file listing (data exported from your UT dashboard).
//
// The PDFs are NOT linked directly: browsers ignore the HTML `download`
// attribute for cross-origin URLs, and UploadThing serves these with
// `Content-Disposition: inline`, so a direct link would open the file in the
// PDF viewer instead of downloading it. `app/resume/[locale]/route.js` streams
// them from the same origin with an `attachment` disposition instead.
//
// To swap in a new resume: re-upload, then paste the new `url` and `size` here.
// (UploadThing mints a new key per upload, so the URL always changes.)

export const resumes = [
  {
    locale: "en",
    label: "English",
    filename: "Ernesto-Vizcaino-Resume.pdf",
    url: "https://cdwur3ntl2.ufs.sh/f/5Hfm73e8pLaZxQAXBsCwAeoFnx2ROadGtNEvflDrSLcHiz8q",
    size: 118804,
    updatedAt: "2026-08-31T21:20:58.000Z",
  },
  {
    locale: "es",
    label: "Español",
    filename: "Ernesto-Vizcaino-CV-ES.pdf",
    url: "https://cdwur3ntl2.ufs.sh/f/5Hfm73e8pLaZqfjY2Tz4AdZf7YtJBjN2USpx54yl6s0CEkLO",
    size: 117772,
    updatedAt: "2026-08-31T21:20:58.000Z",
  },
];

export const findResume = (locale: string) =>
  resumes.find((resume) => resume.locale === locale) ?? null;
