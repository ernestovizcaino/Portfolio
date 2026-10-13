import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Intro } from "@/components/Intro";
import { Projects } from "@/components/Projects";
import { PressRecognition } from "@/components/PressRecognition";
import { Research } from "@/components/Research";
import { Writing } from "@/components/Writing";
import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { getDictionary, localizeProjects } from "@/data/locales";
import type { Locale } from "@/data/locales";
import { getHomeContent } from "@/lib/content";

export async function Home({ locale = "en" }: { locale?: Locale }) {
  const { projects, posts } = await getHomeContent();
  const dictionary = getDictionary(locale);

  return (
    <div lang={locale}>
      <TopBar locale={locale} />
      <Intro profile={dictionary.profile} ui={dictionary.ui} locale={locale} />

      <div className="mt-16">
        <Projects
          data={localizeProjects(projects, locale)}
          label={dictionary.ui.selectedWork}
          intro={dictionary.ui.projectsIntro}
          locale={locale}
        />
      </div>

      <div className="mt-20">
        <Experience
          data={dictionary.experience}
          intro={dictionary.ui.experienceIntro}
          label={dictionary.ui.experience}
          at={dictionary.ui.at}
          dateTo={dictionary.ui.dateTo}
        />
      </div>

      <div className="mt-20">
        <Awards data={dictionary.awards} label={dictionary.ui.researchAwards} />
      </div>

      <div className="mt-10">
        <Research data={dictionary.research} label={dictionary.ui.research} />
      </div>

      <div className="mt-20">
        <PressRecognition copy={dictionary.pressRecognition} locale={locale} />
      </div>

      <div className="mt-20">
        <Writing data={posts.slice(0, 3)} label={dictionary.ui.writing} locale={locale} />
        <div className="column mt-4">
          <Link href="/writing" className="inline-flex min-h-10 items-center rounded-sm text-sm text-muted-foreground underline decoration-border underline-offset-4 hover:text-foreground">{dictionary.ui.allWriting}</Link>
        </div>
      </div>

      <div className="mt-20">
        <Contact profile={dictionary.profile} ui={dictionary.ui} />
      </div>
    </div>
  );
}
