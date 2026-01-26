'use client';

import { useTranslations } from 'next-intl';

import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Link } from "@/i18n/routing";

export function SiteHeader() {
  const t = useTranslations('nav');

  const navItems = [
    { label: t('projects'), href: "/projects" },
    { label: t('ludicSystems'), href: "/ludic-systems" },
    { label: t('commandDeck'), href: "/projects/commanddeck" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-full border border-border/60 bg-card text-sm font-semibold tracking-[0.12em] text-graphite">
            JZ
          </span>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              jinzhe.io
            </p>
            <p className="font-display text-lg text-graphite">
              Projects & Philosophy
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-graphite"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Button
            asChild
            variant="outline"
            className="hidden border-border/70 bg-transparent text-xs uppercase tracking-[0.2em] text-graphite hover:bg-graphite hover:text-white md:inline-flex"
          >
            <a href="https://x.com/jinzheio" target="_blank" rel="noreferrer">
              {t('startConversation')}
            </a>
          </Button>
          <Button asChild className="rounded-full bg-graphite px-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-graphite/90">
            <a href="https://x.com/jinzheio" target="_blank" rel="noreferrer">
              {t('followOnX')}
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
