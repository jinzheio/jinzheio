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

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {t('title')}
          </p>
          <h1 className="font-display text-4xl text-graphite md:text-5xl">
            {t('subtitle')}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            {t.raw('description')}
          </p>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {projects.map((project) => (
            <Card key={project.slug} className="border-border/60 bg-card/80">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="rounded-full">
                    {t(`status.${project.status.toLowerCase()}` as any)}
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
                <div className="flex flex-wrap gap-2">
                  {project.focus.map((item) => (
                    <Badge key={item} variant="outline" className="rounded-full">
                      {item}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
                  <Link href={`/projects/${project.slug}`}>{t('status.openLanding')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
