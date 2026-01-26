'use client';

import { useTranslations } from 'next-intl';

import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";

export default function LudicSystemsPage() {
  const t = useTranslations('ludic');
  const common = useTranslations('common');

  const nodeKeys = ['jinzheio', 'ludicSystems'] as const;
  const moduleKeys = ['whitepaper', 'protocol', 'engine', 'lab', 'community'] as const;

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
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground">
            {t('subtitle')}。{t('description')}
          </p>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {t('positioning')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
              <Link href="/projects/commanddeck">{t('commanddeck')}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
            >
              <Link href="/projects">{t('backToProjects')}</Link>
            </Button>
          </div>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {nodeKeys.map((key) => (
            <Card key={key} className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="font-display text-2xl text-graphite">
                  {t(`dualNode.${key}.title` as any)}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                {(t.raw(`dualNode.${key}.points` as any) as string[]).map((point) => (
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
                {common('modules')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {moduleKeys.map((key) => {
                const module = t(`modules.${key}`) as unknown as {title: string, description: string};
                return (
                  <div key={key} className="space-y-1">
                    <p className="text-graphite">{module.title}</p>
                    <p>{module.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                {common('principles')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {(t.raw('principles.items') as string[]).map((item) => (
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
