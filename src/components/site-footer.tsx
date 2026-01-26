'use client';

import { useTranslations } from 'next-intl';

import { Link } from "@/i18n/routing";

export function SiteFooter() {
  const t = useTranslations('footer');

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-graphite">
            {t('tagline')}
          </p>
          <p className="mt-2 max-w-md">
            {t('description')}
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/projects" className="hover:text-graphite">
            {t('projects')}
          </Link>
          <Link href="/ludic-systems" className="hover:text-graphite">
            {t('ludicSystems')}
          </Link>
          <Link href="/projects/commanddeck" className="hover:text-graphite">
            {t('commandDeck')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
