# Portfolio refinement audit

Reviewed October 12, 2026. Changes are local; nothing was deployed or published.

## Scope and implementation

Next.js 16 App Router, React 19, TypeScript, Tailwind 4, Figtree and JetBrains Mono, Hugeicons, existing theme/sound providers, and Framer Motion. Shared professional content is in `data/profile.ts`; bilingual copy and project translations are in `data/locales.ts`; project and essay content is loaded through `lib/content.ts`. English and Spanish home pages retain their canonical URLs, language alternates, structured data, and social image.

The original hero led with age and biography; experience appeared before product evidence; Selected Work omitted both fintech engineering roles. A visibility toggle hid confidential content visually while leaving identifiers in imported content and a directly accessible public asset. Press repeated the same award across many syndicated articles. The experience logo component also imported the entire Simple Icons catalog into the browser.

The implementation prioritizes: privacy removal; a concise engineering headline and useful hero links; selected product evidence; contribution-focused experience in both languages; research with explicit evaluation context; selected original recognition; homepage writing excerpts; and measured accessibility/performance repairs. Existing Kashi essays retain their names, content, experiments, and meaning. No framework, dependencies, screenshots, proprietary architecture, or unsupported metrics were added.

The homepage now follows: Introduction → Selected Work → Professional Experience → Research & Awards → Gaia/OGLE Research → Press & Recognition → Writing → Contact. Awards and research keep their existing components as adjacent parts of the same subject. The technology-logo section is no longer on the homepage; relevant technologies appear beside the work they support. The dock prioritizes work, experience, research, writing, contact, résumé, and theme, and fits within a 320px viewport.

## Evidence and public résumé

