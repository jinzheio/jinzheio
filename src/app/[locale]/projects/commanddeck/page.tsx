'use client';

import { useTranslations } from 'next-intl';
import Image from "next/image";

import {
  Activity,
  Bot,
  CircuitBoard,
  Cloud,
  Database,
  LayoutGrid,
  MessageCircle,
  Terminal,
} from "lucide-react";

import { Ambient } from "@/components/ambient";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";

const iconMap: Record<string, any> = {
  monitoring: Activity,
  timeline: Terminal,
  conversation: MessageCircle,
  multiproject: Database,
  hub: Cloud,
  desktop: LayoutGrid,
  main: Bot,
  protocol: CircuitBoard,
};

export default function CommandDeckPage() {
  const t = useTranslations('commanddeck');
  const common = useTranslations('common');

  const pillarKeys = ['hub', 'desktop', 'main', 'protocol'] as const;
  const capabilityKeys = ['monitoring', 'timeline', 'conversation', 'multiproject'] as const;

  return (
    <div className="min-h-screen">
      <Ambient />
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="space-y-6">
            <Badge className="rounded-full bg-mist text-xs uppercase tracking-[0.3em] text-graphite">
              {t('badge')}
            </Badge>
            <h1 className="font-display text-4xl text-graphite md:text-5xl">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground">
              {t('description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-graphite text-xs uppercase tracking-[0.3em] text-white">
                <Link href="/projects">{t('backToProjects')}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/60 bg-transparent text-xs uppercase tracking-[0.3em] text-graphite hover:bg-graphite hover:text-white"
              >
                <Link href="/ludic-systems">{t('ludicSystems')}</Link>
              </Button>
            </div>
          </div>
          <Card className="surface-glass border-border/60">
            <CardContent className="flex flex-col items-center gap-4 p-8 text-sm text-muted-foreground">
              <Image
                src="/icons/commanddeck-rsvg.svg"
                alt="CommandDeck icon"
                width={160}
                height={160}
                className="h-40 w-40 rounded-[28px] border border-border/60 bg-background/40 p-2"
                priority
              />
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {t('visualIdentity')}
                </p>
                <p className="mt-2 text-graphite">
                  {t('visualIdentityDesc')}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {pillarKeys.map((key) => {
            const Icon = iconMap[key];
            const pillar = t(`pillars.${key}`) as unknown as {title: string, description: string};
            return (
              <Card key={key} className="border-border/60 bg-card/80">
                <CardHeader className="flex flex-row items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-mist text-graphite">
                    <Icon className="size-5" />
                  </span>
                  <CardTitle className="font-display text-2xl text-graphite">
                    {pillar.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {pillar.description}
                </CardContent>
              </Card>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] animate-in fade-in slide-in-from-bottom-6 duration-700">
          <Card className="surface-glass border-border/60">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                {common('capabilities')}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
              {capabilityKeys.map((key) => {
                const Icon = iconMap[key];
                const capability = t(`capabilities.${key}`) as unknown as {title: string, description: string};
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center gap-2 text-graphite">
                      <Icon className="size-4" />
                      <span className="text-sm font-medium">{capability.title}</span>
                    </div>
                    <p>{capability.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="font-display text-2xl text-graphite">
                {common('stack')}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {(t.raw('stack.items') as string[]).map((item) => (
                <Badge key={item} variant="outline" className="rounded-full">
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
