// The PDF is NOT linked directly: browsers ignore the HTML `download`
// attribute for cross-origin URLs, and UploadThing serves it with
// `Content-Disposition: inline`, so a direct link would open the file in the
// PDF viewer instead of downloading it. `app/resume/route.ts` streams it from
// the same origin with an `attachment` disposition instead.
//
// To swap in a new resume: re-upload, then paste its URL and size.
// (UploadThing mints a new key per upload, so the URL always changes.)

export const resume = {
  filename: "Ernesto-Vizcaino-Resume.pdf",
  url: "https://cdwur3ntl2.ufs.sh/f/5Hfm73e8pLaZK0EMFKmhierfV52LpEFCG7ZBadIOTD1KAu46",
  size: 120550,
};
