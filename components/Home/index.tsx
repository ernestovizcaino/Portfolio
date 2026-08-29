import { Awards } from "@/components/Awards";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Intro } from "@/components/Intro";
import { Projects } from "@/components/Projects";
import { Research } from "@/components/Research";
import { Stack } from "@/components/Stack";
import { TopBar } from "@/components/TopBar";
import { getDictionary, localizeProjects } from "@/data/locales";
import type { Locale } from "@/data/locales";
import { getHomeContent } from "@/lib/content";

export async function Home({ locale = "en" }: { locale?: Locale }) {
  const { projects } = await getHomeContent();
  const dictionary = getDictionary(locale);

  return (
    <>
      <TopBar locale={locale} />
      <Intro profile={dictionary.profile} ui={dictionary.ui} />

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
        <Awards data={dictionary.awards} label={dictionary.ui.awards} />
      </div>

      <div className="mt-20">
        <Projects
          data={localizeProjects(projects, locale)}
          label={dictionary.ui.selectedWork}
          intro={dictionary.ui.projectsIntro}
        />
      </div>

      <div className="mt-20">
        <Research data={dictionary.research} label={dictionary.ui.research} />
      </div>

      <div className="mt-20">
        <Stack label={dictionary.ui.stack} />
      </div>

      <div className="mt-20">
        <Contact profile={dictionary.profile} ui={dictionary.ui} />
      </div>
    </>
  );
}
