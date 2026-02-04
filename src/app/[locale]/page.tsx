import { useTranslations } from 'next-intl';

import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { projects } from "@/content/projects";

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-16">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-6">
            <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
              {t('badge')}
            </Badge>
            <h1 className="font-display text-4xl leading-tight text-graphite md:text-6xl">
              {t('hero.title1')}
              <span className="text-shadow-soft text-brand-strong">
                {t('hero.title2')}
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full bg-graphite px-6 text-xs uppercase tracking-[0.3em]">
                <Link href="/projects">{t('hero.exploreProjects')}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/70 bg-transparent px-6 text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
              >
                <Link href="/ludic-systems">{t('hero.ludicSystems')}</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="font-display text-xl text-graphite">
                  {t('about.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {t('about.content')}
              </CardContent>
            </Card>
            <Card className="surface-glass border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-xl text-graphite">
                  {t('currentFocus.title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  {t('currentFocus.description')}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.raw('currentFocus.tags').map(
                    (tag: string) => (
                      <Badge key={tag} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        <section id="projects" className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                {t('projectsSection.label')}
              </p>
              <h2 className="font-display text-3xl text-graphite md:text-4xl">
                {t('projectsSection.title')}
              </h2>
            </div>
            <Button asChild variant="ghost" className="text-xs uppercase tracking-[0.3em]">
              <Link href="/projects">{t('projectsSection.viewAll')}</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.slug} className="border-border/60 bg-card/70">
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="rounded-full">
                      {project.status}
                    </Badge>
                    <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {project.tagline}
                    </span>
                  </div>
                  <CardTitle className="font-display text-2xl text-graphite">
                    {project.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground">
                  <p>{project.summary}</p>
                  <ul className="space-y-2">
                    {project.focus.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-brand" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={project.link ? "flex gap-2" : ""}>
                    {project.link ? (
                      <>
                        <Button asChild variant="outline" className="flex-1 rounded-full border-border/60">
                          <Link href={`/projects/${project.slug}`}>{t('projectsSection.openLanding')}</Link>
                        </Button>
                        <Button asChild className="flex-1 rounded-full bg-brand-strong text-white">
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {t('projectsSection.visit')}
                          </a>
                        </Button>
                      </>
                    ) : (
                      <Button asChild variant="outline" className="w-full rounded-full border-border/60">
                        <Link href={`/projects/${project.slug}`}>{t('projectsSection.openLanding')}</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section
          id="ludic-systems"
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-6 duration-700"
        >
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {t('ludicSection.label')}
            </p>
            <h2 className="font-display text-3xl text-graphite md:text-4xl">
              {t('ludicSection.title')}
            </h2>
            <p className="text-base text-muted-foreground">
              {t('ludicSection.description')}
            </p>
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <Link href="/ludic-systems">{t('ludicSection.viewPlanning')}</Link>
            </Button>
          </div>
          <Card className="surface-glass border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-xl text-graphite">
                {t('ludicSection.principlesTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-ember" />
                  <span>{t(`ludicSection.principle${i}` as any)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
