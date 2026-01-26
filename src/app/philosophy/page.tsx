import Link from "next/link";

import { Ambient } from "@/components/ambient";
import { PhilosophyAccordion } from "@/components/philosophy-accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { philosophyPractices, philosophySignals } from "@/content/philosophy";

export default function PhilosophyPage() {
  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
            Long-term Philosophy
          </Badge>
          <h1 className="font-display text-4xl text-graphite md:text-5xl">
            长期哲学讨论不是一次性的结论，
            <br />
            而是一条持续更新的对话链。
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            这里记录长期研究的核心问题，以及每一次项目迭代如何反过来验证这些问题。
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <Link href="/projects">Projects Index</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
            >
              <Link href="/projects/commanddeck">CommandDeck</Link>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              Core Threads
            </p>
            <h2 className="font-display text-3xl text-graphite md:text-4xl">
              长期问题的结构化维护
            </h2>
            <p className="text-base text-muted-foreground">
              把问题拆成可追踪的主题，让思考成为一套可复用的方法。
            </p>
            <PhilosophyAccordion />
          </div>
          <div className="space-y-6">
            <Card className="surface-glass border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-graphite">
                  Rituals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {philosophyPractices.map((practice) => (
                  <div key={practice.title} className="space-y-1">
                    <p className="text-graphite">{practice.title}</p>
                    <p>{practice.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-graphite">
                  Signals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {philosophySignals.map((signal) => (
                  <p key={signal} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-ember" />
                    <span>{signal}</span>
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
