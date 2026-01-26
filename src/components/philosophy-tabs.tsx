"use client";

import { philosophyThemes } from "@/content/philosophy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function PhilosophyTabs() {
  return (
    <Tabs defaultValue={philosophyThemes[0].id} className="w-full">
      <TabsList className="grid w-full grid-cols-1 rounded-2xl bg-muted/70 p-1 sm:grid-cols-3 sm:rounded-full">
        {philosophyThemes.map((theme) => (
          <TabsTrigger
            key={theme.id}
            value={theme.id}
            className="rounded-full text-xs uppercase tracking-[0.18em]"
          >
            {theme.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {philosophyThemes.map((theme) => (
        <TabsContent
          key={theme.id}
          value={theme.id}
          className="mt-6 space-y-4 rounded-3xl border border-border/60 bg-card/70 p-6 shadow-[0_30px_80px_-60px_var(--brand)]"
        >
          <p className="text-base text-graphite">{theme.summary}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {theme.questions.map((question) => (
              <li key={question} className="flex items-start gap-2">
                <span className="mt-1 size-1.5 rounded-full bg-brand" />
                <span>{question}</span>
              </li>
            ))}
          </ul>
        </TabsContent>
      ))}
    </Tabs>
  );
}
