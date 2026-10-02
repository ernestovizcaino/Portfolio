# Personal identity SEO investigation

Audit date: October 1, 2026 (America/Mexico_City). Production was inspected separately from the working tree before implementation. The earlier Press & Recognition changes, including TuExamen.mx, were already present locally and were preserved.

## Conclusion

The strongest opportunity is a clearer connection between the full name used by institutions, the personal homepage, and the existing articles. The site is accessible and has working canonicals; the evidence does not support an indexing emergency, a site redesign, duplicate name-variant pages, or a large press-focused SEO expansion.

Several concrete defects were independently reproduced: incomplete Spanish social metadata, incorrect article language in JSON-LD, missing visible article authorship, disconnected article navigation, build-time sitemap dates, and a mobile dock wider than its viewport. These were addressed alongside the identity improvements.

## Evidence and limitations

- Read the repository's routes, metadata, content pipeline, localization, sitemap, robots rules, private-route exclusions, image handling, analytics, shared components, and styling. Reviewed the current local changes without resetting them.
- Retrieved production HTML and headers for `/`, `/es`, an article, `robots.txt`, `sitemap.xml`, missing URLs, HTTP-to-HTTPS behavior, and language/trailing-slash variants. Also inspected the rendered production homepage on mobile.
- Queried all eight requested name/topic combinations, plus individual quoted variants, domain searches, and targeted institutional searches. Results are a sample from the available web-search provider, **not a verified Google rank report**.
- A direct Google browser query returned HTTP 429 and an automated-traffic challenge. No attempt was made to bypass it.
- The connected Google Search Console connector has no property for `ernestovizcaino.com`. Impressions, clicks, average positions, Google-selected canonicals, indexing reasons, Knowledge Graph associations, and field Core Web Vitals could not be verified.
- A `site:` query returned no results in one sample even though individual articles appeared in name searches. This is not evidence that the domain is unindexed. [Google documents the limitations of search operators](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site).
- Raw response snapshots and browser captures were saved outside the repository in `/tmp/portfolio-seo-audit/`. Observations reflect this audit, not a continuous monitor.

## Search observations

The following lists examples returned by the investigation, not stable ranking positions. Queries with and without quotation marks were used; sparse exact-phrase/topic searches also returned unrelated results.

| Requested query | Observed results and implication |
| --- | --- |
| Ernesto Vizcaíno | LinkedIn name directories and the portfolio's “I Built a Complete SaaS…” article; unrelated professionals also appeared. The homepage was not clearly surfaced in the sampled results. |
| Ernesto Vizcaino | LinkedIn directories and unrelated Lear Corporation/Madrid professional profiles, alongside the portfolio article. Removing the accent does not uniquely identify this person. |
| Ernesto Vizcaíno Alvarado | War Room, Potosí Noticias, Escenarios Noticias, UASLP's Conexión Universitaria podcast listing, and older Platzi discussions. The full surname substantially narrows the relevant context. |
| Ernesto Vizcaino Alvarado | Similar full-name coverage, university podcast listings, and Platzi results; accented text was returned for an unaccented query. |
| Ernesto Vizcaíno UASLP | Plano Informativo in the broader query; War Room, Palestra, TuExamen.mx and university podcast results in follow-up searches. |
| Ernesto Vizcaíno hackathon | War Room, TuExamen.mx, El Tiempo del Altiplano, university podcast listings and MC Noticias SLP. |
| Ernesto Vizcaíno astronomy | Weak/noisy results, including a different researcher, Ernesto Franco-Vizcaíno. Targeted institutional searches were more reliable for locating the actual work. |
| Ernesto Vizcaíno machine learning | TuExamen.mx plus unrelated academic results in the quoted sample. Targeted RedCLARA searches found the relevant scientific feature and its translations. |

The engineering role, San Luis Potosí location, UASLP connection, full surname, and GitHub identity offer useful disambiguation. Co-occurrence in search results does **not** establish that Google has merged every mention into one entity or selected the personal homepage as its canonical identity page.