- The existing English and Spanish PDFs were downloaded, text-extracted, rendered, and visually reviewed. Each is a readable, searchable one-page PDF. Metadata, outlines, and seven annotations per file were inspected for privacy. Private source documents were not opened or edited.
- Both local `/resume/en` and `/resume/es` endpoints returned HTTP 200, `application/pdf`, attachment disposition, and descriptive filenames. SHA-256 checksums matched the inspected original PDFs exactly.
- The PDFs are safe to retain but outdated: Xignus still ends at “Present,” and the independent role is absent. Updating a dedicated public résumé is a follow-up, not a reason to publish a private résumé.
- Product metrics come from the supplied brief and existing résumé. Rubin morphology evaluation remains distinct from physical labels and from Gaia/OGLE results. No scores from the separate RedCLARA OGLE/ZTF work were merged into either experiment.
- [UASLP recognition](https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/) was verified; the article header gives September 30, 2026. It is the award's university reference.
- [CUDI announcement](https://cudi.edu.mx/noticias/premiacion-hackathon) explicitly identifies Ernesto as the Phase 3, advanced-level winner; publication date August 28, 2026.
- [RedCLARA scientific coverage](https://www.redclara.net/es/noticiasyeventos/casos-y-voces/8892-pig-la-plataforma-que-une-a-las-universidades-para-democratizar-el-acceso-al-computo-cientifico) was verified, dated September 23, 2026, and retained because it describes scientific work beyond the award.
- Xignus's existing company link and GitHub resolved with HTTP 200. LinkedIn returned its automated-access block (HTTP 999); [El Sol de San Luis](https://oem.com.mx/elsoldesanluis/ciencia-y-salud/estudiante-de-la-uaslp-gana-hackathon-de-astronomia-con-ia-32358513) returned HTTP 403. The existing links are retained, with manual verification still needed.
- The existing [Oliver URL](https://www.tryoliver.ai/en) returns HTTP 200 but now serves healthcare content. Its fintech description survives in a stale search index. The misleading outbound link was removed from Experience and Selected Work; historical work remains. A suitable archived fintech URL needs confirmation.

## Interface review

Full review of the requested portfolio surfaces in the existing Tailwind/token system. Private family-trip routes were excluded from design changes. Local browser checks cover English and Spanish at 1440px, 390px, and 320px, plus keyboard controls, language switching, dark mode, and reduced motion. Existing essay text and private source documents were excluded from editing.

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | Hero, project rows, experience, press, desktop and phone screenshots, heading semantics | Clear after changes |
| Surfaces | Existing reading column and rows, dock geometry, focus target and hit areas | Clear after changes |
| Animations | Initial list visibility, theme/dock states, reduced-motion behavior | Entrance concealment removed; retained transitions not inspected at 10% speed |
| Icons | Company logo imports, initial fallback, dock labels and icon placement | Full-catalog import removed; existing logos preserved |
| Performance | Production build, generated chunk sizes, mobile Lighthouse | Improved; production field metrics remain unverified |

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| High | `data/profile.ts`, `data/content.ts`, `data/locales.ts`, `data/visibility.ts`, public brand asset | Confidential content hidden by a UI toggle but still present in site inputs/assets | Removed content, identifying metrics, URL, image, and toggle; general independent role added | Visual hiding does not protect public output |
| Medium | `components/Intro/index.tsx`, `data/profile.ts`, `data/locales.ts` | Biography and age dominate; career actions primarily elsewhere | Clear product/AI headline, ownership evidence, and quiet résumé/GitHub/LinkedIn/contact links | Typography hierarchy and recruiter scanning |
| Medium | `components/Home/index.tsx`, `components/Dock/index.tsx` | Experience first, technology-logo section, no writing excerpts | Product evidence first, technologies in context, original essays surfaced, compact dock | Information hierarchy and narrow-screen hit areas |
| Medium | `data/profile.ts`, `data/locales.ts`, `components/Experience/index.tsx` | Current role absent publicly; fintech contributions terse | General independent role, explicit two-period Xignus dates, contribution-focused fintech descriptions | Concrete engineering ownership |
| Medium | `data/content.ts`, `components/Projects/index.tsx` | Financial products missing; project titles were spans | Four priority projects, actual contribution/approach/outcomes, semantic h3 titles, keyboard outline | Evidence and heading hierarchy |
| Medium | `data/profile.ts`, `data/locales.ts`, `components/Awards/index.tsx`, `components/Research/index.tsx` | Evaluation limits not explicit; award link led only to announcement | Morphology evaluation context, university reference, separate Gaia/OGLE research | Scientific accuracy and distinct section purposes |
| Medium | `components/PressRecognition/index.tsx`, `data/recognition.ts` | Many syndicated links, publication names without visible article titles | Four selected sources, visible original titles and verified dates, concise introduction | Credibility, readable grouping, adequate target sizes |
| Medium | `components/CompanyChip/index.tsx`, `components/Experience/index.tsx` | Dynamic lookup imports a 5 MB icon catalog despite logo-only content | Logo/initial rendering without the unused lookup | Avoid unnecessary browser payload and parse cost |
| Medium | `components/Projects/index.tsx`, `components/Experience/index.tsx`, `components/Awards/index.tsx`, `components/Research/index.tsx`, `components/Writing/index.tsx`, `styles/globals.css` | Lists and scroll-linked section text initially concealed | Section content visible immediately; hero and subtle hover interactions retained | Motion restraint, readable evidence, progressive rendering |
| Medium | `styles/globals.css`, `app/layout.tsx`, `components/Dock/index.tsx`, `components/TopBar/index.tsx`, `components/Intro/index.tsx`, `data/locales.ts` | Low dark-mode contrast, skip target unfocusable, accessible names omit visible CV/language labels | Dark text token repaired, main focus target added, labels include visible text | Keyboard and accessible-name correctness |
| Low | `components/Intro/index.tsx`, `components/Projects/index.tsx`, `components/TopBar/index.tsx` | Missing avatar sizes, maximum logo quality, cramped phone header | Explicit avatar size, default logo quality, clock and separator hidden on narrow phones, larger controls | Image sizing, useful hit areas, spacing |
| Medium | `lib/seo.ts`, `app/layout.tsx`, `app/es/page.tsx`, `scripts/check-public-privacy.mjs`, `package.json` | General descriptions, no repeatable generated-output privacy check | Professional descriptions and natural role keywords, consistent Spanish title, explicit privacy-check command | Search clarity and repeatable release verification |

Considered and rejected:

| Candidate | Reason |
| --- | --- |
| Replace the reading column and dock with a conventional large portfolio layout | Existing identity is strong; preserving it is an explicit constraint |
| Expand every project into a detailed architecture case study | Available sources do not justify additional proprietary implementation detail or screenshots |
| Repeat Gaia/OGLE as another Selected Work card | Preserved in Research instead, to reduce duplication and keep priority product work visible |

## Verification results

- `npm run build`: passed, including all 17 generated pages and public résumé routes.
- `npm run typecheck`: passed.
- ESLint on all modified TS/TSX files and the privacy script: passed.
- `npm run lint`: blocked by a pre-existing `react-hooks/set-state-in-effect` error at `components/FamilyTrip/PhotoAlbum.tsx:86`. That private feature was not modified.
- `git diff --check`: passed.
- `npm run check:privacy`: passed across 513 source, public, client-bundle, and server-output files, including HTML, RSC, source maps, and metadata. This byte/name scan is not a PDF parser; remotely hosted PDFs were separately inspected as described above. It does not inspect external sites or purge older deployments/caches.
- Six language/viewport combinations: document width equals viewport width; no missing internal anchor targets; project text opacity 1. The narrow-phone dock is 299px wide.
- JavaScript-disabled Spanish phone check: all four project rows remain visible, the content container declares Spanish, and the public résumé link remains available.
- Keyboard Tab → skip link → Enter focuses `main`. Résumé disclosure exposes both language downloads; Escape closes it. Language link navigates to `/es` and displays Spanish copy. Dark/light toggling and reduced-motion rendering pass.
- React Doctor final review: 87/100, with one retained warning about AnimatePresence's ancestor. The ancestor condition is an immutable imported résumé list, not a runtime toggle; the actual disclosure stays mounted while its child exits. Escape/menu behavior was verified. No warning was suppressed.
- Local browser console: existing Vercel Analytics script returns 404 outside Vercel hosting. No application exception was observed in the inspected interactions. No email was sent.

Mobile Lighthouse against the local production build:

| Metric | First local audit before targeted performance repairs | Final local audit |
| --- | --- | --- |
| Performance | 67 | 89 |
| Accessibility | 97 | 100 |
| SEO | 100 | 100 |
| LCP | 15.9 s | 3.7 s |
| Total blocking time | 350 ms | 100 ms |
| Layout shift | 0 | 0 |
| First contentful paint | 0.9 s | 0.9 s |

The comparison isolates the audit-driven icon, motion, and accessibility repairs; the first audit was already after the content changes. These are simulated mobile laboratory results on localhost, not field Core Web Vitals. Final LCP remains above the good threshold. The largest final JS chunk is 227,647 bytes; the 5 MB icon-catalog chunk is absent. Further analytics/runtime tuning should be measured separately.

Interface verdict: Approve for the inspected flows. Unverified: 10%-speed transition inspection, production field metrics, manual LinkedIn/newspaper access, and an archived fintech URL. Whole-repository lint remains a separate existing issue.

## Modified files

- `app/layout.tsx`, `app/es/page.tsx`
- `components/Intro/index.tsx`, `components/Home/index.tsx`, `components/Dock/index.tsx`, `components/TopBar/index.tsx`
- `components/Projects/index.tsx`, `components/Experience/index.tsx`, `components/CompanyChip/index.tsx`
- `components/Awards/index.tsx`, `components/Research/index.tsx`, `components/PressRecognition/index.tsx`, `components/Writing/index.tsx`
- `data/profile.ts`, `data/content.ts`, `data/locales.ts`, `data/recognition.ts`
- `lib/content.ts`, `lib/seo.ts`, `styles/globals.css`, `package.json`
- New: `scripts/check-public-privacy.mjs`, `docs/portfolio-refinement.md`
- Removed: `data/visibility.ts` and the confidential product's public brand image.
- Review artifacts: `output/playwright/` screenshots. Existing untracked `.playwright-cli/` content was preserved.

## Follow-ups, by impact

1. Refresh dedicated public PDFs with the independent role and September 2026 Xignus end date; preserve private documents. Recheck text, links, annotations, metadata, and layout before replacing the allowlisted URLs.
2. Provide a historical Oliver fintech URL or approved case-study reference. Manually verify LinkedIn and El Sol de San Luis.
3. Add one evidence-backed public case study with an approved repository or authentic asset, clear ownership, and implementation tradeoffs. Do not fabricate screenshots or company internals.
4. Measure production LCP/INP/CLS after a separately authorized deployment; evaluate analytics and remaining client runtime cost with measurements.
5. Repair the existing private photo-album lint error in a separate focused change. Run `npm run build` then `npm run check:privacy` before any release, and account for older public assets/caches when releasing the privacy removal.


## Browser-comment revisions

- Hero résumé action now says “Resume” (English) / “CV” (Spanish) and opens an English/Español download menu using the existing Base UI dependency. Both downloads and keyboard ArrowDown/Escape behavior were tested.
- Restored the copy-email row's original 16px text, spacing, and 26px keycap. Its invisible hit area retains easier pointer access without enlarging the visible key.
- Removed the white background and outline shadow from shared company-logo chips; their logos fill the existing 22px slot.
- Removed the footer Writing link. Homepage writing and essay routes remain available.
- Additional modified file: `components/Footer/index.tsx`; also revised `components/Intro/index.tsx`, `components/CompanyChip/index.tsx`, and `data/locales.ts`.
- Rebuilt production output and passed typecheck, changed-file ESLint, and privacy scan (520 files). React Doctor remains 87/100 with the previously documented dock warning. At 320px, document width remains 320px. Lighthouse scores above describe the earlier audit and were not rerun for these small UI revisions.
