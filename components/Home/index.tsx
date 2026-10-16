import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Intro } from "@/components/Intro";
import { Projects } from "@/components/Projects";
import { PressRecognition } from "@/components/PressRecognition";
import { Research } from "@/components/Research";
import { TopBar } from "@/components/TopBar";
import { getDictionary, localizeProjects } from "@/data/locales";
import type { Locale } from "@/data/locales";
import { getHomeContent } from "@/lib/content";

export async function Home({ locale = "en" }: { locale?: Locale }) {
  const { projects } = await getHomeContent();
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
          label={dictionary.ui.experience}
          at={dictionary.ui.at}
          dateTo={dictionary.ui.dateTo}
        />
      </div>

      <div className="mt-20">
        <Research
          data={dictionary.research}
          label={dictionary.ui.research}
          newTab={dictionary.pressRecognition.newTab}
        >
          <PressRecognition copy={dictionary.pressRecognition} />
        </Research>
      </div>

      <div className="mt-20">
        <Contact ui={dictionary.ui} />
      </div>
    </div>
  );
}
