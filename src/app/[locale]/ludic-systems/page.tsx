import Link from "next/link";

import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  dualNodeModel,
  ludicPrinciples,
  ludicSummary,
  plannedModules,
} from "@/content/ludic";

export default function LudicSystemsPage() {
  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
            {ludicSummary.status}
          </Badge>
          <h1 className="font-display text-4xl text-graphite md:text-5xl">
            {ludicSummary.title}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            {ludicSummary.subtitle}。{ludicSummary.description}
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {ludicSummary.positioning}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <Link href="/projects/commanddeck">CommandDeck</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
            >
              <Link href="/projects">Projects Index</Link>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {dualNodeModel.map((node) => (
            <Card key={node.title} className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-graphite">
                  {node.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {node.points.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <span className="mt-1 size-1.5 rounded-full bg-brand" />
                    <span>{point}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Card className="surface-glass border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                Planned Modules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {plannedModules.map((module) => (
                <div key={module.title} className="space-y-1">
                  <p className="text-graphite">{module.title}</p>
                  <p>{module.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
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
