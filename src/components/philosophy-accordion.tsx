"use client";

import { useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function PhilosophyAccordion() {
  const t = useTranslations('philosophy');
  const themes = t.raw('themes') as Record<string, {title: string, summary: string, questions: string[]}>;

  return (
    <Accordion type="single" collapsible className="w-full">
      {Object.entries(themes).map(([key, theme]) => (
        <AccordionItem key={key} value={key}>
          <AccordionTrigger className="text-left font-display text-lg text-graphite">
            {theme.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-sm text-muted-foreground">
            <p>{theme.summary}</p>
            <ul className="space-y-2">
              {theme.questions.map((question) => (
                <li key={question} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 rounded-full bg-brand" />
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