The sampled portfolio article title retained its article-specific wording followed by “Ernesto Vizcaíno.” Its excerpt repeated the opening sentence because the content pipeline used that sentence as both a description and the first paragraph. No reliable Google homepage title/snippet rewrite could be observed. Search snippets and title links remain search-engine decisions: [title guidance](https://developers.google.com/search/docs/appearance/title-link), [snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

## External identity evidence

| Source | Verified observation | Interpretation |
| --- | --- | --- |
| [UASLP feature](https://wp.uaslp.mx/noticias/orgullouaslp/estudiante-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/) | HTTP 200; names Ernesto Vizcaíno Alvarado, the degree/university, the competition, CARLA participation and continuing astronomical work. No portfolio hyperlink found in the fetched HTML. | Primary university context; a useful place to request a factual personal-site link. |
| [CUDI announcement](https://cudi.edu.mx/noticias/premiacion-hackathon) | HTTP 200; names “Ernesto Vizcaino, Universidad Autónoma de San Luis Potosí” as the Phase 3 advanced-level winner. No portfolio hyperlink found. | Direct confirmation of the award; the shorter unaccented name is a real external variant. |
| [RedCLARA feature](https://www.redclara.net/es/noticiasyeventos/casos-y-voces/8892-pig-la-plataforma-que-une-a-las-universidades-para-democratizar-el-acceso-al-computo-cientifico) | Independently located through search and fetched during this session. Uses the full name and discusses scientific computing and an OGLE/ZTF classification pipeline. English and Portuguese versions also surfaced. | Related scientific work, not another independent Hackathon award or a peer-reviewed publication. |
| [GitHub](https://github.com/ernestovizcaino) | HTTP 200; profile uses “Ernesto Vizcaíno Alvarado” and already links to `https://ernestovizcaino.com`. | Existing reciprocal identity evidence. Keep this link rather than treating it as a missing opportunity. |
| Regional media | War Room, Plano Informativo, Potosí Noticias, Palestra, TuExamen.mx and other outlets surfaced; exact names and details overlap. | Several articles reproduce or adapt the university account. Multiple outlets should not be presented as multiple independent investigations. |
| [Escenarios Noticias](https://escenariosnoticias.com.mx/estudiante-de-la-uaslp-gana-hackathon-de-datos-astronomicos-con-inteligencia-artificial/) | Newly discovered during the name searches; HTTP 200, matching full name and story. No portfolio hyperlink found. | Additional confirmed coverage, recorded here. Expanding the UI further was not necessary for this identity-focused change. |
| [Conexión Universitaria](https://podcasts.apple.com/pa/podcast/noticiario-conexi%C3%B3n-universitaria/id1586635790) | Searchable university podcast listing describes the Hackathon guest using the full name. | A possible additional institutional reference. An exact episode should be checked before adding an episode link to the portfolio. |

No external profile or publication was edited or contacted. No uncertain namesake profile was added to structured data. El Sol de San Luis blocked automated retrieval in the earlier coverage verification; its user-supplied link remains intact, without treating that response as proof of a broken article.

## Production versus repository

| Area | Production evidence before changes | Repository decision |
| --- | --- | --- |
| Identity | H1 and Person name were only “Ernesto Vizcaíno”; full surname absent from the homepage. | Full name in the H1 and homepage titles/descriptions; retain the short site name and existing domain. |
| Press | Production homepage had no Press & Recognition section; local working tree already contained it. | Preserve the local implementation. It needs deployment together with these changes. |
| Canonicals/indexability | `/` and `/es` returned 200, each had a self-canonical and reciprocal language links. Articles had their own canonicals. Public pages allowed indexing. Unknown article returned 404. | Retain these behaviors. `/es` remains its own canonical translation, not canonicalized to `/`. |
| Redirects | HTTP redirected to HTTPS with 308. Root redirected to `/es` with 307 for an `Accept-Language: es-MX` request. | Keep HTTPS behavior; remove inferred-language redirect and retain explicit language links. |
| Alternate hostname | `www.ernestovizcaino.com` failed DNS resolution from the audit environment. | External DNS/hosting follow-up; no fabricated app-level fix for a hostname that cannot reach the app. |
| Spanish metadata | Spanish title put the role before the name; emitted no `og:image`, and Twitter fell back to `summary`. | Explicit complete Spanish share metadata and a name-first title. |
| Structured data | Separate Person objects for EN/ES used the same ID but different homepage URLs. Spanish Person had an inappropriate `inLanguage`. English article JSON-LD declared `es-MX`. | Shared identity builder, localized ProfilePage, one canonical Person URL/ID, correct article language. |
| Heading structure | Homepage H1 jumped to H3 entries because section labels were paragraphs. | Real H2 section labels with unchanged visual classes. |
| Internal linking | Homepage had no crawlable path to the essays. Article back link targeted absent `/#writing`; dock links on articles pointed to absent in-page sections. | Small footer link to `/writing`, archive links to every essay, working return/home navigation. |
| Author identity | Article schema referenced the author but no visible author byline existed. | Visible linked full-name byline using the same identity as structured data. |
| Sitemap | Public routes only, but homepage dates came from `new Date()`; article fallback mixed publication and modification dates. | Add the archive; emit `lastModified` only for explicitly recorded updates. No artificial freshness. |
| Mobile | Content fit 390px, but the fixed dock measured 397px and was clipped. | Smaller dock controls/spacing only below 420px; desktop remains unchanged. |
| Performance | Cached/pre-rendered homepage, font preloads, optimized avatar. One local browser sample gave approximately 71ms TTFB and 960ms DOMContentLoaded; not field performance data. | Keep static output, image/font handling, and dependencies. No rankings or Core Web Vitals claims based on this sample. |

## A. Implemented code changes

1. Added the full name and three alternate public name spellings to shared identity data. Homepage H1 and metadata now match the fuller institutional identity without displaying a list of spelling variants.
2. Added a connected `WebSite` / `ProfilePage` / `Person` graph with stable IDs across languages. Personal social profiles stay in `sameAs`. The three visible institutional/scientific articles are represented as `subjectOf` references drawn from the existing recognition data.
3. Completed Spanish OpenGraph/Twitter metadata and gave article previews an explicit fallback image. The generic portfolio preview is not falsely declared an article-specific illustration in JSON-LD.
4. Added visible article author links, corrected article language, used `BlogPosting`, supplied machine-readable publication dates, and stopped inventing modification timestamps. Original recorded publication dates remain unchanged as calendar dates.
5. Replaced generic first-sentence article descriptions with concise, content-specific summaries. These remain descriptions of the existing essays, not claims of new achievements.
6. Added a compact `/writing` archive using the existing Writing presentation, a footer link, and corrected article/dock navigation. No new homepage content section was added for the essays.
7. Converted section labels to semantic headings without restyling them. Added a server-rendered language scope to localized homepage content and articles.
8. Removed automatic browser-language routing while preserving `/`, `/es`, self-canonicals and language-switch links. This follows [Google's multilingual guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites).
9. Removed unverified sitemap freshness and added `/writing`. [Google uses accurate last modification dates and ignores priority/change-frequency hints](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap); the existing hints are not being treated as ranking controls.
10. Fixed the observed mobile dock clipping while preserving its controls and desktop appearance.

Markup choices follow [Google's ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page), [article author guidance](https://developers.google.com/search/docs/appearance/structured-data/article), [site-name guidance](https://developers.google.com/search/docs/appearance/site-names), and Schema.org definitions for [alternateName](https://schema.org/alternateName), [sameAs](https://schema.org/sameAs) and [subjectOf](https://schema.org/subjectOf). They clarify meaning; they do not guarantee rankings, rich results, or a Knowledge Panel.

## B. External actions

1. **Deploy and then inspect.** These edits are local, not deployed by this task. After deployment, inspect `/`, `/es`, `/writing` and one article in Google Search Console. Check rendered content, indexing permission, declared versus Google-selected canonical, and run Google's Rich Results Test on the public URLs.
2. **Connect the correct Search Console property.** The current connector does not expose this domain. [Connect Search Console through Windsor.ai](https://onboard.windsor.ai/connect?connector=searchconsole&next=/searchconsole/authorize), select the account with access to this site's property, grant Search Console permission, and select the property. Then compare branded queries across name variants, pages, countries and devices over meaningful date ranges. Do not interpret a few days of fresh press as a completed trend.
3. **Submit/verify the sitemap and request recrawling after deployment.** This cannot be performed by the read-only analytics connector. Do not repeatedly request indexing or use the Google Indexing API for these ordinary portfolio pages.
4. **Prioritize factual identity links from UASLP and CUDI.** Ask whether the existing name mention can link to the canonical personal homepage. RedCLARA is also a relevant contact for the scientific-work connection. These requests are editorial decisions, not guaranteed backlinks. Avoid paid links, bulk outreach and identical keyword-heavy anchor demands.
5. **Keep controlled profiles consistent.** GitHub already links correctly. Check the public LinkedIn/X website fields manually and use the same canonical URL and an accurate full-name/short-name relationship. Their complete profile settings were not verified here. Do not create profiles merely to multiply links.
6. **Check the `www` hostname.** Confirm DNS and hosting configuration. If it is intended to work, provision the alias/TLS and permanently redirect it to the existing apex domain. Keep the apex canonical.

## C. Deliberately unchanged

- No separate landing pages for accented/unaccented names, no change of domain or existing article slugs, and no cross-language canonical consolidation.
- No press URLs in `sameAs`, no `Review`/rating markup, no fabricated reach statistics, no extra award claims, and no assertion that syndicated stories independently validated the science.
- No change to the restrained press presentation or existing outlet ordering. No new source-count prominence.
- No arbitrary article-specific stock images just to fill a structured-data field. Share cards have a sensible branded fallback; article JSON-LD only uses an actual article cover when one exists.
- No schema claims of a degree already awarded, academic employment, or a peer-reviewed publication. The source material does not justify them.
- No robots exclusions for public pages, no inclusion of private family routes in the sitemap, and no private-route/content changes.
- No metadata keyword expansion, fake `dateModified`, or attempts to tune sitemap priorities for ranking.
- No dynamic root layout solely to change `<html lang>` during SSR. `/es` now scopes its actual content with `lang="es"` on the server and the existing client language switch updates the document language. The root shell remains English in initial HTML. Google determines page language from visible content; this avoids making every public route dynamic for an SEO claim that its documentation does not support.
- No redesign, new dependency, analytics migration, removal of existing animation, or speculative performance rewrite. Field performance should be measured with the correct Search Console/CrUX property.

## Validation

- Production build and TypeScript passed. The build generated all 17 pages, including `/writing`.
- Changed-file ESLint and `git diff --check` passed. Full-project lint remains blocked by the pre-existing `react-hooks/set-state-in-effect` error at `components/FamilyTrip/PhotoAlbum.tsx:86`; that unrelated component was not changed.
- Generated HTML/JSON-LD checks passed for both homepages and all five essays: identity IDs, languages, author links, canonicals, language alternates, sharing metadata and heading structure. The final sitemap contains eight public URLs and no invented modification dates.
- Browser checks passed at 320, 390, 768 and 1440 pixels. The dock fits the viewport; Spanish content renders correctly; the archive exposes five article links; article return links and author links work. The dock no longer marks a nonexistent current section on article/archive routes.
- Local production responses confirmed no automatic language redirect, a real 404 for an unknown article, and a working PNG share image. The local Vercel Analytics script returned an expected 404 outside Vercel; no application runtime failure was observed.
- React Doctor reported 92/100 with a nonblocking Dock control-flow complexity warning and no errors. No unrelated refactor was made to increase the score.

External Google rich-result/indexing validation requires deployment and was not claimed as completed. These checks verify implementation, not ranking impact or field Core Web Vitals.
