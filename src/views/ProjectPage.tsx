import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Project } from "@/content/projects";
import { siteCopy } from "@/content/site-copy";

type ProjectPageProps = {
  project: Project;
};

export function ProjectPage({ project }: ProjectPageProps) {
  const t = siteCopy.project;
  const common = siteCopy.common;

  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Badge variant="secondary" className="rounded-full">
              {project.status}
            </Badge>
            <span>{project.tagline}</span>
          </div>
          <h1 className="font-display text-4xl text-graphite md:text-5xl">
            {project.name}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            {project.summary}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <a href="/projects">{t.backToProjects}</a>
            </Button>
            {project.link && (
              <Button
                asChild
                className="rounded-full bg-brand-strong text-xs uppercase tracking-[0.3em] text-white"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {t.visitSite}
                </a>
              </Button>
            )}
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
            >
              <a href="/ludic-systems">{t.ludicSystems}</a>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {project.pillars.map((pillar) => (
            <Card key={pillar.title} className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-graphite">
                  {pillar.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {pillar.description}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Card className="surface-glass border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                {common.capabilities}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {project.capabilities.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                {common.stack}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {project.stack.map((item) => (
                <Badge key={item} variant="outline" className="rounded-full">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>

        <Card className="border-border/60 bg-card/80">
          <CardHeader>
            <CardTitle className="font-display text-2xl text-graphite">
              {common.notes}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {project.notes.map((note) => (
              <p key={note} className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-ember" />
                <span>{note}</span>
              </p>
            ))}
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  );
}
