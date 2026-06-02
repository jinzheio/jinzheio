import { siteCopy } from "@/content/site-copy";

export function SiteFooter() {
  const t = siteCopy.footer;

  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-graphite">
            {t.tagline}
          </p>
          <p className="mt-2 max-w-md">
            {t.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <a href="/about" className="hover:text-graphite">
            About
          </a>
          <a href="/blog" className="hover:text-graphite">
            Blog
          </a>
          <a href="/writings" className="hover:text-graphite">
            Writings
          </a>
          <a href="/projects" className="hover:text-graphite">
            {t.projects}
          </a>
          <a href="/concepts" className="hover:text-graphite">
            Concepts
          </a>
        </div>
      </div>
    </footer>
  );
}
