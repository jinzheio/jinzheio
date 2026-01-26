import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg text-graphite">
            Keep the long questions alive.
          </p>
          <p className="mt-2 max-w-md">
            把长期问题写成系统，把系统做成可持续的叙事。
          </p>
        </div>
        <div className="flex flex-wrap gap-6">
          <Link href="/projects" className="hover:text-graphite">
            Projects
          </Link>
          <Link href="/ludic-systems" className="hover:text-graphite">
            Ludic Systems
          </Link>
          <Link href="/projects/commanddeck" className="hover:text-graphite">
            CommandDeck
          </Link>
        </div>
      </div>
    </footer>
  );
}
