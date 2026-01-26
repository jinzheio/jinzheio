'use client';

import { useTranslations } from 'next-intl';

import { Ambient } from "@/components/ambient";
import { PhilosophyAccordion } from "@/components/philosophy-accordion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";

export default function PhilosophyPage() {
  const t = useTranslations('philosophy');
  const common = useTranslations('common');

  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
            {t('badge')}
          </Badge>
          <h1 className="font-display text-4xl text-graphite md:text-5xl">
            {t('title')}
            <br />
            {t('titleContinued')}
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            {t('description')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <Link href="/projects">{t('projectsIndex')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
            >
              <Link href="/projects/commanddeck">{t('commanddeck')}</Link>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
              {t('coreThreads')}
            </p>
            <h2 className="font-display text-3xl text-graphite md:text-4xl">
              {t('subtitle')}
            </h2>
            <p className="text-base text-muted-foreground">
              {t('summary')}
            </p>
            <PhilosophyAccordion />
          </div>
          <div className="space-y-6">
            <Card className="surface-glass border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-graphite">
                  {common('rituals')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                {(t.raw('practices') as Array<{title: string, description: string}>).map((practice) => (
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
                  {common('signals')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                {(t.raw('signals') as string[]).map((signal) => (
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
