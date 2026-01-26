import Link from "next/link";

import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ludicPrinciples, ludicSummary } from "@/content/ludic";
import { profileBlurb } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 pb-20 pt-16">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-6">
            <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
              Personal Research Studio
            </Badge>
            <h1 className="font-display text-4xl leading-tight text-graphite md:text-6xl">
              把个人项目做成一组 Landing Pages，
              <span className="text-shadow-soft text-brand-strong">
                把长期哲学讨论写成持续的对话。
              </span>
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              这里是一个持续进化的个人基地：一边做产品与系统，一边追踪那些需要
              时间沉淀的问题。希望更多人能在这里理解我的项目与哲学，加入这条长
              期讨论的对话链。
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full bg-graphite px-6 text-xs uppercase tracking-[0.3em]">
                <Link href="/projects">Explore Projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/70 bg-transparent px-6 text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
              >
                <Link href="/ludic-systems">Ludic Systems</Link>
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="font-display text-xl text-graphite">
                  About
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {profileBlurb}
              </CardContent>
            </Card>
            <Card className="surface-glass border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-xl text-graphite">
                  Current Focus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  以多 Agent 协作系统为核心，持续探索“人 + 系统”的协作边界。
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Systems", "Agent Ops", "Design Rituals", "Long-form"].map(
                    (tag) => (
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
                Project Index
              </p>
              <h2 className="font-display text-3xl text-graphite md:text-4xl">
                每个项目都有独立的叙事入口
              </h2>
            </div>
            <Button asChild variant="ghost" className="text-xs uppercase tracking-[0.3em]">
              <Link href="/projects">View all projects →</Link>
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
                  <Button asChild variant="outline" className="w-full rounded-full border-border/60">
                    <Link href={`/projects/${project.slug}`}>Open Landing Page</Link>
                  </Button>
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
              Ludic Systems
            </p>
            <h2 className="font-display text-3xl text-graphite md:text-4xl">
              {ludicSummary.subtitle}
            </h2>
            <p className="text-base text-muted-foreground">
              {ludicSummary.description}
            </p>
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <Link href="/ludic-systems">View Planning Page</Link>
            </Button>
          </div>
          <Card className="surface-glass border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-xl text-graphite">
                Principles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {ludicPrinciples.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-ember" />
                  <span>{item}</span>
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
